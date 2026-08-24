import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | Optimus Solutions",
  description:
    "Read the Terms of Service governing use of the Optimus Solutions website and application services.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#012a4a]">
      {/* Header */}
      <header className="border-b border-[#012a4a]/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#012a4a] transition-colors hover:text-[#014f86]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Optimus Solutions
          </Link>

          <div className="hidden text-sm text-muted-foreground sm:block">
            Terms of Service
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#012a4a] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <FileText className="h-6 w-6" />
            </div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
              Legal
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              These terms explain the conditions that apply when you use the
              Optimus Solutions website and our application services.
            </p>

            <p className="mt-6 text-sm text-white/50">
              Last updated: 24 August 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="rounded-2xl border border-[#012a4a]/10 bg-white p-6 shadow-sm sm:p-10">
          {/* 1 */}
          <section>
            <h2 className="text-2xl font-semibold">
              1. About These Terms
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              These Terms of Service govern your use of the Optimus Solutions
              website and the services made available through the website.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              By using this website or submitting an application, you
              acknowledge that you have read and understood these terms.
            </p>
          </section>

          {/* 2 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              2. About Optimus Solutions
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Optimus Solutions provides loan-related application and support
              services. Information submitted through the website may be
              reviewed as part of an application assessment process.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Submission of an application does not constitute an approval,
              offer of credit or guarantee that a loan or other financial
              product will be provided.
            </p>
          </section>

          {/* 3 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              3. Applications
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              When submitting an application, you agree to provide information
              that is accurate, complete and current to the best of your
              knowledge.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You must not knowingly submit false, misleading, fraudulent or
              incomplete information.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Optimus Solutions may request additional information or
              supporting documentation where reasonably necessary to assess or
              verify an application.
            </p>
          </section>

          {/* 4 */}
          <section className="mt-12 rounded-xl border border-[#012a4a]/10 bg-[#f7f9fb] p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#012a4a]" />

              <div>
                <h2 className="text-xl font-semibold">
                  4. Personal Information
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Personal information submitted through the website will be
                  handled in accordance with our Privacy Policy and applicable
                  South African data protection requirements.
                </p>

                <Link
                  href="/privacy"
                  className="mt-4 inline-flex text-sm font-semibold text-[#014f86] hover:underline"
                >
                  Read our Privacy Policy →
                </Link>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              5. Supporting Documents
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Where supporting documents are requested, you agree to submit
              documents that belong to you or that you are legally authorised
              to provide.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Documents may be used for identity verification, application
              assessment, affordability assessment, compliance and other
              legitimate purposes connected with the requested service.
            </p>
          </section>

          {/* 6 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              6. Application Assessment
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              All applications are subject to assessment and verification.
              Submitting an application does not guarantee approval.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              An application may be declined where information cannot be
              verified, where eligibility requirements are not met, where
              documents are insufficient, or for other legitimate reasons.
            </p>
          </section>

          {/* 7 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              7. Loan Terms & Agreements
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Where an application is approved, the applicable loan amount,
              interest, fees, repayment period, repayment method and other
              contractual terms will be communicated through the relevant
              agreement or documentation.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Nothing on this website should be interpreted as replacing the
              terms of a formal agreement entered into between the relevant
              parties.
            </p>
          </section>

          {/* 8 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              8. Debit Orders & Payment Administration
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Where applicable, approved applicants may be required to complete
              formal payment or debit order documentation before repayments can
              be processed.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Consent given during the initial application process does not,
              by itself, constitute a formal debit order mandate unless the
              applicable mandate requirements have separately been completed.
            </p>
          </section>

          {/* 9 */}
          <section className="mt-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-[#012a4a]" />

              <div>
                <h2 className="text-2xl font-semibold">
                  9. Prohibited Use
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  You may not use the website to:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                  <li>Submit fraudulent or misleading information.</li>
                  <li>Impersonate another person.</li>
                  <li>Submit documents that you are not authorised to provide.</li>
                  <li>Attempt to gain unauthorised access to the website or its systems.</li>
                  <li>Interfere with the security or operation of the website.</li>
                  <li>Use the website for unlawful purposes.</li>
                  <li>Attempt to abuse, exploit or circumvent application processes.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 10 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              10. Website Availability
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We aim to keep the website available and functioning reliably.
              However, we cannot guarantee that the website will always be
              available, uninterrupted, error-free or free from security
              vulnerabilities.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Maintenance, technical failures, third-party services, network
              interruptions and circumstances outside our reasonable control
              may temporarily affect availability.
            </p>
          </section>

          {/* 11 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              11. Third-Party Services
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              The website may rely on third-party technology and service
              providers for hosting, document storage, communications,
              analytics, payment-related functionality or other technical
              services.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Your use of third-party services may also be subject to the terms
              and policies of those providers.
            </p>
          </section>

          {/* 12 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              12. Intellectual Property
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Unless otherwise stated, the content, branding, graphics,
              designs, text, logos and other materials displayed on this
              website belong to or are used by Optimus Solutions with
              appropriate permission.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You may not reproduce, modify, distribute or commercially exploit
              website content without prior written permission, except where
              permitted by applicable law.
            </p>
          </section>

          {/* 13 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              13. Disclaimer
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Information displayed on this website is provided for general
              informational and application purposes. Website content does not
              constitute a guarantee that any application will be approved or
              that any particular financial outcome will be achieved.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Applicants should carefully review all formal documentation
              provided to them before accepting any financial product or
              entering into an agreement.
            </p>
          </section>

          {/* 14 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              14. Limitation of Liability
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              To the extent permitted by applicable law, Optimus Solutions
              will not be responsible for losses arising from circumstances
              beyond its reasonable control, including technical
              interruptions, communication failures, third-party service
              failures or unauthorised events.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Nothing in these terms is intended to exclude or limit any
              liability that cannot lawfully be excluded or limited under
              applicable law.
            </p>
          </section>

          {/* 15 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              15. Changes to These Terms
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may update these Terms of Service from time to time. Updated
              terms will be published on this page and will include the date on
              which they were last updated.
            </p>
          </section>

          {/* 16 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              16. Governing Law
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              These terms are intended to be governed by and interpreted in
              accordance with the laws of the Republic of South Africa,
              subject to any mandatory rights or protections provided by
              applicable law.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 rounded-xl bg-[#012a4a] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-semibold">
              17. Contact Optimus Solutions
            </h2>

            <p className="mt-3 leading-7 text-white/75">
              If you have questions about these Terms of Service, please
              contact us using the details below.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/60" />
                <span>+27 (76) 851-3565</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/60" />

                <a
                  href="mailto:optimusolutions2@gmail.com"
                  className="transition-colors hover:text-white/70"
                >
                  optimusolutions2@gmail.com
                </a>
              </div>
            </div>

            <p className="mt-6 text-xs leading-5 text-white/50">
              Optimus Solutions
              <br />
              Trade Number: 2025/17469107
            </p>
          </section>
        </div>

        {/* Footer navigation */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Optimus Solutions. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="font-medium text-[#012a4a] hover:underline"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="font-medium text-[#012a4a] hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
