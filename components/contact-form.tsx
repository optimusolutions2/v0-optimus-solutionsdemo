"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2, AlertCircle, Send } from "lucide-react"
import { submitContactForm } from "@/app/actions/submit-contact"

interface ContactFormData {
  name: string
  email: string
  message: string
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  message: "",
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (submitError) {
      setSubmitError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
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

  if (isSubmitted) {
    return (
      <Card className="border-0 bg-card shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            Message Sent Successfully
          </h3>
          <p className="text-muted-foreground">
            Thank you for contacting us. We&apos;ll get back to you within 1-2
            business days.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {submitError && (
            <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Submission Failed</p>
                <p className="text-sm text-destructive/80">{submitError}</p>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email <span className="text-destructive">*</span>
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
              <p className="mt-1 text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={5}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-destructive">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-[#012a4a] transition-all duration-300 hover:bg-[#013a63] hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
