
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
    "Read the Terms of Service governing use of the Optimus Solutions website, loan applications and other services.",
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
              Optimus Solutions website, submit an application or access our
              services.
            </p>

            <p className="mt-6 text-sm text-white/50">
              Last updated: 28 October 2026
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
              These Terms of Service govern your access to and use of the
              Optimus Solutions website, online application forms and services
              made available through the website.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              By accessing the website, you agree to use it lawfully and in
              accordance with these terms. Submitting an application does not,
              by itself, create a loan agreement or guarantee that a service
              will be provided.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If you do not agree with these terms, please discontinue use of
              the website. Any rights that cannot lawfully be waived remain
              unaffected.
            </p>
          </section>

          {/* 2 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              2. About Optimus Solutions
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Optimus Solutions provides loan-related application and support
              services. The website may be used to submit information for
              consideration as part of an application and assessment process.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              The information displayed on the website is provided to explain
              our services and application process. The specific services
              available to an applicant depend on the applicable requirements,
              assessment and formal documentation.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Nothing on this website should be interpreted as a guarantee of
              credit approval or as confirmation that a particular financial
              product is available to every applicant.
            </p>
          </section>

          {/* 3 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              3. Applications and Information Provided
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              When submitting an application, you agree to provide information
              that is accurate, complete and current to the best of your
              knowledge.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You must not knowingly submit false, misleading, altered or
              fraudulent information, or omit material information where doing
              so would make your application misleading.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You are responsible for reviewing the details you submit and
              notifying us if information relevant to your application
              changes or you discover an error.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We may request additional information or supporting documents
              where reasonably necessary to assess, verify or administer an
              application, subject to applicable law.
            </p>
          </section>

          {/* 4 */}
          <section className="mt-12 rounded-xl border border-[#012a4a]/10 bg-[#f7f9fb] p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#012a4a]" />

              <div>
                <h2 className="text-xl font-semibold">
                  4. Personal Information and Privacy
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Personal information submitted through the website may be
                  processed for purposes connected with your application,
                  identity verification, communications, service delivery,
                  security and applicable legal obligations.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  Personal information will be handled in accordance with our
                  Privacy Policy and applicable South African data protection
                  law. Access to and processing of information remain subject
                  to applicable legal requirements.
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
              Where supporting documents are requested, you must submit
              genuine documents that belong to you or that you are legally
              authorised to provide.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Depending on the application, documents may include identity
              documents, bank statements, proof of address, payslips or other
              relevant records.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Documents may be used to verify information and assess an
              application, subject to the purposes explained in our Privacy
              Policy and applicable law. Do not submit another person's
              personal information without appropriate authority.
            </p>
          </section>

          {/* 6 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              6. Application Assessment and Decisions
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              All applications are subject to the applicable assessment and
              verification process. Submission of an application does not
              guarantee approval, a particular loan amount or a specific
              approval time.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              An application may be delayed, declined or require further
              information where details cannot be verified, eligibility
              requirements are not met, documentation is insufficient or
              another legitimate reason applies.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Any preliminary indication or communication about an application
              is not a final offer unless it is expressly issued as such by an
              authorised party.
            </p>
          </section>

          {/* 7 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              7. Loan Terms and Formal Agreements
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If an application is approved, the applicable loan amount,
              interest rate, fees, repayment schedule, repayment method and
              other material terms will be set out in the relevant formal
              agreement and disclosures.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You should read and understand all applicable documentation
              before accepting a loan or other financial product. If anything
              is unclear, request clarification before signing or accepting
              the agreement.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              The formal agreement, together with any applicable disclosures,
              governs the relevant transaction. These website terms do not
              replace or override mandatory consumer protections or the
              specific terms of a valid agreement.
            </p>
          </section>

          {/* 8 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              8. Debit Orders and Repayments
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Where applicable, repayment arrangements may require separate
              payment instructions, debit-order documentation or a formal
              mandate completed in accordance with the relevant requirements.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              A checkbox, declaration or expression of interest provided
              during an initial application does not, on its own, replace a
              formal debit-order mandate where a separate mandate is required.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Repayment amounts, dates and authorised collection methods will
              be governed by the applicable loan agreement and valid payment
              authorisation. Applicants should check these details before
              agreeing to a repayment arrangement.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Any payment collection, debit-order processing or administration
              must be carried out in accordance with applicable law and the
              relevant authorisation.
            </p>
          </section>

          {/* 9 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              9. Fees, Interest and Costs
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Any interest, fees, charges or other costs applicable to a loan
              must be disclosed in the relevant documentation, as required by
              applicable law.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Do not rely solely on general website information when
              determining the total cost of credit or the amount payable.
              Review the formal agreement and applicable pre-agreement
              disclosures before accepting an offer.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Applicable consumer credit protections and statutory limits
              remain in force and are not excluded by these terms.
            </p>
          </section>

          {/* 10 */}
          <section className="mt-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-[#012a4a]" />

              <div>
                <h2 className="text-2xl font-semibold">
                  10. Prohibited Use
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  You may not use the website to:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                  <li>Submit fraudulent, false or misleading information.</li>
                  <li>Impersonate another person or misrepresent your identity.</li>
                  <li>Submit documents you are not authorised to provide.</li>
                  <li>Attempt to gain unauthorised access to the website, accounts or systems.</li>
                  <li>Introduce malicious code or interfere with website security.</li>
                  <li>Scrape, copy or misuse website information unlawfully.</li>
                  <li>Interfere with the website or another user's access to it.</li>
                  <li>Use the website for unlawful purposes or to circumvent legitimate verification procedures.</li>
                </ul>

                <p className="mt-4 leading-7 text-gray-600">
                  Where misuse is suspected, we may take reasonable steps to
                  protect the website, users and our business, including
                  restricting access where appropriate and reporting suspected
                  unlawful conduct where required or permitted by law.
                </p>
              </div>
            </div>
          </section>

          {/* 11 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              11. Website Availability and Security
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We aim to keep the website available and functioning reliably.
              However, uninterrupted availability, error-free operation and
              complete security cannot be guaranteed.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Maintenance, technical failures, network interruptions,
              third-party service disruptions or circumstances outside our
              reasonable control may affect website availability.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You should use a secure device and protect your own accounts,
              passwords and communications. If you believe that information
              submitted through the website has been compromised, please
              contact us promptly.
            </p>
          </section>

          {/* 12 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              12. Third-Party Services and Links
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              The website may rely on third-party providers for hosting,
              document storage, communications, payment-related functionality
              or other technical services.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Third-party websites and services may be governed by their own
              terms and privacy policies. We encourage you to review those
              policies before using an independent service or providing
              information directly to that provider.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Nothing in this section removes any responsibility that cannot
              lawfully be excluded under applicable law.
            </p>
          </section>

          {/* 13 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              13. Intellectual Property
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Unless otherwise stated, the text, branding, graphics, designs,
              logos and other materials displayed on this website belong to
              Optimus Solutions or are used with appropriate permission.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You may not reproduce, modify, distribute or commercially
              exploit website materials without prior permission, except
              where permitted by applicable law.
            </p>
          </section>

          {/* 14 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              14. Website Information and Disclaimers
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Website content is provided for general information and to
              support the application process. Although we aim to keep
              information accurate and current, we do not guarantee that every
              item of general website information is complete or suitable for
              every person's circumstances.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Website content is not a substitute for the formal terms,
              disclosures or documents applicable to a particular transaction.
              No application outcome or financial result is guaranteed by the
              general information presented on this website.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Nothing in these terms is intended to exclude any duty,
              representation or protection that cannot lawfully be excluded.
            </p>
          </section>

          {/* 15 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              15. Limitation of Liability
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              To the extent permitted by applicable law, Optimus Solutions
              will not be liable for loss arising directly from circumstances
              outside its reasonable control, including certain network
              interruptions, communication failures or third-party service
              disruptions.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              This provision does not exclude or limit liability where such
              exclusion or limitation is prohibited by law, nor does it
              remove any rights or remedies available to consumers under
              applicable South African law.
            </p>
          </section>

          {/* 16 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              16. Changes to These Terms
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may update these Terms of Service from time to time to
              reflect changes in our services, website, operations or
              applicable legal requirements.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              The latest version will be published on this page with its
              revision date. Where the law requires additional notice or
              consent, we will follow the applicable requirements.
            </p>
          </section>

          {/* 17 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              17. Governing Law and Consumer Rights
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              These terms are intended to be governed by the laws of the
              Republic of South Africa, subject to applicable legal
              requirements and mandatory consumer protections.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Nothing in these terms is intended to remove any right you may
              have under applicable South African consumer, credit, privacy
              or other legislation. Where a provision conflicts with a
              mandatory legal requirement, that requirement will apply to
              the extent of the conflict.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 rounded-xl bg-[#012a4a] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-semibold">
              18. Contact Optimus Solutions
            </h2>

            <p className="mt-3 leading-7 text-white/75">
              If you have questions about these Terms of Service or the
              application process, please contact us using the details below.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/60" />
                <a
                  href="tel:+27729603512"
                  className="transition-colors hover:text-white/70"
                >
                  +27 (72) 960-3512
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/60" />
                <a
                  href="mailto:info@optimussolutions.co.za"
                  className="transition-colors hover:text-white/70"
                >
                  info@optimussolutions.co.za
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
