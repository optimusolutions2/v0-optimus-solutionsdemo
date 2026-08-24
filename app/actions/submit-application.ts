"use server"

import { put } from "@vercel/blob"

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB per file
const MAX_TOTAL_SIZE = 28 * 1024 * 1024 // 28MB total

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

type DocumentField = (typeof DOCUMENT_FIELDS)[number]

export async function submitApplication(
  formData: FormData
): Promise<SubmitApplicationResult> {
  try {
    // ---------------------------------------------------------
    // 1. Read application information
    // ---------------------------------------------------------

    const fullName = String(formData.get("fullName") || "").trim()
    const idNumber = String(formData.get("idNumber") || "").trim()
    const phoneNumber = String(formData.get("phoneNumber") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const loanAmount = String(formData.get("loanAmount") || "").trim()
    const employmentStatus = String(
      formData.get("employmentStatus") || ""
    ).trim()
    const monthlyIncome = String(
      formData.get("monthlyIncome") || ""
    ).trim()
    const notes = String(formData.get("notes") || "").trim()

    const confirmAccurate =
      String(formData.get("confirmAccurate")) === "true"

    const consentToProcess =
      String(formData.get("consentToProcess")) === "true"

    // ---------------------------------------------------------
    // 2. Server-side validation
    // ---------------------------------------------------------

    if (!fullName || !idNumber || !email || !phoneNumber) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    const cleanIdNumber = idNumber.replace(/\s/g, "")

    if (!/^\d{13}$/.test(cleanIdNumber)) {
      return {
        success: false,
        message: "Please enter a valid 13-digit SA ID number.",
      }
    }

    const cleanPhone = phoneNumber.replace(/\s/g, "")

    if (!/^(\+27|0)[0-9]{9}$/.test(cleanPhone)) {
      return {
        success: false,
        message: "Please enter a valid SA phone number.",
      }
    }

    if (!loanAmount || Number(loanAmount) <= 0) {
      return {
        success: false,
        message: "Please enter a valid loan amount.",
      }
    }

    if (!employmentStatus) {
      return {
        success: false,
        message: "Please select your employment status.",
      }
    }

    if (!monthlyIncome || Number(monthlyIncome) <= 0) {
      return {
        success: false,
        message: "Please enter a valid monthly income.",
      }
    }

    if (!confirmAccurate) {
      return {
        success: false,
        message:
          "You must confirm that the information is accurate.",
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
    // 3. Generate application ID
    // ---------------------------------------------------------

    const applicationId = `OPT-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`

    const submissionTimestamp = new Date().toLocaleString(
      "en-ZA",
      {
        timeZone: "Africa/Johannesburg",
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
    // 4. Collect documents
    // ---------------------------------------------------------

    const uploadedFiles: {
      field: DocumentField
      file: File
    }[] = []

    let totalSize = 0

    for (const field of DOCUMENT_FIELDS) {
      const value = formData.get(field)

      if (!(value instanceof File) || value.size === 0) {
        return {
          success: false,
          message: `Please upload the required document: ${field}.`,
        }
      }

      if (!ALLOWED_FILE_TYPES.includes(value.type)) {
        return {
          success: false,
          message:
            `${field} must be a PDF, JPG, JPEG or PNG file.`,
        }
      }

      if (value.size > MAX_FILE_SIZE) {
        return {
          success: false,
          message:
            `${field} is too large. Maximum size is 10MB.`,
        }
      }

      totalSize += value.size

      uploadedFiles.push({
        field,
        file: value,
      })
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return {
        success: false,
        message:
          "The combined size of your documents is too large. Maximum total size is 28MB.",
      }
    }

    // ---------------------------------------------------------
    // 5. Upload documents to Vercel Blob
    // ---------------------------------------------------------

    const documentUrls: Partial<
      Record<DocumentField, string>
    > = {}

    for (const { field, file } of uploadedFiles) {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "file"

      const safeName = `${field}.${extension}`

      const blob = await put(
        `loan-applications/${applicationId}/${safeName}`,
        file,
        {
          access: "public",
          addRandomSuffix: false,
        }
      )

      documentUrls[field] = blob.url
    }

    // ---------------------------------------------------------
    // 6. Prepare email
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
${idNumber}

Phone Number:
${phoneNumber}

Email Address:
${email}


LOAN DETAILS
------------

Requested Amount:
R${Number(loanAmount).toLocaleString("en-ZA")}

Employment Status:
${employmentStatus}

Monthly Income:
R${Number(monthlyIncome).toLocaleString("en-ZA")}


ADDITIONAL NOTES
----------------

${notes || "No additional notes provided."}


CONSENT & VERIFICATION
----------------------

Information Accuracy Confirmed:
${confirmAccurate ? "YES" : "NO"}

Data Processing Consent:
${consentToProcess ? "YES" : "NO"}


DOCUMENTS
---------

ID Front:
${documentUrls.idFront || "Not available"}

ID Back:
${documentUrls.idBack || "Not available"}

3 Months Bank Statement:
${documentUrls.bankStatement || "Not available"}

Proof of Address:
${documentUrls.proofOfAddress || "Not available"}

3 Months Payslips:
${documentUrls.payslips || "Not available"}


Optimus Solutions
Phone: +27 (76) 851-3565
Email: optimusolutions2@gmail.com
Trade Number: 2025/17469107
`.trim()

    // ---------------------------------------------------------
    // 7. Send notification email
    // ---------------------------------------------------------

    const receivingEmail =
      process.env.OPTIMUS_RECEIVING_EMAIL

    const resendApiKey =
      process.env.RESEND_API_KEY

    if (resendApiKey && receivingEmail) {
      const response = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
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

      if (!response.ok) {
        const errorText = await response.text()

        console.error(
          "Resend API error:",
          errorText
        )

        console.log(
          "Application was uploaded but email failed:",
          applicationId
        )
      } else {
        console.log(
          `Email sent successfully for application ${applicationId}`
        )
      }
    } else {
      console.log(
        "RESEND_API_KEY or OPTIMUS_RECEIVING_EMAIL is missing."
      )
    }

    // ---------------------------------------------------------
    // 8. Return success
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
