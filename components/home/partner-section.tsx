import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  FileCheck2,
  ShieldCheck,
  TrendingUp,
  BriefcaseBusiness,
  Receipt,
} from "lucide-react"

const services = [
  {
    icon: Calculator,
    title: "Accounting & Financial Reporting",
    description:
      "Bookkeeping, management accounts, financial statements and payroll support.",
  },
  {
    icon: FileCheck2,
    title: "Tax & SARS Services",
    description:
      "Individual and company tax, VAT, tax returns and SARS assistance.",
  },
  {
    icon: TrendingUp,
    title: "Business Advisory",
    description:
      "Financial modelling, business valuations and support for important decisions.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Administration",
    description:
      "Company secretarial support, CIPC services and compliance assistance.",
  },
]

export function PartnerSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#012a4a] text-white shadow-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10"
          />

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:p-14">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                <ShieldCheck className="h-4 w-4" />
                More Services. One Point of Contact.
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                Introducing Our Business Services
              </p>

              <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                More ways for Optimus Solutions to support you.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                Whether you need financial solutions, accounting support, tax
                assistance or business advice, Optimus Solutions offers a
                broader range of services to help you move forward.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#012a4a] transition hover:bg-blue-50"
                >
                  Explore Our Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Make an Enquiry
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-5 text-sm text-blue-200">
                Professional support for individuals, entrepreneurs and
                established businesses.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 sm:p-7">
              <div className="mb-6 border-b border-white/15 pb-5">
                <p className="text-sm font-medium text-blue-200">
                  Our Services
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  Practical support for your next step
                </h3>
              </div>

              <div className="space-y-3">
                {services.map((service) => {
                  const Icon = service.icon

                  return (
                    <Link
                      key={service.title}
                      href="/services"
                      className="group flex gap-4 rounded-xl p-3 transition hover:bg-white/10"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-100">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-white">
                          {service.title}
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-blue-100">
                          {service.description}
                        </p>
                      </div>

                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-blue-200 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  )
                })}
              </div>

              <Link
                href="/services"
                className="mt-5 flex items-center justify-between border-t border-white/15 pt-5 text-sm font-semibold text-white transition hover:text-blue-200"
              >
                View all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Existing credit-provider credentials — preserved */}
        <div className="mt-10 flex flex-col items-center justify-center gap-6 border-t border-slate-200 pt-8 sm:flex-row sm:gap-10">
          <div className="flex items-center gap-3">
            <Image
              src="/images/easydebit-logo.png"
              alt="EasyDebit"
              width={130}
              height={44}
              className="h-auto max-h-10 w-auto object-contain"
            />
          </div>

          <div className="hidden h-10 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-4">
            <Image
              src="/images/NCR LOGO.png"
              alt="National Credit Regulator"
              width={58}
              height={58}
              className="h-14 w-auto object-contain"
            />
            <div>
              <p className="font-semibold text-[#012a4a]">
                Registered Credit Provider
              </p>
              <p className="mt-1 text-sm text-slate-600">
                NCRCP23929 · Trade No. 2025/17469107
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
