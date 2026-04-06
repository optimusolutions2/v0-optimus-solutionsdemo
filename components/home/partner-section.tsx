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
      className="border-y border-border/50 bg-gradient-to-b from-muted/30 to-background py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col items-center justify-center gap-6 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trusted Payment Support
          </p>
          <div className="flex items-center justify-center rounded-xl bg-white px-8 py-4 shadow-sm ring-1 ring-border/50">
            <Image
              src="/images/easydebit-logo.png"
              alt="EasyDebit - Simple, Smart, Secure payment processing"
              width={180}
              height={60}
              className="h-auto w-auto max-h-12 object-contain"
            />
          </div>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Secure debit order collections powered by EasyDebit
          </p>
        </div>
      </div>
    </section>
  )
}
