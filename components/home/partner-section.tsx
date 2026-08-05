"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function PartnerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="border-t border-border/30 bg-muted/20 py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col items-center justify-center gap-6 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Trusted Payment & Regulatory Partners
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {/* EasyDebit */}
            <div className="flex flex-col items-center rounded-lg bg-white/80 px-5 py-4 shadow-sm ring-1 ring-border/30">
              <Image
                src="/images/easydebit-logo.png"
                alt="EasyDebit - Simple, Smart, Secure payment processing"
                width={140}
                height={45}
                className="h-auto w-auto max-h-8 object-contain"
              />
              <p className="mt-3 text-xs font-medium text-muted-foreground">
                Payment Processing Partner
              </p>
            </div>

            {/* NCR */}
            <div className="flex flex-col items-center rounded-lg bg-white/80 px-5 py-4 shadow-sm ring-1 ring-border/30">
              <Image
                src="/images/NCR LOGO.png"
                alt="National Credit Regulator"
                width={140}
                height={45}
                className="h-auto w-auto max-h-10 object-contain"
              />
              <p className="mt-3 text-xs font-semibold text-foreground">
                Registered Credit Provider
              </p>
              <p className="text-xs text-muted-foreground">
                NCR Registration No.
              </p>
              <p className="text-sm font-bold text-primary">
                NCRCP23929
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
