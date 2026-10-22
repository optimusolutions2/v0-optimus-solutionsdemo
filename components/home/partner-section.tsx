
"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Handshake } from "lucide-react"

export function PartnerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-white py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          {/* Discreet Keystone partnership banner */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#012a4a] text-white shadow-sm sm:h-14 sm:w-14">
                  <Handshake className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-800">
                    Our Advisory Partner
                  </p>

                  <h2 className="mt-2 text-xl font-bold tracking-tight text-[#012a4a] sm:text-2xl">
                    Meet Keystone Advisory and Associates
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                    Looking for accounting, tax or business advisory support?
                    Discover our partner’s specialist services for businesses
                    through its dedicated information page.
                  </p>
                </div>
              </div>

              <a
                href="/keystone"
                className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#012a4a] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:self-center"
              >
                Discover Keystone
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Existing payment and regulatory information — preserved */}
          <div className="mt-12 border-t border-slate-100 pt-10">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Payment & Regulatory Information
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Supporting the payment process and regulatory transparency.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              {/* EasyDebit */}
              <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-5 shadow-sm">
                <Image
                  src="/images/easydebit-logo.png"
                  alt="EasyDebit"
                  width={140}
                  height={45}
                  className="h-auto max-h-8 w-auto object-contain"
                />
                <p className="mt-3 text-xs font-medium text-slate-500">
                  Payment Processing Partner
                </p>
              </div>

              {/* NCR — registration details intentionally unchanged */}
              <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-5 shadow-sm">
                <Image
                  src="/images/NCR LOGO.png"
                  alt="National Credit Regulator"
                  width={140}
                  height={45}
                  className="h-auto max-h-10 w-auto object-contain"
                />
                <p className="mt-2 text-xs font-semibold text-slate-800">
                  Registered Credit Provider
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  NCR Registration No.
                </p>
                <p className="text-sm font-bold text-[#012a4a]">
                  NCRCP23929
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
