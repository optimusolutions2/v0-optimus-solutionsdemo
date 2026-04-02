import {
  Zap,
  CheckCircle,
  CalendarClock,
  ShieldCheck,
  Eye,
  Headphones,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Zap,
    title: "Quick Application",
    description: "Complete your application in just a few minutes online.",
  },
  {
    icon: CheckCircle,
    title: "Fast Approval",
    description: "Get a decision within 24-48 hours of submitting.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Repayment",
    description: "Choose repayment terms that suit your budget.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Your personal information is protected with encryption.",
  },
  {
    icon: Eye,
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Our team is here to help you every step of the way.",
  },
]

export function BenefitsSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Why Choose Optimus Solutions?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We make borrowing simple, transparent, and stress-free.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="border-0 bg-card shadow-md transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#012a4a]/10">
                  <benefit.icon className="h-5 w-5 text-[#012a4a]" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
