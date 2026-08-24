"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { upload } from "@vercel/blob/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Upload,
  FileText,
} from "lucide-react"

import { submitApplication } from "@/app/actions/submit-application"

// ---------------------------------------------------------
// Constants
// ---------------------------------------------------------

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB per file
const MAX_TOTAL_SIZE = 28 * 1024 * 1024 // 28MB total

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
]

// ---------------------------------------------------------
// Document types
// ---------------------------------------------------------

interface DocumentFiles {
  idFront: File | null
  idBack: File | null
  bankStatement: File | null
  proofOfAddress: File | null
  payslips: File | null
}

const initialDocuments: DocumentFiles = {
  idFront: null,
  idBack: null,
  bankStatement: null,
  proofOfAddress: null,
  payslips: null,
}

// ---------------------------------------------------------
// Form data
// ---------------------------------------------------------

export interface LoanApplicationData {
  fullName: string
  idNumber: string
  phoneNumber: string
  email: string
  loanAmount: string
  employmentStatus: string
  monthlyIncome: string
  notes: string
  confirmAccurate: boolean
  consentToProcess: boolean
}

const initialFormData: LoanApplicationData = {
  fullName: "",
  idNumber: "",
  phoneNumber: "",
  email: "",
  loanAmount: "",
  employmentStatus: "",
  monthlyIncome: "",
  notes: "",
  confirmAccurate: false,
  consentToProcess: false,
}

// ---------------------------------------------------------
// Error types
// ---------------------------------------------------------

type FormErrorKey =
  | keyof LoanApplicationData
  | keyof DocumentFiles

// ---------------------------------------------------------
// Component
// ---------------------------------------------------------

