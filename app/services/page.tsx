
"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  FileText,
  Landmark,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Users,
  ClipboardCheck,
  Receipt,
  Building2,
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
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#012a4a] pt-32 text-white sm:pt-36">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute bottom-0 right-0 h-1 w-1/3 bg-cyan-400/60" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-8 md:pb-24">
          <div>
            {/* Optimus Solutions logo — the only visual addition */}
            <Link
              href="/"
              aria-label="Optimus Solutions home"
              className="mb-6 inline-flex rounded-lg bg-white px-3 py-2"
            >
              <Image
                src="/images/logo.png"
                alt="Optimus Solutions"
                width={240}
                height={90}
                priority
                className="h-14 w-auto object-contain sm:h-16"
              />
            </Link>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              More support for
              <span className="block text-cyan-300">your next move.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              From financial solutions to accounting, tax and business
              advisory, Optimus Solutions helps individuals and businesses
              access the support they need to move forward.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#professional-services"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-[#012a4a] transition hover:bg-cyan-50"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
              <HandCoins className="mb-5 h-8 w-8 text-cyan-300" />
              <h2 className="text-lg font-semibold">Financial Solutions</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Explore our existing loan services and application options.
              </p>
              <Link
                href="/apply"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white"
              >
                Apply online <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-6">
              <BriefcaseBusiness className="mb-5 h-8 w-8 text-cyan-300" />
              <h2 className="text-lg font-semibold">Business Support</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Accounting, tax compliance and advisory services for
                organisations.
              </p>
              <a
                href="#professional-services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white"
              >
                View services <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl">
              Support built around your needs.
            </h2>
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
      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-8">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#012a4a] text-white">
              <Landmark className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#012a4a] sm:text-3xl">
              Loan Solutions
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Explore our existing loan offering and submit an application
              through our online application process.
            </p>
            <Link
              href="/apply"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#012a4a] px-5 py-3 font-semibold text-white transition hover:bg-[#03416f]"
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
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
                <span className="text-sm font-medium leading-6 text-slate-700">
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
        className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 md:px-8 md:py-24"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
            Business & Professional Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl">
            The expertise to keep you moving.
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Access accounting, taxation, financial reporting and advisory
            services through Optimus Solutions. Get in touch to discuss your
            requirements and find out which services are suitable for you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group) => {
            const Icon = group.icon

            return (
              <article
                key={group.number}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-800 transition group-hover:bg-[#012a4a] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold tracking-widest text-slate-300">
                    {group.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#012a4a] sm:text-2xl">
                  {group.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {group.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {group.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                      {service}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 border-b border-sky-700 pb-1 text-sm font-semibold text-[#012a4a] transition hover:gap-3"
                >
                  Enquire about this service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Users className="mx-auto h-8 w-8 text-sky-700" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#012a4a] sm:text-4xl">
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
                className="flex min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-[#012a4a] transition hover:border-sky-300"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-[#012a4a] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-[#012a4a] transition hover:bg-cyan-50"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+27729603512"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call Optimus
            </a>
            <a
              href="mailto:info@optimussolutions.co.za"
              className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-cyan-200 transition hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="bg-[#001d36] px-4 py-6 text-center text-sm text-slate-300">
        <p>
          © {new Date().getFullYear()} Optimus Solutions. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
