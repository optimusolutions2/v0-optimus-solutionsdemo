"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#005bbb] to-[#003366]">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Side */}
          <div className="text-center lg:text-left">
            <h1
              className={`text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl transition-all duration-700 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              Get Cash Fast — Up to R10,000 Today
            </h1>

            <p
              className={`mt-6 text-pretty text-lg text-white/90 md:text-xl transition-all duration-700 ease-out delay-150 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              Quick approval. No paperwork stress.
            </p>

            {/* NEW NCR ACCREDITATION */}
            <div
              className={`mt-6 inline-flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md transition-all duration-700 ease-out delay-200 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <Image
                src="/images/NCR LOGO.png"
                alt="National Credit Regulator"
                width={56}
                height={56}
                className="h-12 w-auto object-contain"
              />

              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Registered Credit Provider
                </p>
                <p className="text-sm text-white/80">
                  NCR Registration No.
                  <span className="ml-1 font-bold text-white">
                    NCRCP23929
                  </span>
                </p>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start transition-all duration-700 ease-out delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <Button
                asChild
                size="lg"
                className="w-full bg-white px-8 text-[#003366] shadow-lg transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-xl sm:w-auto"
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
              className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80 lg:justify-start transition-all duration-700 ease-out delay-500 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🔒 Secure</span>
              </div>

              <div className="flex items-center gap-2">
                <span>⚡ Fast Approval</span>
              </div>

              <div className="flex items-center gap-2">
                <span>⏱ 24–48 Hours</span>
              </div>

              <div className="flex items-center gap-2">
                <span>✔ NCR Registered</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className={`relative transition-all duration-700 ease-out delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl lg:max-w-none">
              <Image
                src="/images/hero-bg.png"
                alt="Happy customer celebrating loan approval on her phone"
                fill
                className="object-cover object-[center_30%]"
                priority
              />
            </div>

            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
