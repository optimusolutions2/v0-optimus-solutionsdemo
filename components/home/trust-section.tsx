import { Shield, HeartHandshake, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const trustItems = [
  {
    icon: Shield,
    title: "A Trusted Loan Service",
    description:
      "We are a registered and compliant financial services provider committed to responsible lending.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Support 24/7",
    description:
      "Our dedicated team is available around the clock to assist you with any questions or concerns.",
  },
  {
    icon: Clock,
    title: "Fast Approval, Flexible Terms",
    description:
      "Get approved quickly with repayment terms that work for your budget and lifestyle.",
  },
]

export function TrustSection() {
  return (
    <section className="bg-background py-16 md:py-20" id="why-us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {trustItems.map((item) => (
            <Card
              key={item.title}
              className="border-0 bg-card shadow-md transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#012a4a]/10">
                  <item.icon className="h-6 w-6 text-[#012a4a]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
