"use client"

import { useState } from "react"
import Link from "next/link"
import { submitContactForm } from "@/app/actions/submit-contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react"

const enquiryTypes = [
  "Accounting & Financial Reporting",
  "Tax & SARS Services",
  "Business Advisory",
  "Business Administration & Compliance",
] as const

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(event.currentTarget)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setIsSuccess(true)
        event.currentTarget.reset()
      } else {
        setError(result.message || "We couldn't send your enquiry. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again or contact us by email.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#012a4a] text-white">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <h3 className="mt-5 text-2xl font-bold text-[#012a4a]">
          Enquiry received
        </h3>

        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          Thank you for contacting Optimus Solutions. Our team will review
          your enquiry and get back to you.
        </p>

        <Button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-6 bg-[#012a4a] text-white hover:bg-[#03416f]"
        >
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your full name"
            autoComplete="name"
            required
            maxLength={120}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+27 ..."
            autoComplete="tel"
            required
            maxLength={30}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          maxLength={254}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="enquiryType">Professional service *</Label>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          defaultValue=""
          disabled={isSubmitting}
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#012a4a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>
            Select the service you need
          </option>
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <p className="text-xs leading-5 text-slate-500">
          Select the category that best matches your requirements. You can
          explain the specific service you need in the message below.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help? *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us which service you need and briefly describe your requirements."
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          disabled={isSubmitting}
          className="resize-y"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 w-full bg-[#012a4a] text-white transition hover:bg-[#03416f] sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending enquiry...
          </>
        ) : (
          <>
            Send Enquiry
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs leading-5 text-slate-500">
        Looking to apply for a loan?{" "}
        <Link
          href="/apply"
          className="font-semibold text-[#012a4a] underline underline-offset-4 hover:text-[#03416f]"
        >
          Use our loan application form instead.
        </Link>
      </p>
    </form>
  )
}
