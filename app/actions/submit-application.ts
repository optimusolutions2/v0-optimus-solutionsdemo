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

const DOCUMENT_DESCRIPTIONS: Record<
  DocumentField,
  string
> = {
  idFront: "Front of South African ID",
  idBack: "Back of South African ID",
  bankStatement: "Latest 3 months bank statement",
  proofOfAddress: "Recent proof of residential address",
  payslips: "Latest 3 months payslips",
}

const ALLOWED_BLOB_HOST_SUFFIX =
  ".public.blob.vercel-storage.com"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function validateBlobUrl(
  value: string
): boolean {
  try {
    const url = new URL(value)

    if (url.protocol !== "https:") {
      return false
    }

    return (
      url.hostname.endsWith(
        ALLOWED_BLOB_HOST_SUFFIX
      ) ||
      url.hostname.includes(
        "blob.vercel-storage.com"
      )
    )
  } catch {
    return false
  }
}

function getFileExtension(
  url: string
): string {
  try {
    const pathname = new URL(url).pathname
    const extension =
      pathname
        .split(".")
        .pop()
        ?.toLowerCase()

    return extension || ""
  } catch {
    return ""
  }
}

function isImageUrl(
  url: string
): boolean {
  const extension =
    getFileExtension(url)

  return [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ].includes(extension)
}

function isPdfUrl(
  url: string
): boolean {
  return getFileExtension(url) === "pdf"
}

