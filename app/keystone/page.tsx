
import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  FileCheck2,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Keystone Advisory and Associates | Business Advisory Partner",
  description:
    "Discover accounting, tax, financial reporting and business advisory services from Keystone Advisory and Associates, based in Midrand, Gauteng.",
}

const services = [
  {
    number: "01",
    icon: Calculator,
    title: "Accounting & Reporting",
    description:
      "Gain a clearer understanding of your business finances through bookkeeping, management accounts and financial reporting.",
    items: [
      "Bookkeeping and financial records",
      "Management accounts",
      "Annual financial statements",
      "Payroll and reporting support",
    ],
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Tax & SARS Services",
    description:
      "Get support with tax administration, compliance and navigating SARS-related matters.",
    items: [
      "Individual and company tax returns",
      "VAT and provisional tax",
      "SARS queries and disputes",
      "Tax planning and filing corrections",
    ],
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Business Advisory",
    description:
      "Explore financial insight and strategic support to help inform important business decisions.",
    items: [
      "Financial modelling and valuations",
      "Outsourced CFO support",
      "Transaction and due diligence support",
      "Business rescue support",
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

export default function KeystonePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Dedicated Keystone navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/keystone"
            className="flex items-center gap-3"
            aria-label="Keystone Advisory and Associates home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#163b35] text-lg font-bold text-white">
              K
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-[#163b35] sm:text-base">
                KEYSTONE
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
                Advisory & Associates
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#services"
              className="text-sm font-medium text-slate-600 transition hover:text-[#163b35]"
            >
              Services
            </a>
            <a
              href="#industries"
              className="text-sm font-medium text-slate-600 transition hover:text-[#163b35]"
            >
              Industries
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-[#163b35]"
            >
              About
            </a>
          </nav>

          <a
            href="https://www.keystoneassociate.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#163b35] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#24564d] sm:px-5 sm:text-sm"
          >
            Official Website
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#102d29] text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 top-12 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                Accounting · Tax · Advisory
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Better financial clarity.
              <span className="mt-2 block text-emerald-200">
                More confident decisions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Keystone Advisory and Associates provides accounting, tax and
              business advisory services to help businesses understand their
              financial position, navigate obligations and plan ahead.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#services"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#163b35] transition hover:bg-emerald-50"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="mailto:davies@keystoneassociate.co.za?subject=Keystone%20Initial%20Consultation"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Request an Introduction
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-200" />
                Midrand, Gauteng
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-200" />
                Chartered Accountants (SA)
              </span>
            </div>
          </div>

          {/* Credentials panel */}
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-7 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                Meet the Managing Director
              </p>

              <div className="mt-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-200/10 text-2xl font-semibold text-emerald-100">
                DO
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                Davies Oluwole-Ogunyemi
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                CA(SA), ACMA, CGMA
              </p>
              <p className="text-sm text-slate-300">Managing Director</p>

              <div className="my-7 h-px bg-white/15" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <p className="text-sm leading-6 text-slate-200">
                    Accounting and financial reporting support
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <p className="text-sm leading-6 text-slate-200">
                    Tax administration and SARS-related assistance
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <p className="text-sm leading-6 text-slate-200">
                    Financial and strategic business advisory
                  </p>
                </div>
              </div>

              <a
                href="https://www.keystoneassociate.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-white"
              >
                Visit Keystone's official website
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-0 h-24 w-24 rounded-3xl border border-emerald-300/20" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="about" className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              About Keystone
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#163b35] sm:text-4xl">
              A clearer picture of your business finances.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-slate-600">
            <p>
              Running a business involves more than keeping track of numbers.
              Financial reporting, tax responsibilities and strategic planning
              all play a role in making informed decisions.
            </p>
            <p>
              Keystone Advisory and Associates offers services across these
              areas, with options for recurring accounting support and
              assistance with specific business needs.
            </p>
            <p className="text-sm text-slate-500">
              Service scope, engagement terms and fees should be confirmed
              directly with Keystone.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              What Keystone Does
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#163b35] sm:text-4xl">
              Services built around your business needs.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Explore the main service areas and contact Keystone to discuss
              the support appropriate for your organisation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <article
                  key={service.number}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-800/30 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#163b35]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-slate-300">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-semibold text-[#163b35]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-5 text-slate-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`mailto:davies@keystoneassociate.co.za?subject=${encodeURIComponent(
                      `Enquiry: ${service.title}`
                    )}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#163b35] transition hover:text-emerald-800"
                  >
                    Enquire about this service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.keystoneassociate.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#163b35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24564d]"
            >
              View Keystone's Official Website
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              Industry Experience
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#163b35] sm:text-4xl">
              Supporting a range of sectors.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Keystone's profile identifies the following sectors.
              Contact the team to discuss your organisation's specific needs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry) => (
              <div
                key={industry}
                className="flex min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-semibold text-slate-700 transition hover:border-emerald-800/30 hover:bg-emerald-50/50"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership transparency */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#f1f5f3]">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#163b35]">
                <Landmark className="h-4 w-4" />
                Optimus Solutions Partnership
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#163b35] sm:text-3xl">
                Connecting you with additional business support.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Keystone Advisory and Associates is featured here as a business
                advisory partner of Optimus Solutions. Keystone's accounting,
                tax and advisory services are separate from Optimus Solutions'
                loan products and application process.
              </p>
            </div>

            <a
              href="https://www.keystoneassociate.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#163b35]/20 bg-white px-5 py-3 text-sm font-semibold text-[#163b35] transition hover:border-[#163b35] hover:bg-[#163b35] hover:text-white"
            >
              Visit Keystone
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#102d29] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                Start a Conversation
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Let's discuss your business needs.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                For enquiries about accounting, tax or business advisory
                services, contact Keystone directly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-6 sm:p-8">
              <div className="space-y-5">
                <a
                  href="mailto:davies@keystoneassociate.co.za"
                  className="flex items-start gap-4 text-sm text-slate-200 transition hover:text-emerald-200"
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <span>
                    <span className="block font-semibold text-white">Email</span>
                    <span className="mt-1 block break-all">
                      davies@keystoneassociate.co.za
                    </span>
                  </span>
                </a>

                <a
                  href="tel:+27658707068"
                  className="flex items-start gap-4 text-sm text-slate-200 transition hover:text-emerald-200"
                >
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <span>
                    <span className="block font-semibold text-white">Telephone</span>
                    <span className="mt-1 block">065 870 7068</span>
                  </span>
                </a>

                <div className="flex items-start gap-4 text-sm text-slate-200">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <span>
                    <span className="block font-semibold text-white">Location</span>
                    <span className="mt-1 block">Midrand, Gauteng, South Africa</span>
                  </span>
                </div>
              </div>

              <a
                href="https://www.keystoneassociate.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#163b35] transition hover:bg-emerald-50"
              >
                Visit keystoneassociate.co.za
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Keystone footer */}
      <footer className="border-t border-white/10 bg-[#0b211e] py-7 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-xs sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Keystone Advisory and Associates.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="https://www.keystoneassociate.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Official Website
            </a>
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Optimus Solutions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
