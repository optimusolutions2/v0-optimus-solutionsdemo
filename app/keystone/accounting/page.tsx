
import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Accounting & Reporting | Keystone Advisory and Associates",
  description:
    "Explore bookkeeping, management accounts, annual financial statements, payroll and reporting services from Keystone Advisory and Associates.",
}

const services = [
  {
    icon: BookOpenCheck,
    title: "Bookkeeping",
    description:
      "Organised financial records based on your business transactions and bank statements.",
  },
  {
    icon: BarChart3,
    title: "Management Accounts",
    description:
      "Financial information that helps you understand performance and make informed business decisions.",
  },
  {
    icon: FileText,
    title: "Annual Financial Statements",
    description:
      "Preparation of annual financial statements under IFRS for SMEs or full IFRS, as appropriate to the engagement.",
  },
  {
    icon: CheckCircle2,
    title: "Independent Reviews",
    description:
      "Independent review services where applicable to your organisation and reporting requirements.",
  },
  {
    icon: BookOpenCheck,
    title: "NPO & NPC Reporting",
    description:
      "Financial reporting support for non-profit organisations and non-profit companies.",
  },
  {
    icon: BarChart3,
    title: "Payroll",
    description:
      "Payroll support to help keep employee-related financial administration organised.",
  },
]

const benefits = [
  "A clear view of your financial position",
  "Organised records for reporting and decision-making",
  "Support tailored to your organisation's needs",
  "One point of contact for your engagement",
]

export default function KeystoneAccountingPage() {
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
              Keystone services
            </Link>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">
              Accounting & Reporting
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Know your numbers.
              <span className="block text-blue-200">
                Make informed decisions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Build a clearer picture of your organisation's finances with
              accounting and reporting support from Keystone Advisory and
              Associates.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:davies@keystoneassociate.co.za?subject=Accounting%20and%20Reporting%20Enquiry"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#012a4a] transition hover:bg-slate-100"
              >
                Discuss your requirements
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
              A practical financial foundation
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-snug">
              Better records. Clearer reporting. Greater visibility.
            </h2>
            <div className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />
                  <p className="text-sm leading-6 text-slate-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#012a4a]">
            What we cover
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#012a4a] sm:text-4xl">
            Accounting support for your organisation
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            From day-to-day bookkeeping to annual reporting, the right
            accounting support helps keep financial information organised and
            useful.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <article
                key={service.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#012a4a]/30 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#012a4a]/[0.07] text-[#012a4a] transition group-hover:bg-[#012a4a] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-xs font-semibold tracking-widest text-slate-400">
                  0{index + 1}
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
              A considered approach
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#012a4a] sm:text-4xl">
              Accounting that fits your needs
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Every organisation has different reporting responsibilities and
              financial priorities. Start with a conversation about your
              current position, your requirements and the support you need.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h3 className="text-xl font-semibold text-[#012a4a]">
              Speak to Keystone
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Contact the team to discuss the accounting and reporting support
              appropriate for your organisation.
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
              href="mailto:davies@keystoneassociate.co.za?subject=Accounting%20and%20Reporting%20Enquiry"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#012a4a] px-5 py-3 font-semibold text-white transition hover:bg-[#001d36]"
            >
              Make an enquiry
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl bg-[#012a4a] p-8 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-200">
              Keystone Advisory and Associates
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Start with a conversation.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
              Discuss your accounting and reporting requirements directly with
              Keystone.
            </p>
          </div>
          <a
            href="mailto:davies@keystoneassociate.co.za?subject=Accounting%20and%20Reporting%20Enquiry"
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
              href="/"
              className="text-slate-300 transition hover:text-white"
            >
              Optimus Solutions
            </Link>
            <a
              href="https://www.keystoneassociate.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition hover:text-white"
            >
              Keystone website
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
