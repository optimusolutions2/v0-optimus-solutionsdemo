import { UserRound, FileSignature, Clock } from "lucide-react"

const steps = [
  {
    icon: UserRound,
    step: "1",
    title: "Enter Personal Details",
    description: "Please provide the necessary information.",
  },
  {
    icon: FileSignature,
    step: "2",
    title: "Sign Agreement",
    description:
      "An agreement will be sent to you via email that needs to be returned.",
  },
  {
    icon: Clock,
    step: "3",
    title: "Wait for Approval",
    description:
      "This process typically takes one to two days. Upon approval, the funds will be deposited into your account.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our simple 3-step process makes applying for a loan quick and easy.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              {/* Step number badge */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#012a4a] to-[#01497c]">
                <span className="text-2xl font-bold text-white">
                  {item.step}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
