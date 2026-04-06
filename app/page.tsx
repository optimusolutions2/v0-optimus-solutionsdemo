import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { TrustSection } from "@/components/home/trust-section"
import { PartnerSection } from "@/components/home/partner-section"
import { RequirementsSection } from "@/components/home/requirements-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { LoanInfoSection } from "@/components/home/loan-info-section"
import { FAQSection } from "@/components/home/faq-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <PartnerSection />
        <RequirementsSection />
        <HowItWorksSection />
        <BenefitsSection />
        <LoanInfoSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
