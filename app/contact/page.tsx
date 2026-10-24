        
import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import {
  Mail,
  Phone,
  Clock,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  FileText,
  Headphones,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Optimus Solutions",
  description:
    "Contact Optimus Solutions for loan enquiries, application support, and general assistance.",
}

function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div
      className={`animate-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  )
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email our team",
    content: "info@optimussolutions.co.za",
    href: "mailto:info@optimussolutions.co.za",
    description: "Send us your questions anytime.",
  },
  {
    icon: Phone,
    title: "Call us directly",
    content: "+27 (72) 960-3512",
    href: "tel:+27729603512",
    description: "Speak to our team for assistance.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#012a4a] via-[#012f50] to-[#001d36] py-16 md:py-24">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-slate-300/[0.06] blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInSection className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-200">
                <MessageCircle className="h-4 w-4" />
                We're here to help
              </span>

              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Let's talk about
                <span className="block text-slate-300">
                  how we can help.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 md:text-lg">
                Have a question about our services or need help with an
                application? Choose the option that suits you and we'll help
                you find the right next step.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Quick routes */}
        <section className="relative z-10 -mt-6">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <FadeInSection delay={100}>
              <Link
                href="/apply"
                className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#012a4a] text-white">
                  <FileText className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#012a4a]">
                    Looking for a loan?
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Continue to our loan application page.
                  </p>
                </div>

                <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#012a4a]" />
              </Link>
            </FadeInSection>

            <FadeInSection delay={150}>
              <a
                href="#contact-form"
                className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#012a4a]">
                  <Headphones className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#012a4a]">
                    Have another question?
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Send our team a general enquiry.
                  </p>
                </div>

                <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#012a4a]" />
              </a>
            </FadeInSection>
          </div>
        </section>

        {/* Contact details */}
        <section className="bg-white py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-2">
              {contactInfo.map((item, index) => (
                <FadeInSection key={item.title} delay={100 + index * 75}>
                  <a
                    href={item.href}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 sm:p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#012a4a] transition-colors group-hover:bg-[#012a4a] group-hover:text-white">
                      <item.icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-[#012a4a]">
                        {item.title}
                      </h2>
                      <p className="mt-1 break-words text-sm font-medium text-slate-700">
                        {item.content}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
                  </a>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry form */}
        <section
          id="contact-form"
          className="scroll-mt-24 bg-slate-50 py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
              <FadeInSection className="lg:col-span-3">
                <div className="mb-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Contact our team
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#012a4a] md:text-4xl">
                    How can we help you?
                  </h2>
                  <p className="mt-4 max-w-xl leading-7 text-slate-600">
                    Complete the form below and tell us what you need. We'll
                    use your details to respond to your enquiry.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <ContactForm />
                </div>
              </FadeInSection>

              <FadeInSection delay={150} className="lg:col-span-2">
                <div className="space-y-5 lg:pt-10">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#012a4a]">
                      <Clock className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-[#012a4a]">
                      When will we respond?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      We aim to respond to enquiries within 1–2 business days.
                      If your matter is urgent, please call us directly.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#012a4a] p-6 text-white sm:p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <ShieldCheck className="h-5 w-5 text-slate-200" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      A simpler way to get started
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Ready to apply? Use our dedicated application page
                      instead of submitting a general enquiry.
                    </p>

                    <Link
                      href="/apply"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-3 text-sm font-semibold text-[#012a4a] transition-colors hover:bg-white"
                    >
                      Go to loan application
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <p className="px-1 text-xs leading-5 text-slate-500">
                    Please don't include passwords, PINs, or other sensitive
                    account credentials in a general enquiry.
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

