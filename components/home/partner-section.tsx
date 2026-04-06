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
          className={`flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Supported payment processing
          </p>
          <div className="h-px w-8 bg-border/50 hidden sm:block" />
          <div className="flex items-center justify-center rounded-lg bg-white/80 px-5 py-2.5 shadow-sm ring-1 ring-border/30">
            <Image
              src="/images/easydebit-logo.png"
              alt="EasyDebit - Simple, Smart, Secure payment processing"
              width={140}
              height={45}
              className="h-auto w-auto max-h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
