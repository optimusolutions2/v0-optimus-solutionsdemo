```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Send,
  ArrowRight,
  FileText,
} from "lucide-react"
import { submitContactForm } from "@/app/actions/submit-contact"

const enquiryTypes = [
  "New loan application",
  "Existing loan application",
  "Business services",
  "Partnerships and collaborations",
  "General enquiry",
  "Other",
] as const

type EnquiryType = (typeof enquiryTypes)[number]

interface ContactFormData {
  name: string
  phone: string
  email: string
  enquiryType: EnquiryType | ""
  message: string
}

type FormField = keyof ContactFormData

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  enquiryType: "",
  message: "",
}

export function ContactForm() {
  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<
    Partial<Record<FormField, string>>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }))

    setSubmitError(null)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<FormField, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name."
    } else if (formData.name.trim().length > 120) {
      newErrors.name = "Your name must be 120 characters or fewer."
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your contact number."
    } else if (
      !/^[+()\d\s-]{7,30}$/.test(formData.phone.trim())
    ) {
      newErrors.phone = "Please enter a valid phone number."
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address."
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = "Please select an enquiry type."
    }

    if (formData.message.trim().length > 3000) {
      newErrors.message = "Your message must be 3,000 characters or fewer."
    } else if (
      formData.message.trim().length > 0 &&
      formData.message.trim().length < 10
    ) {
      newErrors.message =
        "Please enter at least 10 characters, or leave the message blank."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const result = await submitContactForm({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        enquiryType: formData.enquiryType as EnquiryType,
        message: formData.message.trim(),
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setSubmitError(result.message)
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      setSubmitError(
        "Something went wrong while sending your enquiry. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <CheckCircle className="h-8 w-8 text-[#012a4a]" />
          </div>

          <h3 className="text-2xl font-bold text-[#012a4a]">
            Enquiry received
          </h3>

          <p className="mt-3 max-w-md leading-7 text-slate-600">
            Thank you for contacting Optimus Solutions. Your enquiry has been
            submitted successfully. We aim to respond within 1–2 business days.
          </p>

          <Button
            type="button"
            onClick={() => {
              setFormData(initialFormData)
              setErrors({})
              setSubmitError(null)
              setIsSubmitted(false)
            }}
            variant="outline"
            className="mt-6 border-slate-300 text-[#012a4a] hover:bg-slate-100"
          >
            Send another enquiry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-5">
        <CardTitle className="text-2xl font-bold text-[#012a4a]">
          Send an enquiry
        </CardTitle>
        <p className="text-sm leading-6 text-slate-500">
          Tell us what you need. Fields marked with an asterisk are required.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {submitError && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">
                  We couldn't send your enquiry
                </p>
                <p className="mt-1 text-sm text-red-700">{submitError}</p>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="enquiryType"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              What can we help you with?{" "}
              <span className="text-red-600">*</span>
            </label>

            <select
              id="enquiryType"
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              aria-invalid={Boolean(errors.enquiryType)}
              aria-describedby={
                errors.enquiryType ? "enquiryType-error" : undefined
              }
              className={`flex h-12 w-full rounded-lg border bg-white px-3 text-sm text-slate-800 outline-none transition-colors focus:ring-2 focus:ring-[#012a4a]/20 ${
                errors.enquiryType
                  ? "border-red-500"
                  : "border-slate-200 focus:border-[#012a4a]"
              }`}
            >
              <option value="">Select an enquiry type</option>
              {enquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.enquiryType && (
              <p id="enquiryType-error" className="mt-1.5 text-sm text-red-600">
                {errors.enquiryType}
              </p>
            )}

            {formData.enquiryType === "New loan application" && (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#012a4a]" />
                  <div>
                    <p className="text-sm font-semibold text-[#012a4a]">
                      Ready to apply?
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      Use the dedicated application form to submit your loan
                      application.
                    </p>
                    <Link
                      href="/apply"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#012a4a] hover:underline"
                    >
                      Go to loan application
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full name <span className="text-red-600">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                className={`h-12 border-slate-200 focus-visible:ring-[#012a4a]/20 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Phone number <span className="text-red-600">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+27 72 000 0000"
                aria-invalid={Boolean(errors.phone)}
                className={`h-12 border-slate-200 focus-visible:ring-[#012a4a]/20 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email address <span className="text-red-600">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className={`h-12 border-slate-200 focus-visible:ring-[#012a4a]/20 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Your message{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly tell us how we can help..."
              rows={4}
              maxLength={3000}
              aria-invalid={Boolean(errors.message)}
              className={`min-h-28 resize-y border-slate-200 focus-visible:ring-[#012a4a]/20 ${
                errors.message ? "border-red-500" : ""
              }`}
            />
            <div className="mt-1.5 flex items-start justify-between gap-3">
              {errors.message ? (
                <p className="text-sm text-red-600">{errors.message}</p>
              ) : (
                <p className="text-xs text-slate-500">
                  Please don't include passwords, PINs, or sensitive account
                  credentials.
                </p>
              )}
              <span className="shrink-0 text-xs text-slate-400">
                {formData.message.length}/3000
              </span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-12 w-full bg-[#012a4a] font-semibold text-white transition-colors hover:bg-[#013a63] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending enquiry...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit enquiry
              </>
            )}
          </Button>

          <p className="text-center text-xs leading-5 text-slate-500">
            Your information will be used to respond to your enquiry.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
```
