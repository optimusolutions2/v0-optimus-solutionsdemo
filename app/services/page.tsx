
"use client"

import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  Landmark,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Users,
  ClipboardCheck,
  Receipt,
  HandCoins,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react"

const serviceGroups = [
  {
    number: "01",
    title: "Accounting & Financial Reporting",
    description:
      "Reliable financial information to help you understand your numbers, maintain accurate records and make informed business decisions.",
    icon: Calculator,
    services: [
      "Bookkeeping and financial record management",
      "Monthly management accounts",
      "Annual financial statements",
      "IFRS and IFRS for SMEs reporting",
      "Independent review support",
      "Payroll administration",
      "NPO and NPC financial reporting",
    ],
  },
  {
    number: "02",
    title: "Tax & SARS Services",
    description:
      "Practical tax compliance and support for individuals and businesses, helping you manage your tax responsibilities with confidence.",
    icon: Receipt,
    services: [
      "Individual income tax returns",
      "Company income tax returns",
      "Provisional tax submissions",
      "VAT registration and returns",
      "SARS queries and dispute assistance",
      "Tax return corrections",
      "Tax planning and compliance support",
    ],
  },
  {
    number: "03",
    title: "Business Advisory",
    description:
      "Financial insight and strategic support to help businesses evaluate opportunities, improve performance and plan for growth.",
    icon: ChartNoAxesCombined,
    services: [
      "Financial modelling and business valuations",
      "Transaction support and due diligence",
      "Deal structuring assistance",
      "Outsourced CFO support",
      "Business rescue advisory",
      "Financial performance analysis",
    ],
  },
  {
    number: "04",
    title: "Business Administration & Compliance",
    description:
      "Support with essential company administration, statutory processes and business documentation.",
    icon: ClipboardCheck,
    services: [
      "Company secretarial support",
      "CIPC-related services",
      "Business compliance assistance",
      "Financial confirmations and certificates",
      "Business documentation support",
    ],
  },
]

