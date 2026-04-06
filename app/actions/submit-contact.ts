"use server"

import { Resend } from "resend"

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface SubmissionResult {
  success: boolean
  message: string
}

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmissionResult> {
  // Validate required fields
  if (!data.name?.trim()) {
    return { success: false, message: "Name is required" }
  }

  if (!data.email?.trim()) {
    return { success: false, message: "Email is required" }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, message: "Please enter a valid email address" }
  }

  if (!data.message?.trim()) {
    return { success: false, message: "Message is required" }
  }

  if (data.message.trim().length < 10) {
    return { success: false, message: "Message must be at least 10 characters" }
  }

  // Send email using Resend if configured
  const receivingEmail = process.env.OPTIMUS_RECEIVING_EMAIL
  const resendApiKey = process.env.RESEND_API_KEY

  if (resendApiKey && receivingEmail) {
    try {
      const resend = new Resend(resendApiKey)

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #012a4a 0%, #01497c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">Optimus Solutions Website</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <h2 style="color: #012a4a; margin-top: 0; font-size: 18px; border-bottom: 2px solid #012a4a; padding-bottom: 10px;">
      Contact Details
    </h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 100px; vertical-align: top;">Name:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; vertical-align: top;">Email:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
          <a href="mailto:${data.email}" style="color: #012a4a;">${data.email}</a>
        </td>
      </tr>
    </table>

    <h2 style="color: #012a4a; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #012a4a; padding-bottom: 10px;">
      Message
    </h2>
    
    <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
      <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
    </div>
  </div>
  
  <div style="background: #012a4a; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
    <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px;">
      This message was sent from the Optimus Solutions contact form.
    </p>
  </div>
</body>
</html>
      `

      await resend.emails.send({
        from: "Optimus Solutions <noreply@resend.dev>",
        to: receivingEmail,
        replyTo: data.email,
        subject: `Contact Form: Message from ${data.name}`,
        html: emailHtml,
      })

      console.log("[Contact Form] Email sent successfully")
    } catch (error) {
      console.error("[Contact Form] Failed to send email:", error)
      return {
        success: false,
        message: "Failed to send message. Please try again or contact us directly.",
      }
    }
  } else {
    // Log the submission if email is not configured
    console.log("[Contact Form] New submission (email not configured):", {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString(),
    })
  }

  return {
    success: true,
    message: "Your message has been sent successfully.",
  }
}
