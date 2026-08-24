"use server"

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

interface ApplicationDocumentUrls {
  idFront: string
  idBack: string
  bankStatement: string
  proofOfAddress: string
  payslips: string
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

    // ---------------------------------------------------------
    // 2. Read document URLs
    // ---------------------------------------------------------

    const idFront = String(
      formData.get("idFront") || ""
    ).trim()

    const idBack = String(
      formData.get("idBack") || ""
    ).trim()

    const bankStatement = String(
      formData.get("bankStatement") || ""
    ).trim()

    const proofOfAddress = String(
      formData.get("proofOfAddress") || ""
    ).trim()

    const payslips = String(
      formData.get("payslips") || ""
    ).trim()

    // ---------------------------------------------------------
    // 3. Required information validation
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

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return {
        success: false,
        message:
          "Please enter a valid email address.",
      }
    }

    // ---------------------------------------------------------
    // 7. Loan validation
    // ---------------------------------------------------------

    if (
      !loanAmount ||
      Number(loanAmount) <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid loan amount.",
      }
    }

    if (
      !monthlyIncome ||
      Number(monthlyIncome) <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid monthly income.",
      }
    }

    if (!employmentStatus) {
      return {
        success: false,
        message:
          "Please select your employment status.",
      }
    }

    // ---------------------------------------------------------
    // 8. Checkbox validation
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
    // 9. Document URL validation
    // ---------------------------------------------------------

    const documents: ApplicationDocumentUrls = {
      idFront,
      idBack,
      bankStatement,
      proofOfAddress,
      payslips,
    }

    const missingDocument = Object.entries(
      documents
    ).find(([, url]) => !url)

    if (missingDocument) {
      const documentNames: Record<
        keyof ApplicationDocumentUrls,
        string
      > = {
        idFront: "ID Front",
        idBack: "ID Back",
        bankStatement: "3 Months Bank Statement",
        proofOfAddress: "Proof of Address",
        payslips: "3 Months Payslips",
      }

      const field =
        missingDocument[0] as keyof ApplicationDocumentUrls

      return {
        success: false,
        message: `Please upload the required document: ${documentNames[field]}.`,
      }
    }

    // ---------------------------------------------------------
    // 10. Generate application ID
    // ---------------------------------------------------------

    const applicationId = `OPT-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`

    const submissionTimestamp =
      new Date().toLocaleString("en-ZA", {
        timeZone: "Africa/Johannesburg",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

    // ---------------------------------------------------------
    // 11. Prepare email
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
${idFront}

ID Back:
${idBack}

3 Months Bank Statement:
${bankStatement}

Proof of Address:
${proofOfAddress}

3 Months Payslips:
${payslips}


Optimus Solutions
Phone: +27 (76) 851-3565
Email: optimusolutions2@gmail.com
Trade Number: 2025/17469107
`.trim()

    // ---------------------------------------------------------
    // 12. Check email configuration
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
    // 13. Send email through Resend
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
    // 14. Handle Resend response
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

    const resendResult =
      await response.json()

    console.log(
      "Application email sent successfully:",
      {
        applicationId,
        resendId: resendResult?.id,
      }
    )

    // ---------------------------------------------------------
    // 15. Return success
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
