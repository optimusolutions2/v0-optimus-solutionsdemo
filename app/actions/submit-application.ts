"use server"

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_TOTAL_SIZE = 28 * 1024 * 1024

const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
])

const REQUIRED_DOCUMENTS = [
  { key: "idFront", label: "ID Front" },
  { key: "idBack", label: "ID Back" },
  { key: "bankStatement", label: "3 Months Bank Statement" },
  { key: "proofOfAddress", label: "Proof of Address" },
  { key: "payslip1", label: "Payslip - Month 1" },
  { key: "payslip2", label: "Payslip - Month 2" },
  { key: "payslip3", label: "Payslip - Month 3" },
] as const

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function submitApplication(
  formData: FormData
): Promise<SubmitApplicationResult> {
  try {
    // ---------------------------------------------
    // Application fields
    // ---------------------------------------------

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

    // ---------------------------------------------
    // Basic validation
    // ---------------------------------------------

    if (
      !fullName ||
      !idNumber ||
      !email ||
      !phoneNumber ||
      !loanAmount ||
      !employmentStatus ||
      !monthlyIncome
    ) {
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

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
        message: "You must agree to the data processing terms.",
      }
    }

    // ---------------------------------------------
    // Validate documents
    // ---------------------------------------------

    const files: {
      key: string
      label: string
      file: File
    }[] = []

    let totalSize = 0

    for (const document of REQUIRED_DOCUMENTS) {
      const value = formData.get(document.key)

      if (!(value instanceof File) || value.size === 0) {
        return {
          success: false,
          message: `${document.label} is required.`,
        }
      }

      if (!ALLOWED_FILE_TYPES.has(value.type)) {
        return {
          success: false,
          message: `${document.label} must be a PDF, JPG, JPEG or PNG file.`,
        }
      }

      if (value.size > MAX_FILE_SIZE) {
        return {
          success: false,
          message: `${document.label} is too large. Maximum size is 10MB.`,
        }
      }

      totalSize += value.size

      files.push({
        key: document.key,
        label: document.label,
        file: value,
      })
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return {
        success: false,
        message:
          "The combined size of your documents is too large. Please use smaller files. Maximum total size is 28MB.",
      }
    }

    // ---------------------------------------------
    // Generate application ID
    // ---------------------------------------------

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

    // ---------------------------------------------
    // Prepare attachments for Resend
    // ---------------------------------------------

    const attachments = await Promise.all(
      files.map(async ({ file }) => {
        const buffer = Buffer.from(await file.arrayBuffer())

        return {
          filename: file.name,
          content: buffer.toString("base64"),
        }
      })
    )

    // ---------------------------------------------
    // Plain text email
    // ---------------------------------------------

    const emailSubject = `New Loan Application: ${fullName} - ${applicationId}`

    const emailBody = `
============================================================
                    NEW LOAN APPLICATION
============================================================

Application ID:     ${applicationId}
Submission Date:    ${submissionTimestamp}

------------------------------------------------------------
                    PERSONAL INFORMATION
------------------------------------------------------------

Full Name:          ${fullName}
ID Number:          ${idNumber}
Phone Number:       ${phoneNumber}
Email Address:      ${email}

------------------------------------------------------------
                      LOAN DETAILS
------------------------------------------------------------

Requested Amount:   R${Number(loanAmount).toLocaleString("en-ZA")}
Employment Status:  ${employmentStatus
      .charAt(0)
      .toUpperCase()}${employmentStatus.slice(1).replace("-", " ")}
Monthly Income:     R${Number(monthlyIncome).toLocaleString("en-ZA")}

------------------------------------------------------------
                    REQUIRED DOCUMENTS
------------------------------------------------------------

${files
  .map(
    ({ label, file }) =>
      `${label}: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`
  )
  .join("\n")}

------------------------------------------------------------
                    ADDITIONAL NOTES
------------------------------------------------------------

${notes || "No additional notes provided."}

------------------------------------------------------------
                    CONSENT & VERIFICATION
------------------------------------------------------------

Information Accuracy Confirmed:
${confirmAccurate ? "YES" : "NO"}

Data Processing Consent Given:
${consentToProcess ? "YES" : "NO"}

============================================================

This application was submitted through the Optimus Solutions website.

Please follow up with the applicant within 24-48 hours.

Reply directly to this email to contact the applicant at:
${email}

------------------------------------------------------------
Optimus Solutions
Phone: +27 (76) 851-3565
Email: optimusolutions2@gmail.com
Trade Number: 2025/17469107
------------------------------------------------------------
`.trim()

    // ---------------------------------------------
    // HTML email
    // ---------------------------------------------

    const safeFullName = escapeHtml(fullName)
    const safeIdNumber = escapeHtml(idNumber)
    const safePhone = escapeHtml(phoneNumber)
    const safeEmail = escapeHtml(email)
    const safeNotes = escapeHtml(notes)

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Loan Application</title>
</head>

<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#1a1a1a;max-width:600px;margin:0 auto;padding:20px;background-color:#f5f5f5;">

  <div style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

    <div style="background:linear-gradient(135deg,#012a4a 0%,#014f86 100%);padding:30px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:600;">
        New Loan Application
      </h1>

      <p style="color:rgba(255,255,255,0.8);margin:10px 0 0;font-size:14px;">
        Submitted via Optimus Solutions Website
      </p>
    </div>

    <div style="background-color:#f8fafc;padding:20px 30px;border-bottom:1px solid #e5e7eb;">
      <table style="width:100%;">
        <tr>
          <td style="padding:5px 0;">
            <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">
              Application ID
            </span>

            <div style="color:#012a4a;font-size:18px;font-weight:600;font-family:'Courier New',monospace;">
              ${applicationId}
            </div>
          </td>

          <td style="padding:5px 0;text-align:right;">
            <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">
              Submitted
            </span>

            <div style="color:#374151;font-size:14px;">
              ${submissionTimestamp}
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div style="padding:30px;">

      <h2 style="color:#012a4a;font-size:16px;margin:0 0 15px;padding-bottom:10px;border-bottom:2px solid #e5e7eb;">
        Personal Information
      </h2>

      <table style="width:100%;margin-bottom:25px;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;width:140px;">Full Name:</td>
          <td style="padding:8px 0;color:#1a1a1a;font-weight:500;">
            ${safeFullName}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;color:#6b7280;">ID Number:</td>
          <td style="padding:8px 0;color:#1a1a1a;font-family:'Courier New',monospace;">
            ${safeIdNumber}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;color:#6b7280;">Phone Number:</td>
          <td style="padding:8px 0;color:#1a1a1a;">
            <a href="tel:${safePhone}" style="color:#014f86;text-decoration:none;">
              ${safePhone}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;color:#6b7280;">Email:</td>
          <td style="padding:8px 0;color:#1a1a1a;">
            <a href="mailto:${safeEmail}" style="color:#014f86;text-decoration:none;">
              ${safeEmail}
            </a>
          </td>
        </tr>
      </table>

      <h2 style="color:#012a4a;font-size:16px;margin:0 0 15px;padding-bottom:10px;border-bottom:2px solid #e5e7eb;">
        Loan Details
      </h2>

      <table style="width:100%;margin-bottom:25px;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;width:140px;">Requested Amount:</td>
          <td style="padding:8px 0;color:#1a1a1a;font-weight:600;font-size:18px;">
            R${Number(loanAmount).toLocaleString("en-ZA")}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;color:#6b7280;">Employment:</td>
          <td style="padding:8px 0;color:#1a1a1a;">
            ${escapeHtml(
              employmentStatus.charAt(0).toUpperCase() +
                employmentStatus.slice(1).replace("-", " ")
            )}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;color:#6b7280;">Monthly Income:</td>
          <td style="padding:8px 0;color:#1a1a1a;font-weight:500;">
            R${Number(monthlyIncome).toLocaleString("en-ZA")}
          </td>
        </tr>
      </table>

      <h2 style="color:#012a4a;font-size:16px;margin:0 0 15px;padding-bottom:10px;border-bottom:2px solid #e5e7eb;">
        Documents Attached
      </h2>

      <div style="background-color:#f8fafc;padding:15px;border-radius:8px;margin-bottom:25px;">
        ${files
          .map(
            ({ label, file }) => `
              <div style="padding:9px 0;border-bottom:1px solid #e5e7eb;">
                <strong style="color:#012a4a;">
                  ${escapeHtml(label)}
                </strong>
                <br>
                <span style="font-size:13px;color:#6b7280;">
                  ${escapeHtml(file.name)}
                  · ${(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            `
          )
          .join("")}
      </div>

      <h2 style="color:#012a4a;font-size:16px;margin:0 0 15px;padding-bottom:10px;border-bottom:2px solid #e5e7eb;">
        Additional Notes
      </h2>

      <div style="background-color:#f8fafc;padding:15px;border-radius:8px;margin-bottom:25px;color:#374151;">
        ${
          safeNotes
            ? safeNotes.replace(/\n/g, "<br>")
            : "<em style='color:#9ca3af;'>No additional notes provided.</em>"
        }
      </div>

      <h2 style="color:#012a4a;font-size:16px;margin:0 0 15px;padding-bottom:10px;border-bottom:2px solid #e5e7eb;">
        Consent & Verification
      </h2>

      <table style="width:100%;margin-bottom:25px;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;">
            Information Accuracy:
          </td>

          <td style="padding:8px 0;">
            <span style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500;background-color:#dcfce7;color:#166534;">
              Confirmed
            </span>
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;color:#6b7280;">
            Data Processing Consent:
          </td>

          <td style="padding:8px 0;">
            <span style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500;background-color:#dcfce7;color:#166534;">
              Agreed
            </span>
          </td>
        </tr>
      </table>

      <div style="text-align:center;margin:30px 0;">
        <a
          href="mailto:${safeEmail}?subject=Re:%20Your%20Loan%20Application%20${applicationId}"
          style="display:inline-block;background:linear-gradient(135deg,#012a4a 0%,#014f86 100%);color:#ffffff;padding:14px 30px;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;"
        >
          Reply to Applicant
        </a>
      </div>

    </div>

    <div style="background-color:#f8fafc;padding:20px 30px;border-top:1px solid #e5e7eb;text-align:center;">

      <p style="margin:0 0 5px;color:#374151;font-weight:500;">
        Optimus Solutions
      </p>

      <p style="margin:5px 0 0;color:#6b7280;font-size:13px;">
        +27 (76) 851-3565 · optimusolutions2@gmail.com
      </p>

      <p style="margin:10px 0 0;color:#9ca3af;font-size:11px;">
        Trade Number: 2025/17469107
      </p>

    </div>

  </div>

</body>
</html>
`.trim()

    // ---------------------------------------------
    // Send through Resend
    // ---------------------------------------------

    const receivingEmail = process.env.OPTIMUS_RECEIVING_EMAIL
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey || !receivingEmail) {
      console.error(
        "Missing OPTIMUS_RECEIVING_EMAIL or RESEND_API_KEY"
      )

      return {
        success: false,
        message:
          "The application service is not configured correctly. Please try again later.",
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
          html: emailHtml,
          reply_to: email,
          attachments,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()

      console.error("Resend API error:", errorText)

      return {
        success: false,
        message:
          "We could not send your application. Please try again or contact Optimus Solutions directly.",
      }
    }

    console.log(
      `Application ${applicationId} submitted successfully with ${files.length} documents.`
    )

    return {
      success: true,
      message: "Your application has been submitted successfully.",
      applicationId,
    }
  } catch (error) {
    console.error("Application submission error:", error)

    return {
      success: false,
      message:
        "An error occurred. Please try again or contact us directly.",
    }
  }
}