function createDocumentPreview(
  field: DocumentField,
  url: string
): string {
  const name = escapeHtml(
    DOCUMENT_NAMES[field]
  )

  const description =
    escapeHtml(
      DOCUMENT_DESCRIPTIONS[field]
    )

  const safeUrl =
    escapeHtml(url)

  const image =
    isImageUrl(url)

  const pdf =
    isPdfUrl(url)

  let previewContent = ""

  // ---------------------------------------------------------
  // Image preview
  // ---------------------------------------------------------

  if (image) {
    previewContent = `
      <a
        href="${safeUrl}"
        target="_blank"
        style="
          display:block;
          text-decoration:none;
          color:inherit;
        "
      >
        <div
          style="
            width:100%;
            height:210px;
            background:#f1f5f9;
            border-radius:10px;
            overflow:hidden;
            border:1px solid #e2e8f0;
          "
        >
          <img
            src="${safeUrl}"
            alt="${name}"
            style="
              display:block;
              width:100%;
              height:210px;
              object-fit:contain;
              background:#f8fafc;
            "
          />
        </div>
      </a>
    `
  }

  // ---------------------------------------------------------
  // PDF preview
  // ---------------------------------------------------------

  else if (pdf) {
    previewContent = `
      <a
        href="${safeUrl}"
        target="_blank"
        style="
          display:block;
          text-decoration:none;
          color:inherit;
        "
      >
        <div
          style="
            height:210px;
            border-radius:10px;
            border:1px solid #e2e8f0;
            background:#f8fafc;
            display:flex;
            align-items:center;
            justify-content:center;
            text-align:center;
          "
        >

          <div>

            <div
              style="
                width:64px;
                height:76px;
                margin:0 auto 12px;
                border-radius:8px;
                background:#ffffff;
                border:1px solid #cbd5e1;
                box-shadow:0 2px 5px rgba(15,23,42,.08);
                position:relative;
              "
            >

              <div
                style="
                  height:23px;
                  background:#dc2626;
                  border-radius:7px 7px 0 0;
                  color:#ffffff;
                  font-size:10px;
                  font-weight:bold;
                  line-height:23px;
                "
              >
                PDF
              </div>

              <div
                style="
                  padding-top:12px;
                  font-size:20px;
                  color:#64748b;
                "
              >
                📄
              </div>

            </div>

            <div
              style="
                font-size:13px;
                font-weight:600;
                color:#334155;
              "
            >
              PDF Document
            </div>

            <div
              style="
                margin-top:4px;
                font-size:11px;
                color:#94a3b8;
              "
            >
              Click to open
            </div>

          </div>

        </div>
      </a>
    `
  }

  // ---------------------------------------------------------
  // Generic document preview
  // ---------------------------------------------------------

  else {
    previewContent = `
      <a
        href="${safeUrl}"
        target="_blank"
        style="
          display:block;
          text-decoration:none;
          color:inherit;
        "
      >
        <div
          style="
            height:210px;
            border-radius:10px;
            border:1px solid #e2e8f0;
            background:#f8fafc;
            display:flex;
            align-items:center;
            justify-content:center;
            text-align:center;
          "
        >

          <div>

            <div
              style="
                font-size:42px;
                margin-bottom:10px;
              "
            >
              📄
            </div>

            <div
              style="
                font-size:13px;
                font-weight:600;
                color:#334155;
              "
            >
              Document
            </div>

            <div
              style="
                margin-top:4px;
                font-size:11px;
                color:#94a3b8;
              "
            >
              Click to open
            </div>

          </div>

        </div>
      </a>
    `
  }

  return `
    <div
      style="
        width:100%;
        box-sizing:border-box;
        border:1px solid #e2e8f0;
        border-radius:12px;
        background:#ffffff;
        padding:12px;
        margin-bottom:16px;
      "
    >

      ${previewContent}

      <div
        style="
          padding:12px 3px 3px;
        "
      >

        <div
          style="
            font-size:14px;
            font-weight:700;
            color:#0f172a;
          "
        >
          ${name}
        </div>

        <div
          style="
            margin-top:4px;
            font-size:12px;
            color:#64748b;
          "
        >
          ${description}
        </div>

        <a
          href="${safeUrl}"
          target="_blank"
          style="
            display:inline-block;
            margin-top:11px;
            padding:8px 13px;
            border-radius:7px;
            background:#012a4a;
            color:#ffffff;
            font-size:12px;
            font-weight:600;
            text-decoration:none;
          "
        >
          View Document →
        </a>

      </div>

    </div>
  `
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
      String(
        formData.get("confirmAccurate")
      ) === "true"

    const consentToProcess =
      String(
        formData.get("consentToProcess")
      ) === "true"

    const suppliedApplicationId =
      String(
        formData.get("applicationId") || ""
      ).trim()

    // ---------------------------------------------------------
    // 2. Validate application ID
    // ---------------------------------------------------------

    if (!suppliedApplicationId) {
      return {
        success: false,
        message:
          "Application ID is missing.",
      }
    }

    // ---------------------------------------------------------
    // 3. Required fields
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
        message:
          "Please complete all required fields.",
      }
    }

    // ---------------------------------------------------------
    // 4. South African ID
    // ---------------------------------------------------------

    const cleanIdNumber =
      idNumber.replace(/\s/g, "")

    if (
      !/^\d{13}$/.test(
        cleanIdNumber
      )
    ) {
      return {
        success: false,
        message:
          "Please enter a valid South African ID number containing exactly 13 digits.",
      }
    }

    // ---------------------------------------------------------
    // 5. Phone
    // ---------------------------------------------------------

    const cleanPhone =
      phoneNumber.replace(/\s/g, "")

    if (
      !/^(\+27|0)[0-9]{9}$/.test(
        cleanPhone
      )
    ) {
      return {
        success: false,
        message:
          "Please enter a valid South African phone number.",
      }
    }

    // ---------------------------------------------------------
    // 6. Email
    // ---------------------------------------------------------

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return {
        success: false,
        message:
          "Please enter a valid email address.",
      }
    }

    // ---------------------------------------------------------
    // 7. Loan amount
    // ---------------------------------------------------------

    const numericLoanAmount =
      Number(loanAmount)

    if (
      !Number.isFinite(
        numericLoanAmount
      ) ||
      numericLoanAmount <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid loan amount.",
      }
    }

    // ---------------------------------------------------------
    // 8. Monthly income
    // ---------------------------------------------------------

    const numericMonthlyIncome =
      Number(monthlyIncome)

    if (
      !Number.isFinite(
        numericMonthlyIncome
      ) ||
      numericMonthlyIncome <= 0
    ) {
      return {
        success: false,
        message:
          "Please enter a valid monthly income.",
      }
    }

    // ---------------------------------------------------------
    // 9. Employment
    // ---------------------------------------------------------

    const allowedEmploymentStatuses = [
      "employed",
      "self-employed",
      "unemployed",
      "retired",
    ]

    if (
      !allowedEmploymentStatuses.includes(
        employmentStatus
      )
    ) {
      return {
        success: false,
        message:
          "Please select a valid employment status.",
      }
    }

    // ---------------------------------------------------------
    // 10. Confirmations
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

    const documentUrls: Record<
      DocumentField,
      string
    > = {
      idFront: String(
        formData.get("idFront") || ""
      ).trim(),

      idBack: String(
        formData.get("idBack") || ""
      ).trim(),

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

    for (
      const field of DOCUMENT_FIELDS
    ) {
      if (!documentUrls[field]) {
        return {
          success: false,
          message:
            `Please upload the required document: ${DOCUMENT_NAMES[field]}.`,
        }
      }

      if (
        !validateBlobUrl(
          documentUrls[field]
        )
      ) {
        return {
          success: false,
          message:
            `${DOCUMENT_NAMES[field]} has an invalid upload reference.`,
        }
      }
    }

    // ---------------------------------------------------------
    // 13. Submission timestamp
    // ---------------------------------------------------------

    const submissionTimestamp =
      new Date().toLocaleString(
        "en-ZA",
        {
          timeZone:
            "Africa/Johannesburg",

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
    // 14. Escape user-provided content
    // ---------------------------------------------------------

    const safeFullName =
      escapeHtml(fullName)

    const safeEmail =
      escapeHtml(email)

    const safePhone =
      escapeHtml(phoneNumber)

    const safeEmployment =
      escapeHtml(
        employmentStatus
      )

    const safeNotes =
      escapeHtml(
        notes ||
          "No additional notes were provided."
      ).replace(
        /\n/g,
        "<br />"
      )

    // ---------------------------------------------------------
    // 15. Build document previews
    // ---------------------------------------------------------

    const documentPreviews =
      DOCUMENT_FIELDS.map(
        (field) =>
          createDocumentPreview(
            field,
            documentUrls[field]
          )
      ).join("")

    // ---------------------------------------------------------
    // 16. Email subject
    // ---------------------------------------------------------

    const emailSubject =
      `New Loan Application — ${fullName} (${suppliedApplicationId})`

    // ---------------------------------------------------------
    // 17. HTML email
    // ---------------------------------------------------------

    const emailHtml = `
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    New Loan Application
  </title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#eef2f5;
    font-family:Arial,Helvetica,sans-serif;
    color:#1e293b;
  "
>

  <div
    style="
      width:100%;
      padding:30px 12px;
      box-sizing:border-box;
    "
  >

    <div
      style="
        max-width:720px;
        margin:0 auto;
      "
    >

      <!-- ================================================= -->
      <!-- HEADER -->
      <!-- ================================================= -->

      <div
        style="
          background:#012a4a;
          border-radius:16px 16px 0 0;
          padding:30px;
        "
      >

        <div
          style="
            font-size:26px;
            line-height:1.2;
            font-weight:700;
            color:#ffffff;
          "
        >
          Optimus Solutions
        </div>

        <div
          style="
            margin-top:7px;
            font-size:13px;
            color:#cbd5e1;
          "
        >
          Loan Application Management
        </div>

      </div>


      <!-- ================================================= -->
      <!-- MAIN -->
      <!-- ================================================= -->

      <div
        style="
          background:#ffffff;
          padding:30px;
        "
      >

        <!-- Application received -->

        <div
          style="
            border:1px solid #bbf7d0;
            background:#f0fdf4;
            border-radius:12px;
            padding:20px;
            margin-bottom:28px;
          "
        >

          <div
            style="
              font-size:11px;
              font-weight:700;
              letter-spacing:.7px;
              text-transform:uppercase;
              color:#15803d;
            "
          >
            New Application Received
          </div>

          <div
            style="
              margin-top:7px;
              font-size:24px;
              font-weight:700;
              color:#0f172a;
            "
          >
            ${safeFullName}
          </div>

          <div
            style="
              margin-top:7px;
              font-size:13px;
              color:#64748b;
            "
          >
            Application Reference:
            <strong
              style="color:#012a4a;"
            >
              ${escapeHtml(
                suppliedApplicationId
              )}
            </strong>
          </div>

        </div>


        <!-- ================================================= -->
        <!-- APPLICANT -->
        <!-- ================================================= -->

        <div
          style="
            margin-bottom:30px;
          "
        >

          <h2
            style="
              margin:0 0 14px;
              font-size:17px;
              color:#012a4a;
            "
          >
            Applicant Information
          </h2>

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              border-collapse:collapse;
              font-size:14px;
            "
          >

            <tr>

              <td
                style="
                  padding:11px 0;
                  border-bottom:1px solid #e2e8f0;
                  color:#64748b;
                  width:40%;
                "
              >
                Full Name
              </td>

              <td
                style="
                  padding:11px 0;
                  border-bottom:1px solid #e2e8f0;
                  font-weight:600;
                  color:#0f172a;
                "
              >
                ${safeFullName}
              </td>

            </tr>

            <tr>

              <td
                style="
                  padding:11px 0;
                  border-bottom:1px solid #e2e8f0;
                  color:#64748b;
                "
              >
                ID Number
              </td>

              <td
                style="
                  padding:11px 0;
                  border-bottom:1px solid #e2e8f0;
                  font-weight:600;
                  color:#0f172a;
                "
              >
                ${escapeHtml(
                  cleanIdNumber
                )}
              </td>

            </tr>

            <tr>

              <td
                style="
                  padding:11px 0;
                  border-bottom:1px solid #e2e8f0;
                  color:#64748b;
                "
              >
                Phone
              </td>

              <td
                style="
                  padding:11px 0;
                  border-bottom:1px solid #e2e8f0;
                  font-weight:600;
                  color:#0f172a;
                "
              >
                ${safePhone}
              </td>

            </tr>

            <tr>

              <td
                style="
                  padding:11px 0;
                  color:#64748b;
                "
              >
                Email
              </td>

              <td
                style="
                  padding:11px 0;
                "
              >

                <a
                  href="mailto:${safeEmail}"
                  style="
                    color:#014f86;
                    text-decoration:none;
                  "
                >
                  ${safeEmail}
                </a>

              </td>

            </tr>

          </table>

        </div>


        <!-- ================================================= -->
        <!-- LOAN -->
        <!-- ================================================= -->

        <div
          style="
            margin-bottom:30px;
          "
        >

          <h2
            style="
              margin:0 0 14px;
              font-size:17px;
              color:#012a4a;
            "
          >
            Loan Details
          </h2>

          <div
            style="
              background:#f8fafc;
              border:1px solid #e2e8f0;
              border-radius:12px;
              padding:20px;
            "
          >

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
            >

              <tr>

                <td
                  style="
                    color:#64748b;
                    font-size:13px;
                    padding-bottom:12px;
                  "
                >
                  Requested Amount
                </td>

                <td
                  style="
                    text-align:right;
                    color:#012a4a;
                    font-size:23px;
                    font-weight:700;
                    padding-bottom:12px;
                  "
                >
                  R${numericLoanAmount.toLocaleString(
                    "en-ZA"
                  )}
                </td>

              </tr>

              <tr>

                <td
                  style="
                    color:#64748b;
                    font-size:13px;
                    padding-top:10px;
                  "
                >
                  Employment Status
                </td>

                <td
                  style="
                    text-align:right;
                    font-size:14px;
                    font-weight:600;
                    padding-top:10px;
                  "
                >
                  ${safeEmployment}
                </td>

              </tr>

              <tr>

                <td
                  style="
                    color:#64748b;
                    font-size:13px;
                    padding-top:10px;
                  "
                >
                  Monthly Income
                </td>

                <td
                  style="
                    text-align:right;
                    font-size:14px;
                    font-weight:600;
                    padding-top:10px;
                  "
                >
                  R${numericMonthlyIncome.toLocaleString(
                    "en-ZA"
                  )}
                </td>

              </tr>

            </table>

          </div>

        </div>


        <!-- ================================================= -->
        <!-- DOCUMENTS -->
        <!-- ================================================= -->

        <div
          style="
            margin-bottom:30px;
          "
        >

          <h2
            style="
              margin:0 0 7px;
              font-size:17px;
              color:#012a4a;
            "
          >
            Submitted Documents
          </h2>

          <p
            style="
              margin:0 0 18px;
              font-size:13px;
              line-height:1.5;
              color:#64748b;
            "
          >
            The documents submitted with this
            application are shown below.
            Click a document preview to open
            the original file.
          </p>

          ${documentPreviews}

        </div>


        <!-- ================================================= -->
        <!-- NOTES -->
        <!-- ================================================= -->

        <div
          style="
            margin-bottom:30px;
          "
        >

          <h2
            style="
              margin:0 0 13px;
              font-size:17px;
              color:#012a4a;
            "
          >
            Applicant Notes
          </h2>

          <div
            style="
              padding:17px;
              background:#f8fafc;
              border-left:4px solid #014f86;
              border-radius:7px;
              font-size:14px;
              line-height:1.6;
              color:#475569;
            "
          >
            ${safeNotes}
          </div>

        </div>


        <!-- ================================================= -->
        <!-- CONSENT -->
        <!-- ================================================= -->

        <div
          style="
            padding:18px;
            background:#fffbeb;
            border:1px solid #fde68a;
            border-radius:10px;
            margin-bottom:28px;
          "
        >

          <div
            style="
              font-size:13px;
              font-weight:700;
              color:#92400e;
              margin-bottom:9px;
            "
          >
            Applicant Confirmations
          </div>

          <div
            style="
              font-size:13px;
              line-height:1.7;
              color:#78350f;
            "
          >

            ✓ Information provided confirmed
            as accurate and complete.

            <br />

            ✓ Applicant consented to the
            processing of their information
            for application assessment,
            verification and related
            administration.

          </div>

        </div>


        <!-- ================================================= -->
        <!-- SUBMISSION -->
        <!-- ================================================= -->

        <div
          style="
            border-top:1px solid #e2e8f0;
            padding-top:20px;
          "
        >

          <div
            style="
              font-size:12px;
              color:#94a3b8;
            "
          >
            Application submitted
          </div>

          <div
            style="
              margin-top:4px;
              font-size:13px;
              color:#475569;
              font-weight:600;
            "
          >
            ${escapeHtml(
              submissionTimestamp
            )}
          </div>

        </div>

      </div>


      <!-- ================================================= -->
      <!-- FOOTER -->
      <!-- ================================================= -->

      <div
        style="
          background:#f8fafc;
          border-radius:0 0 16px 16px;
          padding:24px 30px;
          text-align:center;
          border-top:1px solid #e2e8f0;
        "
      >

        <div
          style="
            font-size:15px;
            font-weight:700;
            color:#012a4a;
          "
        >
          Optimus Solutions
        </div>

        <div
          style="
            margin-top:7px;
            font-size:12px;
            line-height:1.7;
            color:#64748b;
          "
        >
          +27 (76) 851-3565
          <br />
          optimusolutions2@gmail.com
          <br />
          Trade Number: 2025/17469107
        </div>

        <div
          style="
            margin-top:15px;
            font-size:10px;
            line-height:1.5;
            color:#94a3b8;
          "
        >
          Confidential application information.
          <br />
          Please handle all applicant documents
          securely.
        </div>

      </div>

    </div>

  </div>

</body>

</html>
`

    // ---------------------------------------------------------
    // 18. Plain text fallback
    // ---------------------------------------------------------

    const emailText = `
NEW LOAN APPLICATION
====================

Application Reference:
${suppliedApplicationId}

Submission Date:
${submissionTimestamp}


APPLICANT INFORMATION
---------------------

Full Name:
${fullName}

ID Number:
${cleanIdNumber}

Phone:
${phoneNumber}

Email:
${email}


LOAN DETAILS
------------

Requested Amount:
R${numericLoanAmount.toLocaleString(
      "en-ZA"
    )}

Employment Status:
${employmentStatus}

Monthly Income:
R${numericMonthlyIncome.toLocaleString(
      "en-ZA"
    )}


APPLICANT NOTES
---------------

${notes || "No additional notes were provided."}


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


CONFIRMATIONS
-------------

Information Accuracy:
YES

Data Processing Consent:
YES


Optimus Solutions
Phone: +27 (76) 851-3565
Email: optimusolutions2@gmail.com
Trade Number: 2025/17469107
`.trim()

    // ---------------------------------------------------------
    // 19. Resend configuration
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
    // 20. Send email
    // ---------------------------------------------------------

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${resendApiKey}`,
        },

        body: JSON.stringify({
          from:
            "Optimus Solutions <onboarding@resend.dev>",

          to: receivingEmail,

          subject: emailSubject,

          html: emailHtml,

          text: emailText,

          reply_to: email,
        }),
      }
    )

    // ---------------------------------------------------------
    // 21. Handle Resend failure
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

    // ---------------------------------------------------------
    // 22. Log success
    // ---------------------------------------------------------

    let resendResult: {
      id?: string
    } | null = null

    try {
      resendResult =
        await response.json()
    } catch {
      resendResult = null
    }

    console.log(
      "Application submitted successfully:",
      {
        applicationId:
          suppliedApplicationId,

        resendId:
          resendResult?.id,
      }
    )

    // ---------------------------------------------------------
    // 23. Return success
    // ---------------------------------------------------------

    return {
      success: true,

      message:
        "Your application has been submitted successfully.",

      applicationId:
        suppliedApplicationId,
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
