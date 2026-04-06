"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Happy customer celebrating loan approval"
          fill
          className="object-cover object-[75%_center] md:object-[60%_center] lg:object-center"
          priority
        />
      </div>

      {/* Dark Blue Gradient Overlay - covers the left side where text is */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#012a4a]/95 via-[#012a4a]/85 to-[#012a4a]/40 md:from-[#012a4a]/90 md:via-[#012a4a]/70 md:to-transparent" />
      
      {/* Additional vertical gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#012a4a]/60 via-transparent to-[#012a4a]/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Headline */}
          <h1
            className={`text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl transition-all duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Fast &amp; Reliable Loan Solutions
          </h1>

          {/* Subheadline */}
          <p
            className={`mt-6 text-pretty text-lg text-white/90 md:text-xl transition-all duration-700 ease-out delay-150 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Get approved within 24-48 hours with flexible terms tailored to
            your needs. Trusted by South Africans for fast, secure lending.
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-col items-start gap-4 sm:flex-row transition-all duration-700 ease-out delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-white px-8 text-[#012a4a] shadow-lg transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-xl sm:w-auto"
            >
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/60 hover:text-white sm:w-auto"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div
            className={`mt-12 flex flex-wrap items-center gap-6 text-sm text-white/70 transition-all duration-700 ease-out delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span>Secure Process</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span>Fast Approvals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span>Personal Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
