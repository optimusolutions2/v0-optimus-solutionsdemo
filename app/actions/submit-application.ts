"use server"

import type { LoanApplicationData } from "@/components/application-form"

// Environment variables for email configuration
// OPTIMUS_RECEIVING_EMAIL - Email address to receive applications
// RESEND_API_KEY - API key for Resend email service (optional)
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS - SMTP credentials (optional)

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

export async function submitApplication(
  data: LoanApplicationData
): Promise<SubmitApplicationResult> {
  try {
    // Validate required fields server-side
    if (!data.fullName || !data.idNumber || !data.email || !data.phoneNumber) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Validate SA ID number format
    const cleanIdNumber = data.idNumber.replace(/\s/g, "")
    if (!/^\d{13}$/.test(cleanIdNumber)) {
      return {
        success: false,
        message: "Please enter a valid 13-digit SA ID number.",
      }
    }

    // Validate phone number format
    const cleanPhone = data.phoneNumber.replace(/\s/g, "")
    if (!/^(\+27|0)[0-9]{9}$/.test(cleanPhone)) {
      return {
        success: false,
        message: "Please enter a valid SA phone number.",
      }
    }

    // Generate a unique application ID
    const applicationId = `OPT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    // Prepare email content
    const emailSubject = `New Loan Application: ${data.fullName} - ${applicationId}`
    const emailBody = `
New Loan Application Received
=============================

Application ID: ${applicationId}
Submitted: ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}

PERSONAL INFORMATION
--------------------
Full Name: ${data.fullName}
ID Number: ${data.idNumber}
Phone: ${data.phoneNumber}
Email: ${data.email}

LOAN DETAILS
------------
Requested Amount: R${data.loanAmount}
Employment Status: ${data.employmentStatus}
Monthly Income: R${data.monthlyIncome}

ADDITIONAL NOTES
----------------
${data.notes || "None provided"}

---
This application was submitted through the Optimus Solutions website.
Please follow up with the applicant within 24-48 hours.
    `.trim()

    // Check which email method to use
    const receivingEmail = process.env.OPTIMUS_RECEIVING_EMAIL
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey && receivingEmail) {
      // Send via Resend
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Optimus Solutions <noreply@optimussolutions.co.za>",
          to: receivingEmail,
          subject: emailSubject,
          text: emailBody,
          reply_to: data.email,
        }),
      })

      if (!response.ok) {
        console.error("Resend API error:", await response.text())
        // Continue anyway - we don't want to fail the user's submission
      }
    } else {
      // Log application for manual processing (when email is not configured)
      console.log("=== NEW LOAN APPLICATION ===")
      console.log("Application ID:", applicationId)
      console.log("Email Subject:", emailSubject)
      console.log("Email Body:", emailBody)
      console.log("============================")
      console.log(
        "Note: Configure OPTIMUS_RECEIVING_EMAIL and RESEND_API_KEY to enable email notifications."
      )
    }

    // TODO: Future EasyDebit integration point
    // After approval, use applicationId to link debit order setup
    // const easyDebitResult = await setupDebitOrder(applicationId, data)

    return {
      success: true,
      message: "Your application has been submitted successfully.",
      applicationId,
    }
  } catch (error) {
    console.error("Application submission error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again or contact us directly.",
    }
  }
}
