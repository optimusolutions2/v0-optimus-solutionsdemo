"use server"

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

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
    // 2. Read uploaded document URLs
    // ---------------------------------------------------------

    const idFrontUrl = String(formData.get("idFrontUrl") || "").trim()
    const idBackUrl = String(formData.get("idBackUrl") || "").trim()
    const bankStatementUrl = String(
      formData.get("bankStatementUrl") || ""
    ).trim()
    const proofOfAddressUrl = String(
      formData.get("proofOfAddressUrl") || ""
    ).trim()
    const payslipsUrl = String(
      formData.get("payslipsUrl") || ""
    ).trim()

    // ---------------------------------------------------------
    // 3. Server-side validation
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
    // 4. Validate document URLs
    // ---------------------------------------------------------

    if (
      !idFrontUrl ||
      !idBackUrl ||
      !bankStatementUrl ||
      !proofOfAddressUrl ||
      !payslipsUrl
    ) {
      return {
        success: false,
        message:
          "Please make sure all required documents have been uploaded.",
      }
    }

    // ---------------------------------------------------------
    // 5. Generate application ID
    // ---------------------------------------------------------

    const applicationId = `OPT-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`

    const submissionTimestamp = new Date().toLocaleString("en-ZA", {
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
    // 6. Prepare email
    // ---------------------------------------------------------

    const emailSubject = `New Loan Application: ${fullName} - ${applicationId}`

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
${idFrontUrl}

ID Back:
${idBackUrl}

3 Months Bank Statement:
${bankStatementUrl}

Proof of Address:
${proofOfAddressUrl}

3 Months Payslips:
${payslipsUrl}


Optimus Solutions
Phone: +27 (76) 851-3565
Email: optimusolutions2@gmail.com
Trade Number: 2025/17469107
`.trim()

    // ---------------------------------------------------------
    // 7. Send email through Resend
    // ---------------------------------------------------------

    const receivingEmail = process.env.OPTIMUS_RECEIVING_EMAIL
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey || !receivingEmail) {
      console.error(
        "Missing OPTIMUS_RECEIVING_EMAIL or RESEND_API_KEY"
      )

      return {
        success: false,
        message:
          "The application service is not configured correctly. Please contact Optimus Solutions directly.",
      }
    }

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Optimus Solutions <onboarding@resend.dev>",
          to: receivingEmail,
          subject: emailSubject,
          text: emailBody,
          reply_to: email,
        }),
      }
    )

    // ---------------------------------------------------------
    // 8. Handle email response
    // ---------------------------------------------------------

    if (!response.ok) {
      const errorText = await response.text()

      console.error("Resend API error:", errorText)

      return {
        success: false,
        message:
          "Your documents were uploaded, but we could not complete the application submission. Please try again.",
      }
    }

    console.log(
      `Application ${applicationId} submitted successfully.`
    )

    // ---------------------------------------------------------
    // 9. Return success
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
