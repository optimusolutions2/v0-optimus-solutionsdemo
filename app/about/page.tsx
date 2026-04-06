import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Target,
  Eye,
  Zap,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Optimus Solutions",
  description:
    "Learn about Optimus Solutions - a forward-thinking financial services provider offering fast, secure, and transparent loan solutions.",
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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#012a4a] via-[#013a63] to-[#01497c] py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <FadeInSection>
                <h1 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  About Optimus Solutions
                </h1>
              </FadeInSection>
              <FadeInSection delay={100}>
                <p className="mt-6 text-pretty text-lg text-white/80 md:text-xl">
                  A forward-thinking financial services provider, offering fast,
                  secure, and transparent loan solutions for individuals and
                  businesses across South Africa.
                </p>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <FadeInSection delay={200}>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  At Optimus Solutions, we believe that everyone deserves access
                  to fair, transparent financial services. Our digital-first,
                  customer-centric approach means you get the support you need,
                  when you need it, without the hassle of traditional lending
                  processes.
                </p>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <FadeInSection delay={100}>
                <div className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg md:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#012a4a]/10 transition-transform duration-300 group-hover:scale-110">
                    <Target className="h-7 w-7 text-[#012a4a]" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    Our Mission
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    To make financial access simple, efficient, and stress-free.
                    We are committed to providing fast approvals, transparent
                    terms, and personalized support that puts your needs first.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={200}>
                <div className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg md:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#012a4a]/10 transition-transform duration-300 group-hover:scale-110">
                    <Eye className="h-7 w-7 text-[#012a4a]" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    Our Vision
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Breaking down financial barriers and making opportunity more
                    accessible for all South Africans. We envision a future
                    where financial support is just a few clicks away.
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Why We're Different */}
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="mb-12 text-center">
                <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
                  Why We&apos;re Different
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  We&apos;ve built our service around what matters most to you.
                </p>
              </div>
            </FadeInSection>

            <div className="grid gap-8 md:grid-cols-3">
              <FadeInSection delay={100}>
                <div className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#012a4a] to-[#01497c] transition-transform duration-300 group-hover:scale-110">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Speed &amp; Simplicity
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Our streamlined online process means you can apply in
                    minutes and receive a decision within 24-48 hours. No
                    complicated paperwork, no unnecessary delays.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={200}>
                <div className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#012a4a] to-[#01497c] transition-transform duration-300 group-hover:scale-110">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Transparency
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    No hidden fees, no surprise charges. We believe in clear,
                    honest communication about all terms and conditions so you
                    can make informed decisions.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={300}>
                <div className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#012a4a] to-[#01497c] transition-transform duration-300 group-hover:scale-110">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Human Support
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Behind our technology is a dedicated team ready to assist
                    you. We provide personalized support throughout your loan
                    journey.
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[#012a4a] via-[#013a63] to-[#01497c] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
                  Join the People Who Trust Us
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Thousands of South Africans have chosen Optimus Solutions for
                  their financial needs. Experience the difference today.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white px-8 text-[#012a4a] shadow-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 sm:w-auto"
                  >
                    <Link href="/apply">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-white/30 bg-transparent text-white transition-all duration-300 hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
