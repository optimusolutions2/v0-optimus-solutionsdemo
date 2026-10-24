"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 100)
    return () => window.clearTimeout(timer)
  }, [])

  const reveal = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-5 opacity-0"
    }`

  return (
    <section className="relative isolate overflow-hidden bg-[#012a4a] text-white">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-slate-300/[0.08] blur-3xl" />
        <div className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-white/[0.05] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Main message */}
          <div className="text-center lg:text-left">
            <div className={reveal("delay-100")}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                Optimus Solutions
              </span>
            </div>

            <h1
              className={`mt-7 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl ${reveal("delay-150")}`}
            >
              Financial support
              <span className="mt-2 block text-slate-300">
                for your next step.
              </span>
            </h1>

            <p
              className={`mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0 ${reveal("delay-200")}`}
            >
              Explore our loan solutions or connect with our team for
              professional accounting, tax, financial reporting and business
              advisory services.
            </p>

            {/* Registration details */}
            <div className={`mt-7 ${reveal("delay-250")}`}>
              <div className="mx-auto inline-flex max-w-full items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-left backdrop-blur-sm lg:mx-0">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
                  <Image
                    src="/images/NCR LOGO.png"
                    alt="National Credit Regulator"
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    Registered Credit Provider
                  </p>
                  <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                    NCR Registration No.
                  </p>
                  <p className="mt-0.5 text-sm font-bold tracking-wide text-white">
                    NCRCP23929
                  </p>
                </div>

                <ShieldCheck className="ml-1 hidden h-6 w-6 shrink-0 text-slate-300 sm:block" />
              </div>
            </div>

            {/* Calls to action */}
            <div className={`mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start ${reveal("delay-300")}`}>
              <Button
                asChild
                size="lg"
                className="group min-h-12 w-full rounded-xl bg-slate-200 px-7 font-semibold text-[#012a4a] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl sm:w-auto"
              >
                <Link href="/apply">
                  Apply for a Loan
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-12 w-full rounded-xl border-white/25 bg-white/[0.04] px-7 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link href="/contact">
                  Enquire Now
                </Link>
              </Button>
            </div>

            <p className={`mt-5 text-sm text-slate-400 ${reveal("delay-500")}`}>
              Need accounting, tax or business support?{" "}
              <Link
                href="/contact"
                className="font-semibold text-slate-200 underline decoration-slate-500 underline-offset-4 transition hover:text-white"
              >
                Talk to our team
              </Link>
              .
            </p>
          </div>

          {/* Image and trust information */}
          <div className={`relative mx-auto w-full max-w-xl lg:max-w-none ${reveal("delay-200")}`}>
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-white/15 via-transparent to-slate-400/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#001d36] p-2 shadow-2xl shadow-black/20 sm:rounded-[2rem] sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-slate-800 sm:rounded-[1.5rem]">
                <Image
                  src="/images/hero-bg.png"
                  alt="Customer using a phone to access financial services"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001d36]/70 via-transparent to-transparent" />

                <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                  <div className="rounded-xl border border-white/15 bg-[#012a4a]/85 p-4 backdrop-blur-md sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-slate-200">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          Support when you need it
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">
                          Loan application options and professional services
                          in one place.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting highlights */}
            <div className="relative mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3.5 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-slate-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    NCR registered
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Credit provider
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3.5 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-slate-200">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Clear next steps
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Guided application process
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  )
}
