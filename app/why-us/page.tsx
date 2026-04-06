import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Shield,
  FileText,
  HeadphonesIcon,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Why Choose Us - Optimus Solutions",
  description:
    "Discover why thousands of South Africans choose Optimus Solutions for fast approvals, transparent terms, and personalized support.",
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

const benefits = [
  {
    icon: Zap,
    title: "Fast Approvals",
    description:
      "Get a decision within 24-48 hours. Our streamlined process means less waiting and faster access to the funds you need.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "Your data is protected with industry-standard encryption. We take your privacy and security seriously.",
  },
  {
    icon: FileText,
    title: "Transparent Terms",
    description:
      "No hidden fees or surprise charges. We clearly communicate all terms and conditions upfront.",
  },
  {
    icon: HeadphonesIcon,
    title: "Personalized Support",
    description:
      "Our dedicated team is here to guide you through every step of your loan journey with care and attention.",
  },
  {
    icon: Globe,
    title: "100% Online Process",
    description:
      "Apply from anywhere, anytime. Our fully digital application process means no paperwork or branch visits required.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description:
      "Join the growing community of South Africans who have chosen Optimus Solutions for their financial needs.",
  },
]

const trustPoints = [
  "Quick and simple online application",
  "Transparent interest rates and fees",
  "Flexible repayment options",
  "No collateral required for personal loans",
  "Dedicated customer support team",
  "Fast fund disbursement upon approval",
]

export default function WhyUsPage() {
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
                  Why Choose Optimus Solutions?
                </h1>
              </FadeInSection>
              <FadeInSection delay={100}>
                <p className="mt-6 text-pretty text-lg text-white/80 md:text-xl">
                  Smart, secure, and fast loan solutions tailored for you.
                </p>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="mb-12 text-center">
                <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
                  The Optimus Advantage
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  We&apos;ve designed every aspect of our service with your
                  needs in mind.
                </p>
              </div>
            </FadeInSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <FadeInSection key={benefit.title} delay={100 + index * 50}>
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#012a4a] to-[#01497c] transition-transform duration-300 group-hover:scale-110">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <FadeInSection>
                <div>
                  <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
                    Why Customers Choose Us
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    At Optimus Solutions, we understand that taking out a loan
                    is a significant decision. That&apos;s why we&apos;ve built
                    a service focused on speed, transparency, convenience, and
                    genuine support.
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Our commitment is to make the lending process as smooth and
                    stress-free as possible, so you can focus on what matters
                    most to you.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={200}>
                <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border/50">
                  <h3 className="mb-6 text-lg font-semibold text-foreground">
                    What We Offer
                  </h3>
                  <ul className="space-y-4">
                    {trustPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#012a4a]/10">
                          <CheckCircle className="h-3.5 w-3.5 text-[#012a4a]" />
                        </div>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
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
                  Ready to Get Started?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Apply now and experience the Optimus Solutions difference.
                  Fast, secure, and designed with you in mind.
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
