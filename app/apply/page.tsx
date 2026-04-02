import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ApplicationForm } from "@/components/application-form"

export const metadata: Metadata = {
  title: "Apply for a Loan - Optimus Solutions",
  description:
    "Apply for a personal, business, or payday loan with Optimus Solutions. Fast approval within 24-48 hours.",
}

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#012a4a] via-[#013a63] to-[#01497c] py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Apply</span>
            </nav>

            <h1 className="text-balance text-3xl font-bold text-white md:text-4xl">
              Loan Application
            </h1>
            <p className="mt-3 max-w-2xl text-white/80">
              Complete the form below to apply for your loan. Our team will
              review your application and get back to you within 24-48 hours.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-background py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Form */}
              <div className="lg:col-span-2">
                <ApplicationForm />

              {/* Additional Info */}
              <div className="mt-8 rounded-lg bg-muted/50 p-6">
                <h3 className="mb-3 font-semibold text-foreground">
                  What happens next?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#012a4a]" />
                    Our team will review your application within 24-48 hours.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#012a4a]" />
                    If approved, you will receive a loan agreement via email.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#012a4a]" />
                    Sign and return the agreement to complete the process.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#012a4a]" />
                    Funds will be deposited into your account after approval.
                  </li>
                </ul>
              </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trust Badge */}
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#012a4a]/10">
                    <Shield className="h-6 w-6 text-[#012a4a]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    Your Information is Secure
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with industry-grade encryption. We
                    will only use your information for your loan application.
                  </p>
                </div>

                {/* Image */}
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl lg:block">
                  <Image
                    src="/images/approval.jpg"
                    alt="Happy customers after loan approval"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Contact Info */}
                <div className="rounded-xl bg-[#012a4a] p-6 text-white">
                  <h3 className="mb-2 font-semibold">Need Help?</h3>
                  <p className="mb-4 text-sm text-white/80">
                    Our team is available to assist you with your application.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-white/60">Email:</span>{" "}
                      info@optimussolutions.co.za
                    </p>
                    <p>
                      <span className="text-white/60">Phone:</span> 012 345 6789
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
