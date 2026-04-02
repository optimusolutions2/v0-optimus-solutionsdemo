import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#012a4a] via-[#013a63] to-[#01497c] py-16 md:py-24">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Fast &amp; Reliable Loan Solutions
            </h1>
            <p className="mt-6 text-pretty text-lg text-white/80 md:text-xl">
              Get approved within 24-48 hours with flexible terms tailored to
              your needs.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="w-full bg-white px-8 text-[#012a4a] shadow-lg hover:bg-white/90 sm:w-auto"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-support.jpg"
                alt="Professional financial consultant ready to help with your loan application"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
