import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Optimus Solutions",
  description:
    "Get in touch with Optimus Solutions. We're here to help with your loan inquiries and support needs.",
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
    title: "Email",
    content: "optimusolutions2@gmail.com",
    href: "mailto:optimusolutions2@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+27 (72) 960-3512",
    href: "tel:+27729603512",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#012a4a] via-[#013a63] to-[#01497c] py-20 md:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <FadeInSection>
                <h1 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  Contact Optimus Solutions
                </h1>
              </FadeInSection>
              <FadeInSection delay={100}>
                <p className="mt-6 text-pretty text-lg text-white/80 md:text-xl">
                  Have questions or need assistance? Our team is here to help
                  you every step of the way.
                </p>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {contactInfo.map((item, index) => (
                <FadeInSection key={item.title} delay={100 + index * 50}>
                  <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#012a4a] to-[#01497c] transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground transition-colors hover:text-[#012a4a]"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Form */}
              <FadeInSection className="lg:col-span-3">
                <ContactForm />
              </FadeInSection>

              {/* Side Info */}
              <FadeInSection delay={200} className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Response Time */}
                  <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border/50">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#012a4a]/10">
                      <Clock className="h-6 w-6 text-[#012a4a]" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Response Time
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      We aim to respond to all inquiries within 1-2 business
                      days. For urgent matters, please call us directly.
                    </p>
                  </div>

                  {/* Contact Details Repeat */}
                  <div className="rounded-2xl bg-gradient-to-br from-[#012a4a] to-[#01497c] p-6 text-white">
                    <h3 className="mb-4 text-lg font-semibold">Get in Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                      
                       
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                        <a
                          href="mailto:optimusolutions2@gmail.com"
                          className="text-sm text-white/90 transition-colors hover:text-white"
                        >
                          optimusolutions2@gmail.com
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                        <a
                          href="tel:+27729603512"
                          className="text-sm text-white/90 transition-colors hover:text-white"
                        >
                          +27 (72) 960-3512
                        </a>
                      </div>
                    </div>
                  </div>
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
