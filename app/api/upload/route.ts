import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

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
    const body = (await request.json()) as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async (
        pathname,
        clientPayload
      ) => {
        let payload: {
          applicationId?: string
          documentType?: string
        } = {}

        try {
          if (clientPayload) {
            payload = JSON.parse(clientPayload)
          }
        } catch {
          throw new Error("Invalid upload information.")
        }

        const applicationId =
          payload.applicationId || ""

        const documentType =
          payload.documentType || ""

        if (!applicationId) {
          throw new Error(
            "Application ID is required."
          )
        }

        if (
          !ALLOWED_DOCUMENT_TYPES.includes(
            documentType
          )
        ) {
          throw new Error(
            "Invalid document type."
          )
        }

        return {
          allowedContentTypes:
            ALLOWED_FILE_TYPES,

          maximumSizeInBytes:
            10 * 1024 * 1024,

          addRandomSuffix: false,

          tokenPayload: JSON.stringify({
            applicationId,
            documentType,
          }),
        }
      },

      onUploadCompleted: async ({
        blob,
        tokenPayload,
      }) => {
        console.log(
          "Document uploaded successfully:",
          {
            url: blob.url,
            tokenPayload,
          }
        )
      },
    })

    return NextResponse.json(
      jsonResponse
    )
  } catch (error) {
    console.error(
      "Blob client upload error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Upload failed.",
      },
      {
        status: 400,
      }
    )
  }
}
