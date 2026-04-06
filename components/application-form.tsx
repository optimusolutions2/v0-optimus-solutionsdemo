"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2, AlertCircle, X } from "lucide-react"
import { submitApplication } from "@/app/actions/submit-application"

// Types for form data - structured for future integrations
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

export function ApplicationForm() {
  const [formData, setFormData] = useState<LoanApplicationData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof LoanApplicationData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoanApplicationData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID number is required"
    } else if (!/^\d{13}$/.test(formData.idNumber.replace(/\s/g, ""))) {
      newErrors.idNumber = "Please enter a valid 13-digit SA ID number"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^(\+27|0)[0-9]{9}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid SA phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = "Loan amount is required"
    }

    if (!formData.employmentStatus.trim()) {
      newErrors.employmentStatus = "Employment status is required"
    }

    if (!formData.monthlyIncome.trim()) {
      newErrors.monthlyIncome = "Monthly income is required"
    }

    if (!formData.confirmAccurate) {
      newErrors.confirmAccurate = "You must confirm the information is accurate"
    }

    if (!formData.consentToProcess) {
      newErrors.consentToProcess = "You must agree to the data processing terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitApplication(formData)

      if (result.success) {
        setApplicationId(result.applicationId || null)
        setIsSubmitted(true)
      } else {
        setSubmitError(result.message)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof LoanApplicationData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Success Modal Component
  const SuccessModal = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      // Trigger animation after mount
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => setIsSubmitted(false), 300)
    }

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal card */}
        <div
          className={`relative w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          {/* Content */}
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
              Thank you. Your application has been received and is currently
              under review. You can expect a response within 24–48 hours.
            </p>

            <p className="mb-8 text-sm text-muted-foreground/80">
              A consultant may contact you to complete the next steps.
            </p>

            {/* Buttons */}
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
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show modal when submitted
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
              <p className="text-muted-foreground">Application submitted</p>
            </div>
          </CardContent>
        </Card>
        <SuccessModal />
      </>
    )
  }

  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="border-b bg-muted/30 px-6 py-4">
        <CardTitle className="text-lg font-semibold">
          Application Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {submitError && (
            <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Submission Failed</p>
                <p className="text-sm text-destructive/80">{submitError}</p>
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
                  className={errors.fullName ? "border-destructive" : ""}
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
                  onChange={handleChange}
                  placeholder="13-digit SA ID number"
                  className={errors.idNumber ? "border-destructive" : ""}
                />
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
                  className={errors.phoneNumber ? "border-destructive" : ""}
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
                  className={errors.email ? "border-destructive" : ""}
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
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="e.g., 10000"
                className={errors.loanAmount ? "border-destructive" : ""}
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
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                    errors.employmentStatus
                      ? "border-destructive"
                      : "border-input"
                  }`}
                >
                  <option value="">Select status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
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
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  placeholder="e.g., 15000"
                  className={errors.monthlyIncome ? "border-destructive" : ""}
                />
                {errors.monthlyIncome && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.monthlyIncome}
                  </p>
                )}
              </div>
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
              checked={formData.confirmAccurate}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />
            <label
              htmlFor="confirmAccurate"
              className="text-sm text-muted-foreground"
            >
              I confirm that the information provided is accurate and complete. I
              understand that providing false information may result in my
              application being rejected.
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
                checked={formData.consentToProcess}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
              />
              <div>
                <label
                  htmlFor="consentToProcess"
                  className="text-sm leading-relaxed text-foreground"
                >
                  I understand and agree that the information I provide may be
                  used for application assessment, verification, and, if
                  approved, for debit order processing and related payment
                  administration.
                </label>
                <p className="mt-2 text-xs text-muted-foreground">
                  This acknowledgement does not replace any formal debit order or
                  bank mandate that may be required after approval.
                </p>
              </div>
            </div>
            {errors.consentToProcess && (
              <p className="mt-2 text-sm text-destructive">
                {errors.consentToProcess}
              </p>
            )}
          </div>

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
                Submitting...
              </>
            ) : (
              "Apply Now"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
