
import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  FileCheck2,
  Landmark,
  Mail,
  Phone,
  Scale,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Business Advisory | Keystone Advisory and Associates",
  description:
    "Explore business advisory, financial modelling, valuations, due diligence, outsourced CFO, business rescue and company secretarial support.",
}

const services = [
  {
    number: "01",
    icon: ChartNoAxesCombined,
    title: "Valuations & Financial Models",
    description:
      "Financial modelling and valuation support to help assess business performance, explore scenarios and inform strategic decisions.",
  },
  {
    number: "02",
    icon: Scale,
    title: "Transactions & Due Diligence",
    description:
      "Support with transaction assessments, due diligence and deal structuring, tailored to the scope of the engagement.",
  },
  {
    number: "03",
    icon: BriefcaseBusiness,
    title: "Business Rescue Support",
    description:
      "Financial and advisory support for businesses facing challenges and evaluating available options.",
  },
  {
    number: "04",
    icon: Building2,
    title: "Outsourced CFO",
    description:
      "Access financial leadership support for planning, reporting, performance monitoring and business decision-making.",
  },
  {
    number: "05",
    icon: FileCheck2,
    title: "Company Secretarial & CIPC",
    description:
      "Assistance with company secretarial matters and relevant CIPC filings and administration.",
  },
  {
    number: "06",
    icon: Landmark,
    title: "Confirmations & Certificates",
    description:
      "Assistance with relevant financial confirmations and certificates, subject to the applicable requirements and scope.",
  },
]

const approach = [
  "Understand your business and its current position",
  "Clarify your objectives and immediate challenges",
  "Determine the appropriate scope of support",
  "Discuss practical next steps with Keystone",
]

export default function KeystoneAdvisoryPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/keystone" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#012a4a] text-xl font-bold text-white">
              K
            </span>
            <span>
              <span className="block font-semibold tracking-tight text-[#012a4a]">
                Keystone Advisory
              </span>
              <span className="block text-xs text-slate-500">
                and Associates
              </span>
            </span>
          </Link>

          <Link
            href="/keystone"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#012a4a] transition hover:text-slate-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Keystone
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#012a4a] text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-28">
          <div>
            <Link
              href="/keystone"
              className="mb-8 inline-flex items-center gap-2 text-sm text-blue-100 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Keystone services
            </Link>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">
              Business Advisory
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Make your next move
              <span className="block text-blue-200">
                with greater clarity.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              From financial modelling and transaction support to outsourced
              CFO services, Keystone Advisory and Associates helps businesses
              assess their position and consider their next steps.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:davies@keystoneassociate.co.za?subject=Business%20Advisory%20Enquiry"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#012a4a] transition hover:bg-slate-100"
              >
                Discuss your business
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="https://www.keystoneassociate.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Official website
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm sm:p-9">
            <p className="text-sm font-medium text-blue-200">
              Strategic financial support
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-snug">
              Practical insight for important business decisions.
            </h2>
            <div className="mt-7 space-y-4">
              {approach.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#012a4a]">
            Advisory services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#012a4a] sm:text-4xl">
            Support for complex business decisions
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            The right support depends on your objectives, circumstances and
            the nature of the engagement. Explore the areas in which Keystone
            may be able to assist.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <article
                key={service.number}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#012a4a]/30 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#012a4a]/[0.07] text-[#012a4a] transition group-hover:bg-[#012a4a] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-xs font-semibold tracking-widest text-slate-400">
                  {service.number}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#012a4a]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#012a4a]">
              Who we support
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#012a4a] sm:text-4xl">
              Advice grounded in your industry
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Keystone identifies the following sectors among the industries
              it serves. Contact the team to discuss your specific business
              and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Hospitality",
              "Construction & Engineering",
              "Agriculture",
              "Mining",
              "NPOs & NPCs",
              "Financial Services",
            ].map((industry) => (
              <div
                key={industry}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <span className="h-2 w-2 rounded-full bg-[#012a4a]" />
                <span className="text-sm font-medium text-slate-700">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#012a4a]">
              Let's talk
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#012a4a] sm:text-4xl">
              Tell Keystone what you are working towards.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Share your business objectives or the challenge you are
              navigating. Keystone can discuss the relevant services and
              whether they fit your needs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-xl font-semibold text-[#012a4a]">
              Contact Keystone directly
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              For business advisory, valuations, transaction support or
              outsourced CFO enquiries, get in touch with the team.
            </p>

            <div className="mt-7 space-y-4">
              <a
                href="mailto:davies@keystoneassociate.co.za"
                className="flex items-center gap-3 text-sm font-medium text-slate-700 transition hover:text-[#012a4a]"
              >
                <Mail className="h-5 w-5 text-[#012a4a]" />
                davies@keystoneassociate.co.za
              </a>
              <a
                href="tel:+27658707068"
                className="flex items-center gap-3 text-sm font-medium text-slate-700 transition hover:text-[#012a4a]"
              >
                <Phone className="h-5 w-5 text-[#012a4a]" />
                065 870 7068
              </a>
            </div>

            <a
              href="mailto:davies@keystoneassociate.co.za?subject=Business%20Advisory%20Enquiry"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#012a4a] px-5 py-3 font-semibold text-white transition hover:bg-[#001d36]"
            >
              Make an enquiry
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-14 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl bg-[#012a4a] p-8 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-200">
              Keystone Advisory and Associates
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Turn your questions into a conversation.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
              Contact Keystone to discuss your business advisory requirements.
            </p>
          </div>
          <a
            href="mailto:davies@keystoneassociate.co.za?subject=Business%20Advisory%20Enquiry"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#012a4a] transition hover:bg-slate-100"
          >
            Contact Keystone
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="bg-[#001d36] px-5 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-300">
            © {new Date().getFullYear()} Keystone Advisory and Associates.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="/keystone"
              className="text-slate-300 transition hover:text-white"
            >
              Keystone overview
            </Link>
            <Link
              href="/keystone/accounting"
              className="text-slate-300 transition hover:text-white"
            >
              Accounting & Reporting
            </Link>
            <Link
              href="/keystone/tax"
              className="text-slate-300 transition hover:text-white"
            >
              Tax & SARS Services
            </Link>
            <Link
              href="/"
              className="text-slate-300 transition hover:text-white"
            >
              Optimus Solutions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