export function ApplicationForm() {
  const [formData, setFormData] =
    useState<LoanApplicationData>(initialFormData)

  const [documents, setDocuments] =
    useState<DocumentFiles>(initialDocuments)

  const [errors, setErrors] = useState<
    Partial<Record<FormErrorKey, string>>
  >({})

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [uploadingDocument, setUploadingDocument] =
    useState<string | null>(null)

  const [uploadProgress, setUploadProgress] =
    useState(0)

  const [isSubmitted, setIsSubmitted] =
    useState(false)

  const [submitError, setSubmitError] =
    useState<string | null>(null)

  const [applicationId, setApplicationId] =
    useState<string | null>(null)

  // ---------------------------------------------------------
  // Format file size
  // ---------------------------------------------------------

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`
  }

  // ---------------------------------------------------------
  // File upload validation
  // ---------------------------------------------------------

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DocumentFiles
  ) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    // Validate type

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]:
          "Please upload a PDF, JPG, JPEG or PNG file.",
      }))

      e.target.value = ""
      return
    }

    // Validate individual file size

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [field]:
          "This file is too large. Maximum size is 10MB.",
      }))

      e.target.value = ""
      return
    }

    // Calculate total size with new file

    const totalSize = Object.entries(
      documents
    ).reduce((total, [key, existingFile]) => {
      if (key === field) {
        return total + file.size
      }

      return total + (existingFile?.size || 0)
    }, 0)

    if (totalSize > MAX_TOTAL_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [field]:
          "The combined size of your documents cannot exceed 28MB.",
      }))

      e.target.value = ""
      return
    }

    // Store file

    setDocuments((prev) => ({
      ...prev,
      [field]: file,
    }))

    // Clear error

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))

    setSubmitError(null)

    e.target.value = ""
  }

  // ---------------------------------------------------------
  // Remove file
  // ---------------------------------------------------------

  const removeFile = (
    field: keyof DocumentFiles
  ) => {
    setDocuments((prev) => ({
      ...prev,
      [field]: null,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))

    setSubmitError(null)
  }

  // ---------------------------------------------------------
  // Check whether form is complete
  // ---------------------------------------------------------

  const cleanIdNumber =
    formData.idNumber.replace(/\s/g, "")

  const cleanPhoneNumber =
    formData.phoneNumber.replace(/\s/g, "")

  const isFormComplete =
    formData.fullName.trim() !== "" &&
    /^\d{13}$/.test(cleanIdNumber) &&
    /^(\+27|0)[0-9]{9}$/.test(
      cleanPhoneNumber
    ) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    ) &&
    formData.loanAmount.trim() !== "" &&
    Number(formData.loanAmount) > 0 &&
    formData.employmentStatus.trim() !== "" &&
    formData.monthlyIncome.trim() !== "" &&
    Number(formData.monthlyIncome) > 0 &&
    documents.idFront !== null &&
    documents.idBack !== null &&
    documents.bankStatement !== null &&
    documents.proofOfAddress !== null &&
    documents.payslips !== null &&
    formData.confirmAccurate &&
    formData.consentToProcess

  // ---------------------------------------------------------
  // Validate entire form
  // ---------------------------------------------------------

  const validateForm = (): boolean => {
    const newErrors: Partial<
      Record<FormErrorKey, string>
    > = {}

    // Full name

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name is required."
    }

    // ID number

    const cleanId =
      formData.idNumber.replace(/\s/g, "")

    if (!cleanId) {
      newErrors.idNumber =
        "ID number is required."
    } else if (!/^\d{13}$/.test(cleanId)) {
      newErrors.idNumber =
        "Your South African ID number must contain exactly 13 digits."
    }

    // Phone

    const cleanPhone =
      formData.phoneNumber.replace(/\s/g, "")

    if (!cleanPhone) {
      newErrors.phoneNumber =
        "Phone number is required."
    } else if (
      !/^(\+27|0)[0-9]{9}$/.test(
        cleanPhone
      )
    ) {
      newErrors.phoneNumber =
        "Please enter a valid South African phone number."
    }

    // Email

    if (!formData.email.trim()) {
      newErrors.email =
        "Email address is required."
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address."
    }

    // Loan amount

    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount =
        "Loan amount is required."
    } else if (
      Number(formData.loanAmount) <= 0
    ) {
      newErrors.loanAmount =
        "Please enter a valid loan amount."
    }

    // Employment

    if (!formData.employmentStatus.trim()) {
      newErrors.employmentStatus =
        "Employment status is required."
    }

    // Income

    if (!formData.monthlyIncome.trim()) {
      newErrors.monthlyIncome =
        "Monthly income is required."
    } else if (
      Number(formData.monthlyIncome) <= 0
    ) {
      newErrors.monthlyIncome =
        "Please enter a valid monthly income."
    }

    // Documents

    if (!documents.idFront) {
      newErrors.idFront =
        "ID front is required."
    }

    if (!documents.idBack) {
      newErrors.idBack =
        "ID back is required."
    }

    if (!documents.bankStatement) {
      newErrors.bankStatement =
        "3 months bank statement is required."
    }

    if (!documents.proofOfAddress) {
      newErrors.proofOfAddress =
        "Proof of address is required."
    }

    if (!documents.payslips) {
      newErrors.payslips =
        "3 months payslips are required."
    }

    // Total document size

    const totalSize =
      Object.values(documents).reduce(
        (total, file) =>
          total + (file?.size || 0),
        0
      )

    if (totalSize > MAX_TOTAL_SIZE) {
      newErrors.bankStatement =
        "The combined size of your documents cannot exceed 28MB."
    }

    // Confirmation

    if (!formData.confirmAccurate) {
      newErrors.confirmAccurate =
        "You must confirm that the information is accurate."
    }

    // Consent

    if (!formData.consentToProcess) {
      newErrors.consentToProcess =
        "You must agree to the data processing terms."
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors).length === 0
    )
  }

  // ---------------------------------------------------------
  // Submit application
  // ---------------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setSubmitError(null)

    // Always validate again before submission

    if (!validateForm()) {
      return
    }

    if (!isFormComplete) {
      setSubmitError(
        "Please complete all required fields, upload all required documents, and accept both confirmations."
      )

      return
    }

    setIsSubmitting(true)

    try {
      // -----------------------------------------------------
      // Generate application ID
      // -----------------------------------------------------

      const newApplicationId =
        `OPT-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 7)
          .toUpperCase()}`

      // -----------------------------------------------------
      // Documents to upload
      // -----------------------------------------------------

      const documentFields: (
        keyof DocumentFiles
      )[] = [
        "idFront",
        "idBack",
        "bankStatement",
        "proofOfAddress",
        "payslips",
      ]

      const documentUrls: Partial<
        Record<
          keyof DocumentFiles,
          string
        >
      > = {}

      // -----------------------------------------------------
      // Upload documents directly to Vercel Blob
      // -----------------------------------------------------

      for (
        const field of documentFields
      ) {
        const file = documents[field]

        if (!file) {
          throw new Error(
            `Please upload the required document: ${field}.`
          )
        }

        setUploadingDocument(field)
        setUploadProgress(0)

        const extension =
          file.name
            .split(".")
            .pop()
            ?.toLowerCase() || "file"

        const pathname =
          `applications/${newApplicationId}/${field}-${Date.now()}.${extension}`

        const blob = await upload(
          pathname,
          file,
          {
            access: "public",

            handleUploadUrl:
              "/api/upload",

            multipart: true,

            clientPayload:
              JSON.stringify({
                applicationId:
                  newApplicationId,
                documentType: field,
              }),

            onUploadProgress: ({
              percentage,
            }) => {
              setUploadProgress(
                Math.round(percentage)
              )
            },
          }
        )

        documentUrls[field] =
          blob.url
      }

      // Upload complete

      setUploadingDocument(null)
      setUploadProgress(100)

      // -----------------------------------------------------
      // Prepare lightweight server submission
      // -----------------------------------------------------

      const submission =
        new FormData()

      submission.append(
        "applicationId",
        newApplicationId
      )

      submission.append(
        "fullName",
        formData.fullName.trim()
      )

      submission.append(
        "idNumber",
        formData.idNumber.trim()
      )

      submission.append(
        "phoneNumber",
        formData.phoneNumber.trim()
      )

      submission.append(
        "email",
        formData.email.trim()
      )

      submission.append(
        "loanAmount",
        formData.loanAmount.trim()
      )

      submission.append(
        "employmentStatus",
        formData.employmentStatus.trim()
      )

      submission.append(
        "monthlyIncome",
        formData.monthlyIncome.trim()
      )

      submission.append(
        "notes",
        formData.notes.trim()
      )

      submission.append(
        "confirmAccurate",
        String(
          formData.confirmAccurate
        )
      )

      submission.append(
        "consentToProcess",
        String(
          formData.consentToProcess
        )
      )

      // -----------------------------------------------------
      // Add document URLs
      // -----------------------------------------------------

      submission.append(
        "idFront",
        documentUrls.idFront || ""
      )

      submission.append(
        "idBack",
        documentUrls.idBack || ""
      )

      submission.append(
        "bankStatement",
        documentUrls.bankStatement ||
          ""
      )

      submission.append(
        "proofOfAddress",
        documentUrls.proofOfAddress ||
          ""
      )

      submission.append(
        "payslips",
        documentUrls.payslips || ""
      )

      // -----------------------------------------------------
      // Call server action
      // -----------------------------------------------------

      const result =
        await submitApplication(
          submission
        )

      if (result.success) {
        setApplicationId(
          result.applicationId ||
            newApplicationId
        )

        setIsSubmitted(true)
      } else {
        setSubmitError(
          result.message
        )
      }
    } catch (error) {
      console.error(
        "Form submission error:",
        error
      )

      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      )
    } finally {
      setIsSubmitting(false)
      setUploadingDocument(null)
    }
  }

  // ---------------------------------------------------------
  // Input changes
  // ---------------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = e.target

    const checked =
      (e.target as HTMLInputElement)
        .checked

    // -------------------------------------------------------
    // ID number
    // Digits only
    // Maximum 13 digits
    // -------------------------------------------------------

    if (name === "idNumber") {
      const digitsOnly =
        value
          .replace(/\D/g, "")
          .slice(0, 13)

      setFormData((prev) => ({
        ...prev,
        idNumber: digitsOnly,
      }))

      if (errors.idNumber) {
        setErrors((prev) => ({
          ...prev,
          idNumber: undefined,
        }))
      }

      return
    }

    // -------------------------------------------------------
    // Normal inputs
    // -------------------------------------------------------

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }))

    if (
      errors[name as FormErrorKey]
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    setSubmitError(null)
  }

  // ---------------------------------------------------------
  // Document upload component
  // ---------------------------------------------------------

  const DocumentUpload = ({
    field,
    label,
    description,
  }: {
    field: keyof DocumentFiles
    label: string
    description: string
  }) => {
    const file = documents[field]
    const error = errors[field]

    const isUploading =
      uploadingDocument === field

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {label}

          <span className="ml-1 text-destructive">
            *
          </span>
        </label>

        <p className="text-xs text-muted-foreground">
          {description}
        </p>

        {file ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                <FileText className="h-5 w-5 text-[#012a4a]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatFileSize(
                    file.size
                  )}
                </p>
              </div>

              {!isSubmitting && (
                <button
                  type="button"
                  onClick={() =>
                    removeFile(field)
                  }
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white hover:text-destructive"
                  aria-label={`Remove ${label}`}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {isUploading && (
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Uploading...
                  </span>

                  <span>
                    {uploadProgress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-[#012a4a] transition-all duration-200"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:border-[#014f86] hover:bg-muted/30 ${
              error
                ? "border-destructive bg-destructive/5"
                : "border-border"
            } ${
              isSubmitting
                ? "pointer-events-none opacity-60"
                : ""
            }`}
          >
            <Upload className="mb-2 h-6 w-6 text-muted-foreground" />

            <span className="text-sm font-medium text-foreground">
              Click to upload
            </span>

            <span className="mt-1 text-xs text-muted-foreground">
              PDF, JPG, JPEG or PNG • Max 10MB
            </span>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              className="hidden"
              disabled={isSubmitting}
              onChange={(e) =>
                handleFileChange(
                  e,
                  field
                )
              }
            />
          </label>
        )}

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }

  // ---------------------------------------------------------
  // Success modal
  // ---------------------------------------------------------

  const SuccessModal = () => {
    const [isVisible, setIsVisible] =
      useState(false)

    useEffect(() => {
      const timer = setTimeout(
        () => setIsVisible(true),
        10
      )

      return () =>
        clearTimeout(timer)
    }, [])

    const handleClose = () => {
      setIsVisible(false)

      setTimeout(
        () => setIsSubmitted(false),
        300
      )
    }

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isVisible
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        <div
          className={`relative w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 ${
            isVisible
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <div className="text-center">
            <h3 className="mb-3 text-2xl font-semibold text-foreground">
              Application Received
            </h3>

            {applicationId && (
              <p className="mb-4 text-sm text-muted-foreground">
                Reference:{" "}
                <span className="font-mono font-medium text-foreground">
                  {applicationId}
                </span>
              </p>
            )}

            <p className="mb-3 leading-relaxed text-muted-foreground">
              Thank you. Your application
              has been received and is
              currently under review. You
              can expect a response within
              24–48 hours.
            </p>

            <p className="mb-8 text-sm text-muted-foreground/80">
              A consultant may contact you
              to complete the next steps.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="order-2 sm:order-1"
              >
                Close
              </Button>

              <Button
                asChild
                className="order-1 bg-[#012a4a] text-white hover:bg-[#013a63] sm:order-2"
              >
                <Link href="/">
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------
  // Submitted state
  // ---------------------------------------------------------

  if (isSubmitted) {
    return (
      <>
        <Card className="border-0 bg-card shadow-lg opacity-50">
          <CardHeader className="border-b bg-muted/30 px-6 py-4">
            <CardTitle className="text-lg font-semibold">
              Application Details
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">
                Application submitted
              </p>
            </div>
          </CardContent>
        </Card>

        <SuccessModal />
      </>
    )
  }

  // ---------------------------------------------------------
  // Main form
  // ---------------------------------------------------------

  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="border-b bg-muted/30 px-6 py-4">
        <CardTitle className="text-lg font-semibold">
          Application Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* ------------------------------------------------ */}
          {/* Submission error */}
          {/* ------------------------------------------------ */}

          {submitError && (
            <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

              <div>
                <p className="font-medium text-destructive">
                  Submission Failed
                </p>

                <p className="text-sm text-destructive/80">
                  {submitError}
                </p>
              </div>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* Personal Information */}
          {/* ------------------------------------------------ */}

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Personal Information
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Full name */}

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Full Name
                </label>

                <Input
                  id="fullName"
                  name="fullName"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your full name"
                  className={
                    errors.fullName
                      ? "border-destructive"
                      : ""
                  }
                />

                {errors.fullName && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* ID number */}

              <div>
                <label
                  htmlFor="idNumber"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  South African ID Number
                </label>

                <Input
                  id="idNumber"
                  name="idNumber"
                  inputMode="numeric"
                  maxLength={13}
                  value={
                    formData.idNumber
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="13-digit SA ID number"
                  className={
                    errors.idNumber
                      ? "border-destructive"
                      : ""
                  }
                />

                <p className="mt-1 text-xs text-muted-foreground">
                  Enter exactly 13 digits.
                </p>

                {errors.idNumber && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.idNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Contact Information */}
          {/* ------------------------------------------------ */}

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Contact Information
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Phone */}

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>

                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  inputMode="tel"
                  value={
                    formData.phoneNumber
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g., 0821234567"
                  className={
                    errors.phoneNumber
                      ? "border-destructive"
                      : ""
                  }
                />

                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-destructive">
                    {
                      errors.phoneNumber
                    }
                  </p>
                )}
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email Address
                </label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="your@email.com"
                  className={
                    errors.email
                      ? "border-destructive"
                      : ""
                  }
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Loan Details */}
          {/* ------------------------------------------------ */}

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Loan Details
            </h4>

            <div>
              <label
                htmlFor="loanAmount"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Loan Amount (ZAR)
              </label>

              <Input
                id="loanAmount"
                name="loanAmount"
                type="number"
                min="1"
                value={
                  formData.loanAmount
                }
                onChange={
                  handleChange
                }
                placeholder="e.g., 10000"
                className={
                  errors.loanAmount
                    ? "border-destructive"
                    : ""
                }
              />

              {errors.loanAmount && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.loanAmount}
                </p>
              )}
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Employment Information */}
          {/* ------------------------------------------------ */}

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Employment Information
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Employment */}

              <div>
                <label
                  htmlFor="employmentStatus"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Employment Status
                </label>

                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={
                    formData.employmentStatus
                  }
                  onChange={
                    handleChange
                  }
                  className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                    errors.employmentStatus
                      ? "border-destructive"
                      : "border-input"
                  }`}
                >
                  <option value="">
                    Select status
                  </option>

                  <option value="employed">
                    Employed
                  </option>

                  <option value="self-employed">
                    Self-Employed
                  </option>

                  <option value="unemployed">
                    Unemployed
                  </option>

                  <option value="retired">
                    Retired
                  </option>
                </select>

                {errors.employmentStatus && (
                  <p className="mt-1 text-sm text-destructive">
                    {
                      errors.employmentStatus
                    }
                  </p>
                )}
              </div>

              {/* Monthly income */}

              <div>
                <label
                  htmlFor="monthlyIncome"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Monthly Income (ZAR)
                </label>

                <Input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="number"
                  min="1"
                  value={
                    formData.monthlyIncome
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g., 15000"
                  className={
                    errors.monthlyIncome
                      ? "border-destructive"
                      : ""
                  }
                />

                {errors.monthlyIncome && (
                  <p className="mt-1 text-sm text-destructive">
                    {
                      errors.monthlyIncome
                    }
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Required Documents */}
          {/* ------------------------------------------------ */}

          <div className="space-y-5 rounded-xl border border-border bg-muted/20 p-5">
            <div>
              <h4 className="text-base font-semibold text-foreground">
                Required Documents
              </h4>

              <p className="mt-1 text-sm text-muted-foreground">
                Please provide all documents
                below. Each file must be no
                larger than 10MB. Combined
                documents cannot exceed 28MB.
              </p>
            </div>

            <div className="space-y-5">
              <DocumentUpload
                field="idFront"
                label="ID Front"
                description="Upload the front of your South African ID."
              />

              <DocumentUpload
                field="idBack"
                label="ID Back"
                description="Upload the back of your South African ID."
              />

              <DocumentUpload
                field="bankStatement"
                label="3 Months Bank Statement"
                description="Upload your latest 3 months bank statement as one file."
              />

              <DocumentUpload
                field="proofOfAddress"
                label="Proof of Address"
                description="Upload a recent proof of address."
              />

              <DocumentUpload
                field="payslips"
                label="3 Months Payslips"
                description="Upload your latest 3 months payslips as one PDF or image file."
              />
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Additional Notes */}
          {/* ------------------------------------------------ */}

          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Message or Notes (Optional)
            </label>

            <textarea
              id="notes"
              name="notes"
              value={
                formData.notes
              }
              onChange={
                handleChange
              }
              rows={3}
              placeholder="Any additional information you'd like to share..."
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* ------------------------------------------------ */}
          {/* Accuracy confirmation */}
          {/* ------------------------------------------------ */}

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="confirmAccurate"
              name="confirmAccurate"
              checked={
                formData.confirmAccurate
              }
              onChange={
                handleChange
              }
              className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />

            <label
              htmlFor="confirmAccurate"
              className="text-sm text-muted-foreground"
            >
              I confirm that the information
              provided is accurate and
              complete. I understand that
              providing false information may
              result in my application being
              rejected.
            </label>
          </div>

          {errors.confirmAccurate && (
            <p className="-mt-4 text-sm text-destructive">
              {
                errors.confirmAccurate
              }
            </p>
          )}

          {/* ------------------------------------------------ */}
          {/* Data processing consent */}
          {/* ------------------------------------------------ */}

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consentToProcess"
                name="consentToProcess"
                checked={
                  formData.consentToProcess
                }
                onChange={
                  handleChange
                }
                className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
              />

              <div>
                <label
                  htmlFor="consentToProcess"
                  className="text-sm leading-relaxed text-foreground"
                >
                  I understand and agree that
                  the information I provide may
                  be used for application
                  assessment, verification, and,
                  if approved, for debit order
                  processing and related payment
                  administration.
                </label>

                <p className="mt-2 text-xs text-muted-foreground">
                  This acknowledgement does
                  not replace any formal debit
                  order or bank mandate that may
                  be required after approval.
                </p>
              </div>
            </div>

            {errors.consentToProcess && (
              <p className="mt-2 text-sm text-destructive">
                {
                  errors.consentToProcess
                }
              </p>
            )}
          </div>

          {/* ------------------------------------------------ */}
          {/* Upload status */}
          {/* ------------------------------------------------ */}

          {isSubmitting &&
            uploadingDocument && (
              <div className="rounded-lg border border-[#012a4a]/20 bg-[#012a4a]/5 p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-[#012a4a]" />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Uploading your documents...
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Please don't close this
                      page.
                    </p>
                  </div>

                  <span className="text-sm font-medium text-[#012a4a]">
                    {uploadProgress}%
                  </span>
                </div>
              </div>
            )}

          {/* ------------------------------------------------ */}
          {/* Submit button */}
          {/* ------------------------------------------------ */}

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !isFormComplete
            }
            className={`w-full text-white ${
              isFormComplete &&
              !isSubmitting
                ? "bg-[#012a4a] hover:bg-[#013a63]"
                : "cursor-not-allowed bg-gray-400"
            }`}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                {uploadingDocument
                  ? "Uploading Documents..."
                  : "Submitting Application..."}
              </>
            ) : (
              "Apply Now"
            )}
          </Button>

          {/* ------------------------------------------------ */}
          {/* Incomplete message */}
          {/* ------------------------------------------------ */}

          {!isFormComplete &&
            !isSubmitting && (
              <p className="text-center text-xs text-muted-foreground">
                Please complete all required
                fields, upload all required
                documents, and accept both
                confirmations before
                submitting.
              </p>
            )}
        </form>
      </CardContent>
    </Card>
  )
}
