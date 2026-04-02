"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

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
}

interface ApplicationFormProps {
  onSubmit?: (data: LoanApplicationData) => Promise<void>
}

export function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState<LoanApplicationData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof LoanApplicationData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default handler - simulates API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
      setIsSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
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

  if (isSubmitted) {
    return (
      <Card className="border-0 bg-card shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            Application Submitted Successfully
          </h3>
          <p className="text-muted-foreground">
            Thank you for your application. Our team will review your
            information and contact you within 24-48 hours.
          </p>
        </CardContent>
      </Card>
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
