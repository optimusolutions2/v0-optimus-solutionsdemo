import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
]

const ALLOWED_DOCUMENT_TYPES = [
  "idFront",
  "idBack",
  "bankStatement",
  "proofOfAddress",
  "payslips",
]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const file = formData.get("file")
    const applicationId = formData.get("applicationId")
    const documentType = formData.get("documentType")

    // ---------------------------------------------------------
    // 1. Validate file
    // ---------------------------------------------------------

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No file was provided.",
        },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------
    // 2. Validate application ID
    // ---------------------------------------------------------

    if (
      !applicationId ||
      typeof applicationId !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID is required.",
        },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------
    // 3. Validate document type
    // ---------------------------------------------------------

    if (
      !documentType ||
      typeof documentType !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Document type is required.",
        },
        { status: 400 }
      )
    }

    if (!ALLOWED_DOCUMENT_TYPES.includes(documentType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid document type.",
        },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------
    // 4. Validate file type
    // ---------------------------------------------------------

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only PDF, JPG, JPEG and PNG files are allowed.",
        },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------
    // 5. Validate file size
    // ---------------------------------------------------------

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "File is too large. Maximum size is 10MB.",
        },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------
    // 6. Create safe filename
    // ---------------------------------------------------------

    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "file"

    const safeApplicationId =
      applicationId.replace(
        /[^a-zA-Z0-9-_]/g,
        ""
      )

    const safeDocumentType =
      documentType.replace(
        /[^a-zA-Z0-9-_]/g,
        ""
      )

    const filename =
      `applications/${safeApplicationId}/${safeDocumentType}-${Date.now()}.${extension}`

    // ---------------------------------------------------------
    // 7. Upload directly to Vercel Blob
    // ---------------------------------------------------------

    const blob = await put(
      filename,
      file,
      {
        access: "public",
        addRandomSuffix: false,
      }
    )

    // ---------------------------------------------------------
    // 8. Return URL to browser
    // ---------------------------------------------------------

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
    })
  } catch (error) {
    console.error(
      "Document upload error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to upload document. Please try again.",
      },
      { status: 500 }
    )
  }
}
