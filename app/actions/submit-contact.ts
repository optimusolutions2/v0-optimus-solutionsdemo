"use server"

import { Resend } from "resend"

const enquiryTypes = [
  "Accounting & Financial Reporting",
  "Tax & SARS Services",
  "Business Advisory",
  "Business Administration & Compliance",
] as const

export interface SubmitContactResult {
  success: boolean
  message: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function submitContactForm(
  formData: FormData,
): Promise<SubmitContactResult> {
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const enquiryType = String(formData.get("enquiryType") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !phone || !email || !enquiryType || !message) {
    return {
      success: false,
      message: "Please complete all required fields.",
    }
  }

  if (name.length > 120 || phone.length > 30 || email.length > 254) {
    return {
      success: false,
      message: "One or more fields exceed the permitted length.",
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  if (!/^[+()\d\s-]{7,30}$/.test(phone)) {
    return {
      success: false,
      message: "Please enter a valid phone number.",
    }
  }

  if (!enquiryTypes.includes(enquiryType as (typeof enquiryTypes)[number])) {
    return {
      success: false,
      message: "Please select one of the available professional services.",
    }
  }

  if (message.length < 10 || message.length > 3000) {
    return {
      success: false,
      message: "Your message must be between 10 and 3,000 characters.",
    }
  }

  const receivingEmail = "info@optimussolutions.co.za"
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.error("Contact form could not send: RESEND_API_KEY is missing.")

    return {
      success: false,
      message:
        "We couldn't send your enquiry right now. Please email info@optimussolutions.co.za directly.",
    }
  }

  const resend = new Resend(resendApiKey)

  const safeName = escapeHtml(name)
  const safePhone = escapeHtml(phone)
  const safeEmail = escapeHtml(email)
  const safeEnquiryType = escapeHtml(enquiryType)
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")

  try {
    // 1. Send the internal enquiry notification.
    const { error: notificationError } = await resend.emails.send({
      from: "Optimus Solutions <info@optimussolutions.co.za>",
      to: [receivingEmail],
      replyTo: email,
      subject: `[${enquiryType}] Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; max-width: 640px; margin: 0 auto;">
          <div style="background: #012a4a; color: #ffffff; padding: 24px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 22px;">New Website Enquiry</h1>
            <p style="margin: 8px 0 0; color: #e2e8f0;">Optimus Solutions</p>
          </div>

          <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 10px 10px;">
            <p><strong>Professional service:</strong><br />${safeEnquiryType}</p>
            <p><strong>Full name:</strong><br />${safeName}</p>
            <p><strong>Phone number:</strong><br />${safePhone}</p>
            <p><strong>Email address:</strong><br />${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">${safeMessage}</div>
          </div>
        </div>
      `,
    })

    if (notificationError) {
      console.error("Resend contact notification error:", notificationError)

      return {
        success: false,
        message:
          "We couldn't send your enquiry right now. Please try again or email info@optimussolutions.co.za.",
      }
    }

    // 2. Send the automatic acknowledgement to the customer.
    try {
      const { error: acknowledgementError } = await resend.emails.send({
        from: "Optimus Solutions <info@optimussolutions.co.za>",
        to: [email],
        subject: "Thank You for Contacting Optimus Solutions",
        text: `Dear Valued Client,

Thank you for contacting Optimus Solutions (Pty) Ltd.

We appreciate your interest in our services and are pleased to have the opportunity to assist you.

This is an automatic acknowledgement confirming that we have successfully received your enquiry. One of our team members will review your request and get back to you as soon as possible.

At Optimus Solutions, we are committed to providing professional, reliable and innovative solutions tailored to meet your business needs.

Should your enquiry be urgent, please feel free to contact us directly.

Thank you for considering Optimus Solutions as your preferred business partner.

Kind regards,

Customer Support Team
Optimus Solutions (Pty) Ltd
Professional Solutions. Exceptional Service`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.7; max-width: 640px; margin: 0 auto;">
            <div style="background: #012a4a; color: #ffffff; padding: 24px; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 22px;">Optimus Solutions</h1>
              <p style="margin: 8px 0 0; color: #e2e8f0;">Professional Solutions. Exceptional Service</p>
            </div>

            <div style="padding: 28px 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 10px 10px;">
              <p>Dear Valued Client,</p>

              <p>Thank you for contacting Optimus Solutions (Pty) Ltd.</p>

              <p>We appreciate your interest in our services and are pleased to have the opportunity to assist you.</p>

              <p>This is an automatic acknowledgement confirming that we have successfully received your enquiry. One of our team members will review your request and get back to you as soon as possible.</p>

              <p>At Optimus Solutions, we are committed to providing professional, reliable and innovative solutions tailored to meet your business needs.</p>

              <p>Should your enquiry be urgent, please feel free to contact us directly.</p>

              <p>Thank you for considering Optimus Solutions as your preferred business partner.</p>

              <p style="margin-top: 28px;">
                Kind regards,<br /><br />
                <strong>Customer Support Team</strong><br />
                Optimus Solutions (Pty) Ltd<br />
                <span style="color: #64748b;">Professional Solutions. Exceptional Service</span>
              </p>
            </div>
          </div>
        `,
      })

      if (acknowledgementError) {
        console.error(
          "Customer enquiry acknowledgement failed:",
          acknowledgementError,
        )
      }
    } catch (acknowledgementError) {
      console.error(
        "Customer enquiry acknowledgement failed:",
        acknowledgementError,
      )
    }

    return {
      success: true,
      message: "Your enquiry has been sent successfully.",
    }
  } catch (error) {
    console.error("Contact form submission failed:", error)

    return {
      success: false,
      message:
        "We couldn't send your enquiry right now. Please try again or email info@optimussolutions.co.za.",
    }
  }
}
