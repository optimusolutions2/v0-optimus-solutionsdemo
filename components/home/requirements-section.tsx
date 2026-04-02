import { IdCard, FileText, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const requirements = [
  {
    icon: IdCard,
    title: "Valid SA ID Document",
    description: "South African green barcoded ID or smart card",
  },
  {
    icon: FileText,
    title: "Latest 3 Months Bank Statements",
    description: "These must have a bank stamp",
  },
  {
    icon: Phone,
    title: "Valid Contact Information",
    description: "Valid email address and cellphone number",
  },
]

export function RequirementsSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            What Do You Need To Apply?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ensure you have the following documents ready for a smooth
            application process.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {requirements.map((req) => (
            <Card
              key={req.title}
              className="border-0 bg-card shadow-md transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#012a4a]">
                  <req.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {req.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {req.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
