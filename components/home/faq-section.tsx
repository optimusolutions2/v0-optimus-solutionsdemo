"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What types of loans do you offer?",
    answer:
      "We offer a variety of loan options including personal loans, business loans, and payday loans. Each loan type is designed to meet different financial needs and circumstances.",
  },
  {
    question: "How fast is the approval process?",
    answer:
      "Our approval process is quick and efficient. Most applications are reviewed within 24-48 hours. Once approved, funds are typically deposited into your account within one to two business days.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Absolutely. We take data security very seriously. All your personal and financial information is protected with industry-standard encryption and secure data handling practices.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No, we believe in transparent pricing. All fees and charges are clearly disclosed upfront before you sign any agreement. There are no hidden fees or surprise charges.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Find answers to common questions about our loan services.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-card shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
