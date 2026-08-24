"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
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

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB per file
const MAX_TOTAL_SIZE = 28 * 1024 * 1024 // 28MB total

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
]

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

type FormErrorKey =
  | keyof LoanApplicationData
  | keyof DocumentFiles

export function ApplicationForm() {
  const [formData, setFormData] =
    useState<LoanApplicationData>(initialFormData)

  const [documents, setDocuments] =
    useState<DocumentFiles>(initialDocuments)

  const [errors, setErrors] = useState<
    Partial<Record<FormErrorKey, string>>
  >({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [submitError, setSubmitError] =
    useState<string | null>(null)

  const [applicationId, setApplicationId] =
    useState<string | null>(null)

  // ---------------------------------------------------------
  // File size formatting
  // ---------------------------------------------------------

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // ---------------------------------------------------------
  // File upload handler
  // ---------------------------------------------------------

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DocumentFiles
  ) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]:
          "Please upload a PDF, JPG, JPEG or PNG file.",
      }))

      e.target.value = ""
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [field]:
          "This file is too large. Maximum size is 10MB.",
      }))

      e.target.value = ""
      return
    }

    setDocuments((prev) => ({
      ...prev,
      [field]: file,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))

    e.target.value = ""
  }

  // ---------------------------------------------------------
  // Remove uploaded file
  // ---------------------------------------------------------

  const removeFile = (field: keyof DocumentFiles) => {
    setDocuments((prev) => ({
      ...prev,
      [field]: null,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
  }

  // ---------------------------------------------------------
  // Validate everything before submitting
  // ---------------------------------------------------------

  const validateForm = (): boolean => {
    const newErrors: Partial<
      Record<FormErrorKey, string>
    > = {}

    // Full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required."
    }

    // ID number
    const cleanIdNumber = formData.idNumber
      .replace(/\D/g, "")

    if (!cleanIdNumber) {
      newErrors.idNumber = "ID number is required."
    } else if (cleanIdNumber.length !== 13) {
      newErrors.idNumber =
        "ID number must contain exactly 13 digits."
    }

    // Phone
    const cleanPhone = formData.phoneNumber
      .replace(/\s/g, "")

    if (!cleanPhone) {
      newErrors.phoneNumber =
        "Phone number is required."
    } else if (
      !/^(\+27|0)[0-9]{9}$/.test(cleanPhone)
    ) {
      newErrors.phoneNumber =
        "Please enter a valid SA phone number."
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required."
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

    // Monthly income
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
    const totalSize = Object.values(documents).reduce(
      (total, file) =>
        total + (file?.size || 0),
      0
    )

    if (totalSize > MAX_TOTAL_SIZE) {
      newErrors.payslips =
        "The combined size of your documents is too large. Maximum total size is 28MB."
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

    return Object.keys(newErrors).length === 0
  }

  // ---------------------------------------------------------
  // Upload one document
  // ---------------------------------------------------------

  const uploadDocument = async (
    file: File,
    applicationId: string,
    documentType: string
  ): Promise<string> => {
    const uploadData = new FormData()

    uploadData.append("file", file)
    uploadData.append(
      "applicationId",
      applicationId
    )
    uploadData.append(
      "documentType",
      documentType
    )

    const response = await fetch(
      "/api/upload",
      {
        method: "POST",
        body: uploadData,
      }
    )

    let result: {
      success?: boolean
      url?: string
      message?: string
    }

    try {
      result = await response.json()
    } catch {
      throw new Error(
        "The upload server returned an invalid response."
      )
    }

    if (!response.ok || !result.success || !result.url) {
      throw new Error(
        result.message ||
          `Failed to upload ${documentType}.`
      )
    }

    return result.url
  }

  // ---------------------------------------------------------
  // Submit application
  // ---------------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setSubmitError(null)

    // Always validate first
    const valid = validateForm()

    if (!valid) {
      return
    }

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setUploadProgress("Preparing your application...")

    try {
      // -----------------------------------------------------
      // Generate application ID BEFORE uploading documents
      // -----------------------------------------------------

      const newApplicationId =
        `OPT-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 7)
          .toUpperCase()}`

      setApplicationId(newApplicationId)

      // -----------------------------------------------------
      // Upload documents individually
      // -----------------------------------------------------

      setUploadProgress(
        "Uploading ID front..."
      )

      const idFrontUrl =
        await uploadDocument(
          documents.idFront!,
          newApplicationId,
          "id-front"
        )

      setUploadProgress(
        "Uploading ID back..."
      )

      const idBackUrl =
        await uploadDocument(
          documents.idBack!,
          newApplicationId,
          "id-back"
        )

      setUploadProgress(
        "Uploading 3 months bank statement..."
      )

      const bankStatementUrl =
        await uploadDocument(
          documents.bankStatement!,
          newApplicationId,
          "3-months-bank-statement"
        )

      setUploadProgress(
        "Uploading proof of address..."
      )

      const proofOfAddressUrl =
        await uploadDocument(
          documents.proofOfAddress!,
          newApplicationId,
          "proof-of-address"
        )

      setUploadProgress(
        "Uploading 3 months payslips..."
      )

      const payslipsUrl =
        await uploadDocument(
          documents.payslips!,
          newApplicationId,
          "3-months-payslips"
        )

      // -----------------------------------------------------
      // Create SMALL FormData
      // No actual files are sent here.
      // Only text + URLs.
      // -----------------------------------------------------

      setUploadProgress(
        "Submitting your application..."
      )

      const submission = new FormData()

      submission.append(
        "applicationId",
        newApplicationId
      )

      submission.append(
        "fullName",
        formData.fullName
      )

      submission.append(
        "idNumber",
        formData.idNumber
      )

      submission.append(
        "phoneNumber",
        formData.phoneNumber
      )

      submission.append(
        "email",
        formData.email
      )

      submission.append(
        "loanAmount",
        formData.loanAmount
      )

      submission.append(
        "employmentStatus",
        formData.employmentStatus
      )

      submission.append(
        "monthlyIncome",
        formData.monthlyIncome
      )

      submission.append(
        "notes",
        formData.notes
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

      // Document URLs
      submission.append(
        "idFrontUrl",
        idFrontUrl
      )

      submission.append(
        "idBackUrl",
        idBackUrl
      )

      submission.append(
        "bankStatementUrl",
        bankStatementUrl
      )

      submission.append(
        "proofOfAddressUrl",
        proofOfAddressUrl
      )

      submission.append(
        "payslipsUrl",
        payslipsUrl
      )

      // -----------------------------------------------------
      // Call Server Action
      // -----------------------------------------------------

      const result =
        await submitApplication(
          submission
        )

      if (!result.success) {
        setSubmitError(
          result.message ||
            "Unable to submit your application."
        )

        return
      }

      setApplicationId(
        result.applicationId ||
          newApplicationId
      )

      setUploadProgress("")
      setIsSubmitted(true)
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
      setUploadProgress("")
    }
  }

  // ---------------------------------------------------------
  // Handle normal form changes
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

    const checked = (
      e.target as HTMLInputElement
    ).checked

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }))

    if (
      errors[
        name as FormErrorKey
      ]
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // ---------------------------------------------------------
  // ID number change
  // ---------------------------------------------------------

  const handleIdNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 13)

    setFormData((prev) => ({
      ...prev,
      idNumber: value,
    }))

    if (errors.idNumber) {
      setErrors((prev) => ({
        ...prev,
        idNumber: undefined,
      }))
    }
  }

  // ---------------------------------------------------------
  // Document Upload component
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
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
              <FileText className="h-5 w-5 text-[#012a4a]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {file.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                removeFile(field)
              }
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white hover:text-destructive"
              aria-label={`Remove ${label}`}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
            </button>
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
              onChange={(e) =>
                handleFileChange(
                  e,
                  field
                )
              }
              disabled={isSubmitting}
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
              Thank you. Your application has been received and is currently under review. You can expect a response within 24–48 hours.
            </p>

            <p className="mb-8 text-sm text-muted-foreground/80">
              A consultant may contact you to complete the next steps.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
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

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Personal Information
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
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

              <div>
                <label
                  htmlFor="idNumber"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  ID Number
                </label>

                <Input
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={
                    handleIdNumberChange
                  }
                  placeholder="13-digit SA ID number"
                  inputMode="numeric"
                  maxLength={13}
                  disabled={isSubmitting}
                  className={
                    errors.idNumber
                      ? "border-destructive"
                      : ""
                  }
                />

                <p className="mt-1 text-xs text-muted-foreground">
                  {formData.idNumber.length}/13 digits
                </p>

                {errors.idNumber && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.idNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Contact Information
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g., 0821234567"
                  disabled={isSubmitting}
                  className={
                    errors.phoneNumber
                      ? "border-destructive"
                      : ""
                  }
                />

                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
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

          {/* Loan Details */}
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
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="e.g., 10000"
                disabled={isSubmitting}
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

          {/* Employment Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Employment Information
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  onChange={handleChange}
                  disabled={isSubmitting}
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
                    {errors.employmentStatus}
                  </p>
                )}
              </div>

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
                  onChange={handleChange}
                  placeholder="e.g., 15000"
                  disabled={isSubmitting}
                  className={
                    errors.monthlyIncome
                      ? "border-destructive"
                      : ""
                  }
                />

                {errors.monthlyIncome && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.monthlyIncome}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-5 rounded-xl border border-border bg-muted/20 p-5">
            <div>
              <h4 className="text-base font-semibold text-foreground">
                Required Documents
              </h4>

              <p className="mt-1 text-sm text-muted-foreground">
                Please provide all documents below. All documents are required to process your application.
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

          {/* Additional Notes */}
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
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              disabled={isSubmitting}
              placeholder="Any additional information you'd like to share..."
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Confirmation */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="confirmAccurate"
              name="confirmAccurate"
              checked={
                formData.confirmAccurate
              }
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />

            <label
              htmlFor="confirmAccurate"
              className="text-sm text-muted-foreground"
            >
              I confirm that the information provided is accurate and complete. I understand that providing false information may result in my application being rejected.
            </label>
          </div>

          {errors.confirmAccurate && (
            <p className="-mt-4 text-sm text-destructive">
              {errors.confirmAccurate}
            </p>
          )}

          {/* Data Processing Consent */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consentToProcess"
                name="consentToProcess"
                checked={
                  formData.consentToProcess
                }
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
              />

              <div>
                <label
                  htmlFor="consentToProcess"
                  className="text-sm leading-relaxed text-foreground"
                >
                  I understand and agree that the information I provide may be used for application assessment, verification, and, if approved, for debit order processing and related payment administration.
                </label>

                <p className="mt-2 text-xs text-muted-foreground">
                  This acknowledgement does not replace any formal debit order or bank mandate that may be required after approval.
                </p>
              </div>
            </div>

            {errors.consentToProcess && (
              <p className="mt-2 text-sm text-destructive">
                {errors.consentToProcess}
              </p>
            )}
          </div>

          {/* Upload / Submit Status */}
          {isSubmitting &&
            uploadProgress && (
              <div className="flex items-center gap-3 rounded-lg border border-[#012a4a]/20 bg-[#012a4a]/5 p-4">
                <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#012a4a]" />

                <div>
                  <p className="text-sm font-medium text-[#012a4a]">
                    {uploadProgress}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Please keep this page open until the submission is complete.
                  </p>
                </div>
              </div>
            )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#012a4a] text-white hover:bg-[#013a63]"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Apply Now"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            All required information, documents and consent must be provided before your application can be submitted.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
