import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const applicationId = formData.get("applicationId")
    const documentType = formData.get("documentType")

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No file was provided." },
        { status: 400 }
      )
    }

    if (!applicationId || typeof applicationId !== "string") {
      return NextResponse.json(
        { success: false, message: "Application ID is required." },
        { status: 400 }
      )
    }

    if (!documentType || typeof documentType !== "string") {
      return NextResponse.json(
        { success: false, message: "Document type is required." },
        { status: 400 }
      )
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF, JPG, JPEG and PNG files are allowed.",
        },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "File is too large. Maximum size is 10MB.",
        },
        { status: 400 }
      )
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "file"

    const safeApplicationId = applicationId.replace(/[^a-zA-Z0-9-_]/g, "")
    const safeDocumentType = documentType.replace(/[^a-zA-Z0-9-_]/g, "")

    const filename = `applications/${safeApplicationId}/${safeDocumentType}-${Date.now()}.${extension}`

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
    })
  } catch (error) {
    console.error("Document upload error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload document. Please try again.",
      },
      { status: 500 }
    )
  }
}
