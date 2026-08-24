"use server"

import { put } from "@vercel/blob"

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_TOTAL_SIZE = 28 * 1024 * 1024 // 28MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
]

const DOCUMENT_FIELDS = [
  "idFront",
  "idBack",
  "bankStatement",
  "proofOfAddress",
  "payslips",
] as const

type DocumentField =
  (typeof DOCUMENT_FIELDS)[number]

const DOCUMENT_NAMES: Record<
  DocumentField,
  string
> = {
  idFront: "ID Front",
  idBack: "ID Back",
  bankStatement: "3 Months Bank Statement",
  proofOfAddress: "Proof of Address",
  payslips: "3 Months Payslips",
}

export async function submitApplication(
  formData: FormData
): Promise<SubmitApplicationResult> {
  try {
    // ---------------------------------------------------------
    // 1. Read application information
    // ---------------------------------------------------------

    const fullName = String(
      formData.get("fullName") || ""
    ).trim()

    const idNumber = String(
      formData.get("idNumber") || ""
    ).trim()

    const phoneNumber = String(
      formData.get("phoneNumber") || ""
    ).trim()

    const email = String(
      formData.get("email") || ""
    ).trim()

    const loanAmount = String(
      formData.get("loanAmount") || ""
    ).trim()

    const employmentStatus = String(
      formData.get("employmentStatus") || ""
    ).trim()

    const monthlyIncome = String(
      formData.get("monthlyIncome") || ""
    ).trim()

    const notes = String(
      formData.get("notes") || ""
    ).trim()

    const confirmAccurate =
      String(
        formData.get("confirmAccurate")
      ) === "true"

    const consentToProcess =
      String(
        formData.get("consentToProcess")
      ) === "true"

    // ---------------------------------------------------------
    // 2. Required field validation
    // ---------------------------------------------------------

    if (
      !fullName ||
      !idNumber ||
      !phoneNumber ||
      !email ||
      !loanAmount ||
      !employmentStatus ||
      !monthlyIncome
    ) {
      return {
        success: false,
        message:
          "Please complete all required fields.",
      }
    }

    // ---------------------------------------------------------
    // 3. South African ID validation
    // ---------------------------------------------------------

    const cleanIdNumber =
      idNumber.replace(/\s/g, "")

    if (!/^\d{13}$/.test(cleanIdNumber)) {
      return {
        success: false,
        message:
          "Please enter a valid South African ID number containing exactly 13 digits.",
      }
    }

    // ---------------------------------------------------------
    // 4. Phone validation
    // ---------------------------------------------------------

    const cleanPhone =
      phoneNumber.replace(/\s/g, "")

    if (
      !/^(\+27|0)[0-9]{9}$/.test(
        cleanPhone
      )
    ) {
      return {
        success: false,
        message:
          "Please enter a valid South African phone number.",
      }
    }

    // ---------------------------------------------------------
    // 5. Email validation
    // ---------------------------------------------------------

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return {
        success: false,
        message:
          "Please enter a valid email address.",
      }
    }

    // ---------------------------------------------------------
    // 6. Loan validation
    // ---------------------------------------------------------

    const numericLoanAmount =
      Number(loanAmount)

    if (
      !Number.isFinite(
        numericLoanAmount
      ) ||
      numericLoanAmount <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid loan amount.",
      }
    }

    // ---------------------------------------------------------
    // 7. Monthly income validation
    // ---------------------------------------------------------

    const numericMonthlyIncome =
      Number(monthlyIncome)

    if (
      !Number.isFinite(
        numericMonthlyIncome
      ) ||
      numericMonthlyIncome <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid monthly income.",
      }
    }

    // ---------------------------------------------------------
    // 8. Employment validation
    // ---------------------------------------------------------

    const allowedEmploymentStatuses = [
      "employed",
      "self-employed",
      "unemployed",
      "retired",
    ]

    if (
      !allowedEmploymentStatuses.includes(
        employmentStatus
      )
    ) {
      return {
        success: false,
        message:
          "Please select a valid employment status.",
      }
    }

    // ---------------------------------------------------------
    // 9. Checkbox validation
    // ---------------------------------------------------------

    if (!confirmAccurate) {
      return {
        success: false,
        message:
          "You must confirm that the information provided is accurate.",
      }
    }

    if (!consentToProcess) {
      return {
        success: false,
        message:
          "You must agree to the data processing terms.",
      }
    }

    // ---------------------------------------------------------
    // 10. Validate uploaded documents
    // ---------------------------------------------------------

    const uploadedFiles: {
      field: DocumentField
      file: File
    }[] = []

    let totalSize = 0

    for (const field of DOCUMENT_FIELDS) {
      const value = formData.get(field)

      if (
        !(value instanceof File) ||
        value.size === 0
      ) {
        return {
          success: false,
          message: `Please upload the required document: ${DOCUMENT_NAMES[field]}.`,
        }
      }

      // -------------------------------------------------------
      // File type
      // -------------------------------------------------------

      if (
        !ALLOWED_FILE_TYPES.includes(
          value.type
        )
      ) {
        return {
          success: false,
          message: `${DOCUMENT_NAMES[field]} must be a PDF, JPG, JPEG or PNG file.`,
        }
      }

      // -------------------------------------------------------
      // Individual file size
      // -------------------------------------------------------

      if (
        value.size > MAX_FILE_SIZE
      ) {
        return {
          success: false,
          message: `${DOCUMENT_NAMES[field]} is too large. Maximum size is 10MB.`,
        }
      }

      totalSize += value.size

      uploadedFiles.push({
        field,
        file: value,
      })
    }

    // ---------------------------------------------------------
    // 11. Total document size
    // ---------------------------------------------------------

    if (
      totalSize > MAX_TOTAL_SIZE
    ) {
      return {
        success: false,
        message:
          "The combined size of your documents is too large. Maximum total size is 28MB.",
      }
    }

    // ---------------------------------------------------------
    // 12. Generate application ID
    // ---------------------------------------------------------

    const applicationId =
      `OPT-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`

    // ---------------------------------------------------------
    // 13. Submission timestamp
    // ---------------------------------------------------------

    const submissionTimestamp =
      new Date().toLocaleString(
        "en-ZA",
        {
          timeZone:
            "Africa/Johannesburg",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      )

    // ---------------------------------------------------------
    // 14. Upload documents
    // ---------------------------------------------------------

    const documentUrls: Partial<
      Record<DocumentField, string>
    > = {}

    for (
      const { field, file }
      of uploadedFiles
    ) {
      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() ||
        "file"

      const safeFilename =
        `applications/${applicationId}/${field}.${extension}`

      const blob = await put(
        safeFilename,
        file,
        {
          access: "public",
          addRandomSuffix: false,
        }
      )

      documentUrls[field] =
        blob.url
    }

    // ---------------------------------------------------------
    // 15. Verify all uploads completed
    // ---------------------------------------------------------

    for (const field of DOCUMENT_FIELDS) {
      if (!documentUrls[field]) {
        return {
          success: false,
          message:
            `Failed to upload ${DOCUMENT_NAMES[field]}. Please try again.`,
        }
      }
    }

    // ---------------------------------------------------------
    // 16. Prepare email
    // ---------------------------------------------------------

    const emailSubject =
      `New Loan Application: ${fullName} - ${applicationId}`

    const emailBody = `
NEW LOAN APPLICATION
====================

Application ID:
${applicationId}

Submission Date:
${submissionTimestamp}


PERSONAL INFORMATION
--------------------

Full Name:
${fullName}

ID Number:
${cleanIdNumber}

Phone Number:
${phoneNumber}

Email Address:
${email}


LOAN DETAILS
------------

Requested Amount:
R${numericLoanAmount.toLocaleString(
      "en-ZA"
    )}

Employment Status:
${employmentStatus}

Monthly Income:
R${numericMonthlyIncome.toLocaleString(
      "en-ZA"
    )}


ADDITIONAL NOTES
----------------

${notes || "No additional notes provided."}


CONSENT & VERIFICATION
----------------------

Information Accuracy Confirmed:
YES

Data Processing Consent:
YES


DOCUMENTS
---------

ID Front:
${documentUrls.idFront}

ID Back:
${documentUrls.idBack}

3 Months Bank Statement:
${documentUrls.bankStatement}

Proof of Address:
${documentUrls.proofOfAddress}

3 Months Payslips:
${documentUrls.payslips}


Optimus Solutions
Phone: +27 (76) 851-3565
Email: optimusolutions2@gmail.com
Trade Number: 2025/17469107
`.trim()

    // ---------------------------------------------------------
    // 17. Check Resend configuration
    // ---------------------------------------------------------

    const receivingEmail =
      process.env.OPTIMUS_RECEIVING_EMAIL

    const resendApiKey =
      process.env.RESEND_API_KEY

    if (
      !resendApiKey ||
      !receivingEmail
    ) {
      console.error(
        "Missing OPTIMUS_RECEIVING_EMAIL or RESEND_API_KEY"
      )

      return {
        success: false,
        message:
          "The application could not be submitted because the email service is not configured.",
      }
    }

    // ---------------------------------------------------------
    // 18. Send email
    // ---------------------------------------------------------

    const response =
      await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${resendApiKey}`,
          },

          body: JSON.stringify({
            from:
              "Optimus Solutions <onboarding@resend.dev>",

            to: receivingEmail,

            subject: emailSubject,

            text: emailBody,

            reply_to: email,
          }),
        }
      )

    // ---------------------------------------------------------
    // 19. Handle email failure
    // ---------------------------------------------------------

    if (!response.ok) {
      const errorText =
        await response.text()

      console.error(
        "Resend API error:",
        errorText
      )

      return {
        success: false,
        message:
          "We could not send your application. Please try again.",
      }
    }

    // ---------------------------------------------------------
    // 20. Log successful submission
    // ---------------------------------------------------------

    let resendResult: {
      id?: string
    } | null = null

    try {
      resendResult =
        await response.json()
    } catch {
      resendResult = null
    }

    console.log(
      "Application submitted successfully:",
      {
        applicationId,
        resendId:
          resendResult?.id,
      }
    )

    // ---------------------------------------------------------
    // 21. Return success
    // ---------------------------------------------------------

    return {
      success: true,
      message:
        "Your application has been submitted successfully.",
      applicationId,
    }
  } catch (error) {
    console.error(
      "Application submission error:",
      error
    )

    return {
      success: false,
      message:
        "An error occurred while submitting your application. Please try again or contact us directly.",
    }
  }
}
