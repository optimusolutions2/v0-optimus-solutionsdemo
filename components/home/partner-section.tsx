
"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  Calculator,
  FileCheck,
  ChartNoAxesCombined,
  CheckCircle2,
} from "lucide-react"

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
      { threshold: 0.15 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* Section introduction */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#012a4a]">
                Our Strategic Partnership
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl lg:text-5xl">
              More support for your{" "}
              <span className="text-blue-700">business journey.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Optimus Solutions is building valuable partnerships to connect
              individuals and businesses with services that support their
              financial goals and long-term growth.
            </p>
          </div>

          {/* Keystone feature */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                    Business Advisory Partner
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    Gauteng, South Africa
                  </span>
                </div>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Introducing our partner
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl">
                  Keystone Advisory
                  <br />
                  and Associates
                </h3>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                  Professional accounting, tax and business advisory services
                  for South African businesses. Through this partnership,
                  businesses can discover specialist support for their
                  financial reporting, tax obligations and important business
                  decisions.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Experienced accounting support
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Bookkeeping, management accounts, financial statements
                        and payroll.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Tax and SARS services
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Tax returns, VAT, SARS queries and tax planning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Business advisory
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Financial modelling, business valuations and outsourced
                        CFO support.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.keystoneassociate.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#012a4a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Explore Keystone's Services
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="mt-3 text-xs text-slate-400">
                  Opens the Keystone website in a new tab.
                </p>
              </div>

              {/* Partner services panel */}
              <div className="relative flex flex-col justify-center overflow-hidden bg-[#012a4a] p-7 text-white sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-5 -top-5 h-36 w-36 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-400/10 blur-2xl" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                    Keystone Advisory and Associates
                  </p>

                  <h4 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                    Clarity for your numbers.
                    <br />
                    Confidence for your decisions.
                  </h4>

                  <p className="mt-4 text-sm leading-6 text-blue-100/75">
                    Explore specialist services designed to help businesses
                    understand their finances, meet their obligations and plan
                    ahead.
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.1]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <Calculator className="h-5 w-5 text-blue-200" />
                      </div>
                      <div>
                        <p className="font-semibold">Accounting & Reporting</p>
                        <p className="mt-1 text-xs text-blue-100/65">
                          Understand your financial position
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.1]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <FileCheck className="h-5 w-5 text-blue-200" />
                      </div>
                      <div>
                        <p className="font-semibold">Tax & Compliance</p>
                        <p className="mt-1 text-xs text-blue-100/65">
                          Navigate tax obligations and SARS matters
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.1]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <ChartNoAxesCombined className="h-5 w-5 text-blue-200" />
                      </div>
                      <div>
                        <p className="font-semibold">Business Advisory</p>
                        <p className="mt-1 text-xs text-blue-100/65">
                          Make informed financial decisions
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-white/15 pt-6">
                    <p className="text-sm font-semibold">
                      Davies Oluwole-Ogunyemi
                    </p>
                    <p className="mt-1 text-sm text-blue-100/70">
                      CA(SA), ACMA, CGMA · Managing Director
                    </p>
                    <a
                      href="mailto:davies@keystoneassociate.co.za"
                      className="mt-3 inline-block text-sm text-blue-200 underline decoration-blue-200/40 underline-offset-4 transition-colors hover:text-white"
                    >
                      davies@keystoneassociate.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Existing partners and regulatory information */}
          <div className="mt-16">
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

              {/* NCR */}
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
