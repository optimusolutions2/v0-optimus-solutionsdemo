"use server"

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

const DOCUMENT_FIELDS = [
  "idFront",
  "idBack",
  "bankStatement",
  "proofOfAddress",
  "payslips",
] as const

type DocumentField = (typeof DOCUMENT_FIELDS)[number]

const DOCUMENT_NAMES: Record<DocumentField, string> = {
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
      String(formData.get("confirmAccurate")) === "true"

    const consentToProcess =
      String(formData.get("consentToProcess")) === "true"

    const suppliedApplicationId = String(
      formData.get("applicationId") || ""
    ).trim()

    // ---------------------------------------------------------
    // 2. Validate application ID
    // ---------------------------------------------------------

    if (!suppliedApplicationId) {
      return {
        success: false,
        message: "Application ID is missing.",
      }
    }

    // ---------------------------------------------------------
    // 3. Required information
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
        message: "Please complete all required fields.",
      }
    }

    // ---------------------------------------------------------
    // 4. South African ID validation
    // ---------------------------------------------------------

    const cleanIdNumber = idNumber.replace(/\s/g, "")

    if (!/^\d{13}$/.test(cleanIdNumber)) {
      return {
        success: false,
        message:
          "Please enter a valid South African ID number containing exactly 13 digits.",
      }
    }

    // ---------------------------------------------------------
    // 5. Phone validation
    // ---------------------------------------------------------

    const cleanPhone = phoneNumber.replace(/\s/g, "")

    if (!/^(\+27|0)[0-9]{9}$/.test(cleanPhone)) {
      return {
        success: false,
        message:
          "Please enter a valid South African phone number.",
      }
    }

    // ---------------------------------------------------------
    // 6. Email validation
    // ---------------------------------------------------------

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

    // ---------------------------------------------------------
    // 7. Loan amount validation
    // ---------------------------------------------------------

    const numericLoanAmount = Number(loanAmount)

    if (
      !Number.isFinite(numericLoanAmount) ||
      numericLoanAmount <= 0
    ) {
      return {
        success: false,
        message: "Please enter a valid loan amount.",
      }
    }

    // ---------------------------------------------------------
    // 8. Monthly income validation
    // ---------------------------------------------------------

    const numericMonthlyIncome = Number(monthlyIncome)

    if (
      !Number.isFinite(numericMonthlyIncome) ||
      numericMonthlyIncome <= 0
    ) {
      return {
        success: false,
        message: "Please enter a valid monthly income.",
      }
    }

    // ---------------------------------------------------------
    // 9. Employment validation
    // ---------------------------------------------------------

    const allowedEmploymentStatuses = [
      "employed",
      "self-employed",
      "unemployed",
      "retired",
    ]

    if (!allowedEmploymentStatuses.includes(employmentStatus)) {
      return {
        success: false,
        message: "Please select a valid employment status.",
      }
    }

    // ---------------------------------------------------------
    // 10. Checkbox validation
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
    // 11. Read document URLs
    // ---------------------------------------------------------

    const documentUrls: Record<DocumentField, string> = {
      idFront: String(formData.get("idFront") || "").trim(),
      idBack: String(formData.get("idBack") || "").trim(),
      bankStatement: String(
        formData.get("bankStatement") || ""
      ).trim(),
      proofOfAddress: String(
        formData.get("proofOfAddress") || ""
      ).trim(),
      payslips: String(
        formData.get("payslips") || ""
      ).trim(),
    }

    // ---------------------------------------------------------
    // 12. Validate document URLs
    // ---------------------------------------------------------

    for (const field of DOCUMENT_FIELDS) {
      if (!documentUrls[field]) {
        return {
          success: false,
          message: `Please upload the required document: ${DOCUMENT_NAMES[field]}.`,
        }
      }
    }

    // ---------------------------------------------------------
    // 13. Basic Blob URL validation
    // ---------------------------------------------------------

    for (const field of DOCUMENT_FIELDS) {
      try {
        const url = new URL(documentUrls[field])

        if (!url.protocol.startsWith("http")) {
          throw new Error()
        }
      } catch {
        return {
          success: false,
          message: `${DOCUMENT_NAMES[field]} has an invalid upload reference.`,
        }
      }
    }

    // ---------------------------------------------------------
    // 14. Submission timestamp
    // ---------------------------------------------------------

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
    // 15. Prepare email
    // ---------------------------------------------------------

    const emailSubject =
      `New Loan Application: ${fullName} - ${suppliedApplicationId}`

    const emailBody = `
NEW LOAN APPLICATION
====================

Application ID:
${suppliedApplicationId}

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
R${numericLoanAmount.toLocaleString("en-ZA")}

Employment Status:
${employmentStatus}

Monthly Income:
R${numericMonthlyIncome.toLocaleString("en-ZA")}


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
    // 16. Check Resend configuration
    // ---------------------------------------------------------

    const receivingEmail =
      process.env.OPTIMUS_RECEIVING_EMAIL

    const resendApiKey =
      process.env.RESEND_API_KEY

    if (!resendApiKey || !receivingEmail) {
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
    // 17. Send email
    // ---------------------------------------------------------

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

    // ---------------------------------------------------------
    // 18. Handle Resend failure
    // ---------------------------------------------------------

    if (!response.ok) {
      const errorText = await response.text()

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
    // 19. Log success
    // ---------------------------------------------------------

    let resendResult: {
      id?: string
    } | null = null

    try {
      resendResult = await response.json()
    } catch {
      resendResult = null
    }

    console.log(
      "Application submitted successfully:",
      {
        applicationId: suppliedApplicationId,
        resendId: resendResult?.id,
      }
    )

    // ---------------------------------------------------------
    // 20. Return success
    // ---------------------------------------------------------

    return {
      success: true,
      message:
        "Your application has been submitted successfully.",
      applicationId: suppliedApplicationId,
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