const industries = [
  "Hospitality",
  "Construction & Engineering",
  "Agriculture",
  "Mining",
  "NPOs & NPCs",
  "Financial Services",
]

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-white text-slate-900">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#012a4a] pt-24 text-white sm:pt-28">
          {/* Soft grey decorative lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-slate-300/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-0 h-[28rem] w-[28rem] rounded-full bg-slate-500/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-5rem] top-20 h-80 w-80 rounded-full border border-slate-200/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-1rem] top-36 h-64 w-64 rounded-full border border-slate-200/10"
          />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-8 md:pb-24">
            <div>
              <Link
                href="/"
                aria-label="Optimus Solutions home"
                className="mb-8 inline-flex items-center transition duration-300 hover:scale-[1.02]"
              >
                <Image
                  src="/images/logo.png"
                  alt="Optimus Solutions"
                  width={360}
                  height={135}
                  priority
                  className="h-20 w-auto object-contain sm:h-24"
                />
              </Link>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                More support for
                <span className="mt-1 block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  your next move.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                From financial solutions to accounting, tax and business
                advisory, Optimus Solutions helps individuals and businesses
                access the support they need to move forward.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#professional-services"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-200 px-6 py-3.5 font-semibold text-[#012a4a] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Explore Our Services
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.04] px-6 py-3.5 font-semibold text-white transition duration-300 hover:border-slate-300/50 hover:bg-white/10"
                >
                  Talk to Our Team
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-300" />
                  Personal financial solutions
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-300" />
                  Professional business support
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-slate-300/10 via-transparent to-slate-500/10 blur-xl"
              />

              <div className="relative grid grid-cols-2 gap-4">
                <div className="group rounded-2xl border border-slate-200/20 bg-gradient-to-br from-white/[0.12] to-white/[0.04] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300/40 sm:p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/20 bg-slate-200/10 text-slate-200 transition group-hover:bg-slate-200 group-hover:text-[#012a4a]">
                    <HandCoins className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-semibold">Financial Solutions</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Explore our existing loan services and application options.
                  </p>
                  <Link
                    href="/apply"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:gap-3 hover:text-white"
                  >
                    Apply online <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="group mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.03] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300/30 sm:p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-slate-200">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-semibold">Business Support</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Accounting, tax compliance and advisory services for
                    organisations.
                  </p>
                  <a
                    href="#professional-services"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:gap-3 hover:text-white"
                  >
                    View services <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="relative mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-[#001d36]/70 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200/10 text-slate-200">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    One team. Multiple ways to help.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Explore the support that fits your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-600">
                What We Do
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl">
                Support built around your needs.
              </h2>
              <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-slate-400 to-slate-200" />
            </div>

            <p className="max-w-2xl text-base leading-8 text-slate-600">
              Every individual and business faces different challenges. Our
              services are designed to provide practical financial, compliance
              and business support, with a focus on clarity, professionalism
              and dependable service.
            </p>
          </div>
        </section>

        {/* Loan services */}
        <section className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100/70 py-14 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl"
          />

          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-8">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#012a4a] to-[#25445e] text-white shadow-lg shadow-slate-900/10">
                <Landmark className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                Financial Solutions
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#012a4a] sm:text-3xl">
                Loan Solutions
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Explore our existing loan offering and submit an application
                through our online application process.
              </p>
              <Link
                href="/apply"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#012a4a] px-5 py-3 font-semibold text-white shadow-md shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#03416f]"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Online loan applications",
                "Application information and requirements",
                "Application review process",
                "Direct customer support",
              ].map((item) => (
                <div
                  key={item}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover:bg-slate-200">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="pt-1 text-sm font-medium leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional services */}
        <section
          id="professional-services"
          className="relative mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 md:px-8 md:py-24"
        >
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-600">
                Business & Professional Services
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl">
                The expertise to keep you moving.
              </h2>
              <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-slate-400 to-slate-200" />
              <p className="mt-5 leading-8 text-slate-600">
                Access accounting, taxation, financial reporting and advisory
                services through Optimus Solutions. Get in touch to discuss your
                requirements and find out which services are suitable for you.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 md:inline-flex">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Professional support
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceGroups.map((group) => {
              const Icon = group.icon

              return (
                <article
                  key={group.number}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 hover:bg-gradient-to-br hover:from-white hover:to-slate-50 sm:p-8"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[5rem] bg-gradient-to-bl from-slate-100 to-transparent transition duration-300 group-hover:from-slate-200/70" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 text-slate-700 transition duration-300 group-hover:border-[#012a4a] group-hover:bg-[#012a4a] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold tracking-widest text-slate-300 transition group-hover:text-slate-500">
                      {group.number}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-xl font-bold text-[#012a4a] sm:text-2xl">
                    {group.title}
                  </h3>

                  <p className="relative mt-3 leading-7 text-slate-600">
                    {group.description}
                  </p>

                  <div className="relative mt-6 h-px w-full bg-gradient-to-r from-slate-300 via-slate-100 to-transparent" />

                  <ul className="relative mt-6 space-y-3">
                    {group.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="relative mt-7 inline-flex items-center gap-2 border-b border-slate-400 pb-1 text-sm font-semibold text-[#012a4a] transition duration-300 hover:gap-3 hover:border-[#012a4a]"
                  >
                    Enquire about this service
                    <ArrowRight className="h-4 w-4 text-slate-600" />
                  </Link>
                </article>
              )
            })}
          </div>
        </section>

        {/* Industries */}
        <section className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100/70 py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-slate-200/50 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                <Users className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl">
                Supporting businesses across sectors
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Our professional services can support organisations operating
                in a range of industries.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="flex min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-white/90 p-4 text-center text-sm font-semibold text-[#012a4a] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="relative isolate overflow-hidden bg-[#012a4a] py-16 text-white sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-slate-300/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-slate-500/10 blur-3xl"
          />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />

          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
                Let’s Talk
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Let’s find the right support for you.
              </h2>
              <p className="mt-4 leading-7 text-slate-200">
                Contact Optimus Solutions to discuss our services, ask a
                question or take the next step.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-200 px-6 py-3.5 font-semibold text-[#012a4a] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+27729603512"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.04] px-6 py-3.5 font-semibold text-white transition hover:border-slate-300/50 hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Call Optimus
              </a>
              <a
                href="mailto:info@optimussolutions.co.za"
                className="inline-flex min-h-12 items-center justify-center gap-2 px-3 py-2 text-sm text-slate-200 transition hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <footer className="border-t border-white/10 bg-[#001d36] px-4 py-6 text-center text-sm text-slate-300">
          <p>
            © {new Date().getFullYear()} Optimus Solutions. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  )
}
