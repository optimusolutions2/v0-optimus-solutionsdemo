
"use server"

import { Resend } from "resend"

const ENQUIRY_TYPES = [
  "New loan application",
  "Existing loan application",
  "Business services",
  "Partnerships and collaborations",
  "General enquiry",
  "Other",
] as const

type EnquiryType = (typeof ENQUIRY_TYPES)[number]

interface ContactFormData {
  name: string
  phone: string
  email: string
  enquiryType: EnquiryType
  message: string
}

interface SubmissionResult {
  success: boolean
  message: string
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }

    return entities[character]
  })
}

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmissionResult> {
  const name = typeof data?.name === "string" ? data.name.trim() : ""
  const phone = typeof data?.phone === "string" ? data.phone.trim() : ""
  const email =
    typeof data?.email === "string" ? data.email.trim().toLowerCase() : ""
  const message =
    typeof data?.message === "string" ? data.message.trim() : ""
  const enquiryType = data?.enquiryType

  if (!name || name.length > 120) {
    return {
      success: false,
      message: "Please enter your name (maximum 120 characters).",
    }
  }

  if (!phone || phone.length > 30) {
    return {
      success: false,
      message: "Please enter a valid contact phone number.",
    }
  }

  if (!/^[+()\d\s-]{7,30}$/.test(phone)) {
    return {
      success: false,
      message: "Please enter a valid contact phone number.",
    }
  }

  if (!email || email.length > 254) {
    return { success: false, message: "Please enter a valid email address." }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." }
  }

  if (!ENQUIRY_TYPES.includes(enquiryType)) {
    return {
      success: false,
      message: "Please select a valid enquiry type.",
    }
  }

  if (message.length > 3000) {
    return {
      success: false,
      message: "Your message must be 3,000 characters or fewer.",
    }
  }

  if (message.length > 0 && message.length < 10) {
    return {
      success: false,
      message: "Please enter at least 10 characters, or leave the message blank.",
    }
  }

  const receivingEmail = process.env.OPTIMUS_RECEIVING_EMAIL
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey || !receivingEmail) {
    console.error(
      "[Contact Form] Email is not configured. Submission was not delivered."
    )

    return {
      success: false,
      message:
        "We couldn't send your enquiry right now. Please try again later or contact us directly.",
    }
  }

  const safeName = escapeHtml(name)
  const safePhone = escapeHtml(phone)
  const safeEmail = escapeHtml(email)
  const safeEnquiryType = escapeHtml(enquiryType)
  const safeMessage = escapeHtml(message || "No additional message provided.")

  try {
    const resend = new Resend(resendApiKey)

    const { error } = await resend.emails.send({
      from: "Optimus Solutions <noreply@resend.dev>",
      to: receivingEmail,
      replyTo: email,
      subject: `[${enquiryType}] Enquiry from ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Optimus Solutions Enquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #012a4a; padding: 28px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Customer Enquiry</h1>
    <p style="color: #cbd5e1; margin: 8px 0 0;">Optimus Solutions Website</p>
  </div>

  <div style="background: #f8fafc; padding: 28px; border: 1px solid #e2e8f0;">
    <div style="display: inline-block; background: #e2e8f0; color: #012a4a; padding: 8px 12px; border-radius: 6px; font-weight: bold; margin-bottom: 18px;">
      ${safeEnquiryType}
    </div>

    <h2 style="color: #012a4a; font-size: 18px;">Customer details</h2>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 110px; vertical-align: top;">Name</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Phone</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${safePhone}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Email</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
          <a href="mailto:${safeEmail}" style="color: #012a4a;">${safeEmail}</a>
        </td>
      </tr>
    </table>

    <h2 style="color: #012a4a; margin-top: 26px; font-size: 18px;">Message</h2>
    <div style="background: #ffffff; padding: 18px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; overflow-wrap: anywhere;">${safeMessage}</div>
  </div>

  <div style="background: #012a4a; padding: 18px; text-align: center; border-radius: 0 0 10px 10px;">
    <p style="color: #cbd5e1; margin: 0; font-size: 13px;">Submitted through the Optimus Solutions contact form.</p>
  </div>
</body>
</html>
      `,
    })

    if (error) {
      console.error("[Contact Form] Resend error:", error)

      return {
        success: false,
        message:
          "We couldn't send your enquiry right now. Please try again or contact us directly.",
      }
    }

    console.log("[Contact Form] Email sent successfully")

    return {
      success: true,
      message: "Your enquiry has been sent successfully.",
    }
  } catch (error) {
    console.error("[Contact Form] Failed to send email:", error)

    return {
      success: false,
      message:
        "We couldn't send your enquiry right now. Please try again or contact us directly.",
    }
  }
}
