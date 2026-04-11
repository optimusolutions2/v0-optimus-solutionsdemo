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

    // Validate consent checkbox
    if (!data.consentToProcess) {
      return {
        success: false,
        message: "You must agree to the data processing terms.",
      }
    }

    // Generate a unique application ID
    const applicationId = `OPT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    // Generate timestamp in SA timezone
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

    // Prepare email content
    const emailSubject = `New Loan Application: ${data.fullName} - ${applicationId}`
    const emailBody = `
════════════════════════════════════════════════════════════════
                    NEW LOAN APPLICATION
════════════════════════════════════════════════════════════════

Application ID:    ${applicationId}
Submission Date:   ${submissionTimestamp}

────────────────────────────────────────────────────────────────
                    PERSONAL INFORMATION
────────────────────────────────────────────────────────────────

Full Name:         ${data.fullName}
ID Number:         ${data.idNumber}
Phone Number:      ${data.phoneNumber}
Email Address:     ${data.email}

────────────────────────────────────────────────────────────────
                      LOAN DETAILS
────────────────────────────────────────────────────────────────

Requested Amount:  R${Number(data.loanAmount).toLocaleString("en-ZA")}
Employment Status: ${data.employmentStatus.charAt(0).toUpperCase() + data.employmentStatus.slice(1).replace("-", " ")}
Monthly Income:    R${Number(data.monthlyIncome).toLocaleString("en-ZA")}

────────────────────────────────────────────────────────────────
                    ADDITIONAL NOTES
────────────────────────────────────────────────────────────────

${data.notes?.trim() || "No additional notes provided."}

────────────────────────────────────────────────────────────────
                      CONSENT & VERIFICATION
────────────────────────────────────────────────────────────────

Information Accuracy Confirmed:     ${data.confirmAccurate ? "YES" : "NO"}
Data Processing Consent Given:      ${data.consentToProcess ? "YES" : "NO"}

════════════════════════════════════════════════════════════════

This application was submitted through the Optimus Solutions website.
Please follow up with the applicant within 24-48 hours.

Reply directly to this email to contact the applicant at: ${data.email}

────────────────────────────────────────────────────────────────
Optimus Solutions | 
Phone: +27 (72) 960-3512 | Email: optimusolutions2@gmail.com
Trade Number: 2025/17469107
────────────────────────────────────────────────────────────────
    `.trim()

    // HTML email for better presentation in email clients
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Loan Application</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #012a4a 0%, #014f86 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Loan Application</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0; font-size: 14px;">Submitted via Optimus Solutions Website</p>
    </div>
    
    <!-- Application Info Banner -->
    <div style="background-color: #f8fafc; padding: 20px 30px; border-bottom: 1px solid #e5e7eb;">
      <table style="width: 100%;">
        <tr>
          <td style="padding: 5px 0;">
            <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Application ID</span>
            <div style="color: #012a4a; font-size: 18px; font-weight: 600; font-family: 'Courier New', monospace;">${applicationId}</div>
          </td>
          <td style="padding: 5px 0; text-align: right;">
            <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Submitted</span>
            <div style="color: #374151; font-size: 14px;">${submissionTimestamp}</div>
          </td>
        </tr>
      </table>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      <!-- Personal Information -->
      <h2 style="color: #012a4a; font-size: 16px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Personal Information</h2>
      <table style="width: 100%; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;">Full Name:</td>
          <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">ID Number:</td>
          <td style="padding: 8px 0; color: #1a1a1a; font-family: 'Courier New', monospace;">${data.idNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Phone Number:</td>
          <td style="padding: 8px 0; color: #1a1a1a;"><a href="tel:${data.phoneNumber}" style="color: #014f86; text-decoration: none;">${data.phoneNumber}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Email:</td>
          <td style="padding: 8px 0; color: #1a1a1a;"><a href="mailto:${data.email}" style="color: #014f86; text-decoration: none;">${data.email}</a></td>
        </tr>
      </table>
      
      <!-- Loan Details -->
      <h2 style="color: #012a4a; font-size: 16px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Loan Details</h2>
      <table style="width: 100%; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px;">Requested Amount:</td>
          <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600; font-size: 18px;">R${Number(data.loanAmount).toLocaleString("en-ZA")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Employment:</td>
          <td style="padding: 8px 0; color: #1a1a1a;">${data.employmentStatus.charAt(0).toUpperCase() + data.employmentStatus.slice(1).replace("-", " ")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Monthly Income:</td>
          <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">R${Number(data.monthlyIncome).toLocaleString("en-ZA")}</td>
        </tr>
      </table>
      
      <!-- Additional Notes -->
      <h2 style="color: #012a4a; font-size: 16px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Additional Notes</h2>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 25px; color: #374151;">
        ${data.notes?.trim() ? data.notes.replace(/\n/g, "<br>") : "<em style='color: #9ca3af;'>No additional notes provided.</em>"}
      </div>
      
      <!-- Consent Status -->
      <h2 style="color: #012a4a; font-size: 16px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Consent & Verification</h2>
      <table style="width: 100%; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Information Accuracy:</td>
          <td style="padding: 8px 0;">
            <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; ${data.confirmAccurate ? "background-color: #dcfce7; color: #166534;" : "background-color: #fee2e2; color: #991b1b;"}">${data.confirmAccurate ? "Confirmed" : "Not Confirmed"}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Data Processing Consent:</td>
          <td style="padding: 8px 0;">
            <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; ${data.consentToProcess ? "background-color: #dcfce7; color: #166534;" : "background-color: #fee2e2; color: #991b1b;"}">${data.consentToProcess ? "Agreed" : "Not Agreed"}</span>
          </td>
        </tr>
      </table>
      
      <!-- Action Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:${data.email}?subject=Re: Your Loan Application ${applicationId}" style="display: inline-block; background: linear-gradient(135deg, #012a4a 0%, #014f86 100%); color: #ffffff; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">Reply to Applicant</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
      <p style="margin: 0 0 5px; color: #374151; font-weight: 500;">Optimus Solutions</p>
      <p style="margin: 5px 0 0; color: #6b7280; font-size: 13px;"+27 (76) 851-3565| optimusolutions2@gmail.com</p>
      <p style="margin: 10px 0 0; color: #9ca3af; font-size: 11px;">Trade Number: 2025/17469107</p>
    </div>
  </div>
</body>
</html>
    `.trim()

    // Check which email method to use
    const receivingEmail = process.env.OPTIMUS_RECEIVING_EMAIL
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey && receivingEmail) {
      // Send via Resend with both HTML and plain text versions
      const response = await fetch("https://api.resend.com/emails", {
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
          html: emailHtml,
          reply_to: data.email,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Resend API error:", errorText)
        // Log the application details so no data is lost
        console.log("=== APPLICATION DATA (Email failed) ===")
        console.log("Application ID:", applicationId)
        console.log("Data:", JSON.stringify(data, null, 2))
        console.log("========================================")
        // Still return success to user - their application is recorded in logs
      } else {
        console.log(`Email sent successfully for application ${applicationId}`)
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
