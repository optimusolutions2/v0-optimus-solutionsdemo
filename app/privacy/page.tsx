import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  FileText,
  Mail,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Optimus Solutions",
  description:
    "Learn how Optimus Solutions collects, uses, protects and processes personal information in accordance with applicable South African privacy laws.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#012a4a] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
              Legal & Privacy
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Optimus Solutions respects your privacy and is committed to
              protecting the personal information you provide when using our
              website and applying for our services.
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
          {/* Intro */}
          <section>
            <h2 className="text-2xl font-semibold">
              1. Introduction
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              This Privacy Policy explains how Optimus Solutions collects,
              uses, stores, protects and otherwise processes personal
              information when you visit our website, communicate with us or
              submit an application for our services.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We recognise that information such as your identity number,
              financial information and supporting documents is highly
              sensitive. We therefore take reasonable steps to protect the
              information entrusted to us and to process it only for
              legitimate and relevant purposes.
            </p>
          </section>

          {/* Information */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              2. Information We Collect
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Depending on the service you request, we may collect information
              including:
            </p>

            <ul className="mt-5 space-y-3 text-gray-600">
              <li>
                <strong className="text-gray-800">
                  Personal information:
                </strong>{" "}
                full name, identity number and other identifying information.
              </li>

              <li>
                <strong className="text-gray-800">
                  Contact information:
                </strong>{" "}
                telephone number, email address and other contact details.
              </li>

              <li>
                <strong className="text-gray-800">
                  Financial information:
                </strong>{" "}
                requested loan amount, monthly income, employment information
                and information relevant to assessing an application.
              </li>

              <li>
                <strong className="text-gray-800">
                  Supporting documents:
                </strong>{" "}
                identity documents, bank statements, proof of address,
                payslips and other documents required for application
                assessment or verification.
              </li>

              <li>
                <strong className="text-gray-800">
                  Communications:
                </strong>{" "}
                information you provide when communicating with us by email,
                telephone, WhatsApp or other supported channels.
              </li>

              <li>
                <strong className="text-gray-800">
                  Technical information:
                </strong>{" "}
                certain information about your device, browser and interaction
                with our website may be collected automatically for security,
                performance and website improvement purposes.
              </li>
            </ul>
          </section>

          {/* Purpose */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              3. How We Use Your Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may use personal information for purposes including:
            </p>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-600">
              <li>Receiving and processing applications.</li>
              <li>Verifying identity and supporting information.</li>
              <li>Assessing applications and eligibility.</li>
              <li>Communicating with applicants.</li>
              <li>Providing requested services.</li>
              <li>Processing or administering approved transactions.</li>
              <li>Preventing fraud, misuse and unlawful activity.</li>
              <li>Maintaining records required for legitimate business or legal purposes.</li>
              <li>Improving the security and functionality of our website.</li>
              <li>Complying with applicable legal and regulatory obligations.</li>
            </ul>
          </section>

          {/* Documents */}
          <section className="mt-12 rounded-xl border border-[#012a4a]/10 bg-[#f7f9fb] p-6">
            <div className="flex items-start gap-4">
              <FileText className="mt-1 h-6 w-6 shrink-0 text-[#012a4a]" />

              <div>
                <h2 className="text-xl font-semibold">
                  4. Financial & Supporting Documents
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Documents submitted through our application process may
                  contain highly confidential information. These documents are
                  used for application assessment, identity verification,
                  affordability assessment, compliance and related legitimate
                  business purposes.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  Access to these documents is restricted to persons or service
                  providers who require the information for authorised
                  purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Sharing */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              5. Sharing of Personal Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We do not sell your personal information.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Where necessary, information may be shared with authorised
              employees, professional advisers, technology providers,
              verification providers, payment or banking-related service
              providers, regulators, law-enforcement authorities or other
              parties where disclosure is reasonably necessary for a legitimate
              purpose or required by law.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Where third-party service providers process information on our
              behalf, we seek to use appropriate contractual, technical and
              organisational safeguards.
            </p>
          </section>

          {/* Security */}
          <section className="mt-12">
            <div className="flex items-start gap-4">
              <Lock className="mt-1 h-6 w-6 shrink-0 text-[#012a4a]" />

              <div>
                <h2 className="text-2xl font-semibold">
                  6. Security of Your Information
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  We take reasonable technical and organisational measures to
                  protect personal information against unauthorised access,
                  loss, misuse, alteration or disclosure.
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                  However, no method of transmitting or storing information
                  electronically can be guaranteed to be completely secure.
                  Users should therefore also take reasonable steps to protect
                  their own devices, accounts and communications.
                </p>
              </div>
            </div>
          </section>

          {/* Retention */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              7. Retention of Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We retain personal information only for as long as reasonably
              necessary for the purposes for which it was collected, to
              establish or defend legal claims, to comply with applicable
              legal and regulatory requirements, or for other legitimate
              purposes.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Retention periods may differ depending on the type of
              information and the nature of the service or transaction.
            </p>
          </section>

          {/* Rights */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              8. Your Privacy Rights
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Subject to applicable law, you may have rights relating to your
              personal information, including the right to request access to
              information we hold about you, request correction of inaccurate
              information, and object to certain processing.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              These rights are subject to applicable legal limitations and
              requirements. The South African Information Regulator is
              responsible for promoting and protecting privacy rights under
              POPIA.
            </p>
          </section>

          {/* Cookies */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              9. Cookies & Website Technologies
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our website may use cookies or similar technologies to support
              functionality, security, analytics and website performance.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You may configure your browser to restrict or block certain
              cookies. Some website functionality may be affected as a result.
            </p>
          </section>

          {/* Third party */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              10. Third-Party Websites & Services
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our website may contain links to third-party websites or use
              third-party services. Optimus Solutions is not responsible for
              the privacy practices of independent third parties. We recommend
              reviewing their privacy policies before submitting personal
              information to them.
            </p>
          </section>

          {/* Children */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              11. Children's Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our services are not intended to be used by children without
              appropriate legal authority or consent. We do not knowingly
              collect personal information from children for purposes that are
              not permitted by applicable law.
            </p>
          </section>

          {/* Changes */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              12. Changes to This Privacy Policy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may update this Privacy Policy from time to time to reflect
              changes in our services, technology, legal requirements or
              business practices. The updated version will be published on
              this page together with the relevant update date.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 rounded-xl bg-[#012a4a] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-semibold">
              13. Contact Us
            </h2>

            <p className="mt-3 leading-7 text-white/75">
              If you have questions about this Privacy Policy or wish to
              enquire about the personal information we hold about you, please
              contact Optimus Solutions.
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
