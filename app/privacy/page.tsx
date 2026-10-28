import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  FileText,
  Mail,
  Phone,
  UserCheck,
  Database,
  Scale,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Optimus Solutions",
  description:
    "Read the Optimus Solutions Privacy Policy covering personal information, loan applications, professional services and your rights under South African privacy law.",
  robots: {
    index: true,
    follow: true,
  },
}

const professionalServices = [
  "Accounting & Financial Reporting",
  "Tax & SARS Services",
  "Business Advisory",
  "Business Administration & Compliance",
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#012a4a]">
      <header className="border-b border-[#012a4a]/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#012a4a] transition-colors hover:text-[#014f86]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Optimus Solutions
          </Link>

          <span className="hidden text-sm text-slate-500 sm:block">
            Privacy Policy
          </span>
        </div>
      </header>

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
              Your privacy matters to Optimus Solutions. This policy explains
              how we collect, use, disclose, retain and protect personal
              information when you visit our website, contact us, apply for a
              loan or enquire about our professional services.
            </p>

            <p className="mt-6 text-sm text-white/60">
              Last updated: 28 October 2026
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="rounded-2xl border border-[#012a4a]/10 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-600">
              <strong className="text-[#012a4a]">Please note:</strong>{" "}
              Information requested for a particular service may be necessary
              to assess or respond to your request. If you choose not to
              provide information that is required, we may be unable to
              process your application or provide the requested service.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="mt-4 leading-7 text-slate-600">
              This Privacy Policy applies to personal information processed by
              Optimus Solutions in connection with its website, loan
              application process, customer communications and professional
              services.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              We aim to handle personal information responsibly and in
              accordance with applicable South African law, including the
              Protection of Personal Information Act 4 of 2013 (POPIA), where
              applicable.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              In this policy, personal information means information relating
              to an identifiable person and, where applicable under POPIA, an
              identifiable existing juristic person.
            </p>
          </section>

          <section className="mt-12">
            <div className="flex items-start gap-4">
              <Database className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold">
                  2. Information We May Collect
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  The information collected depends on the service you request
                  and your interactions with us. It may include:
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-4 text-slate-600">
              <li>
                <strong className="text-slate-800">
                  Identity information:
                </strong>{" "}
                full name, identity number and identity-document details
                provided for relevant verification purposes.
              </li>
              <li>
                <strong className="text-slate-800">
                  Contact information:
                </strong>{" "}
                telephone number, email address and other contact details you
                choose to provide.
              </li>
              <li>
                <strong className="text-slate-800">
                  Loan application information:
                </strong>{" "}
                requested loan amount, employment status, monthly income,
                application details and information relevant to assessing and
                administering a loan application.
              </li>
              <li>
                <strong className="text-slate-800">
                  Supporting documents:
                </strong>{" "}
                identity documents, bank statements, proof of address, payslips
                and other documents requested for a relevant application or
                verification process.
              </li>
              <li>
                <strong className="text-slate-800">
                  Professional-services information:
                </strong>{" "}
                business details, financial records, tax-related information,
                company documents and other information you provide when
                enquiring about or receiving professional services.
              </li>
              <li>
                <strong className="text-slate-800">
                  Communications:
                </strong>{" "}
                messages and details you provide through contact forms, email,
                telephone, WhatsApp or other communication channels we use.
              </li>
              <li>
                <strong className="text-slate-800">
                  Technical information:
                </strong>{" "}
                limited device, browser, access and usage information may be
                processed through website hosting, security logs or other
                technologies, depending on the services enabled on the website.
              </li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              3. How We Collect Information
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              We may collect information directly when you complete a form,
              upload supporting documents, email us, telephone us or otherwise
              communicate with our team.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Where necessary and lawful for a particular service, information
              may also be obtained from authorised representatives, relevant
              service providers, verification sources or other parties
              involved in the application or service process. Where required
              by law, we will provide relevant information about such
              collection.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              4. Why We Use Your Information
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Depending on the circumstances, we may process personal
              information for purposes such as:
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-600">
              <li>Responding to enquiries and providing customer support.</li>
              <li>Receiving, reviewing and administering loan applications.</li>
              <li>Verifying identity and supporting documentation.</li>
              <li>
                Assessing applications, affordability and eligibility where
                relevant to a credit application.
              </li>
              <li>
                Providing accounting, financial reporting, tax, advisory and
                business administration services that you request.
              </li>
              <li>Preparing relevant records and service documentation.</li>
              <li>Communicating about applications, services and transactions.</li>
              <li>Preventing fraud and investigating suspected misuse.</li>
              <li>Maintaining appropriate business and transaction records.</li>
              <li>Protecting the website and troubleshooting technical issues.</li>
              <li>
                Meeting applicable legal, regulatory, accounting and recordkeeping
                obligations.
              </li>
              <li>
                Establishing, exercising or defending legal rights where
                necessary.
              </li>
            </ul>
          </section>

          <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-start gap-4">
              <FileText className="mt-1 h-6 w-6 shrink-0 text-[#012a4a]" />
              <div>
                <h2 className="text-xl font-semibold">
                  5. Loan Applications & Financial Documents
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  If you apply for a loan through our website, you may be asked
                  to provide personal, employment and financial information,
                  together with supporting documents such as identity
                  documents, bank statements, proof of address and payslips.
                </p>
                <p className="mt-3 leading-7 text-slate-600">
                  This information may be used to review your application,
                  verify information, assess affordability and eligibility,
                  communicate with you and meet applicable legal or regulatory
                  obligations.
                </p>
                <p className="mt-3 leading-7 text-slate-600">
                  Please submit accurate information and only provide
                  documents through the designated application process or
                  another channel confirmed by Optimus Solutions. Do not send
                  sensitive documents to an unverified address or recipient.
                </p>
                <p className="mt-3 leading-7 text-slate-600">
                  Providing an application does not guarantee approval. Any
                  decision will be subject to the applicable assessment and
                  requirements.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              6. Professional Services & Enquiries
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              If you contact us about professional services, we may process
              the contact details and information you provide to understand
              your requirements, respond to your enquiry, prepare for a
              consultation and provide any service you subsequently request.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Our professional-service categories include:
            </p>
            <ul className="mt-4 space-y-2 text-slate-600">
              {professionalServices.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#012a4a]" />
                  {service}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-7 text-slate-600">
              Please provide only the information reasonably necessary for
              your enquiry. If a service requires additional documents or
              financial information, we will address those requirements as
              appropriate.
            </p>
          </section>

          <section className="mt-12">
            <div className="flex items-start gap-4">
              <Scale className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold">
                  7. Lawful Processing
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  We seek to process personal information for a lawful,
                  specific and clearly defined purpose, and only where a
                  permitted justification applies under relevant law. Depending
                  on the circumstances, this may include taking steps at your
                  request, performing a contract, complying with a legal
                  obligation, protecting a legitimate interest or obtaining
                  consent where required.
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  Where consent is the basis for processing, you may withdraw
                  it subject to applicable law. Withdrawal does not
                  automatically make earlier lawful processing invalid, and
                  other legal grounds for retaining or processing information
                  may still apply.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              8. Sharing Personal Information
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Optimus Solutions does not sell personal information. We may
              disclose information where reasonably necessary for the purposes
              described in this policy and where permitted by law.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Depending on the service and circumstances, recipients may
              include authorised personnel, professional advisers, website
              hosting and technology providers, document-storage or
              communication providers, relevant verification or financial
              service providers, and regulators or law-enforcement authorities
              where disclosure is required or legally permitted.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              We aim to limit disclosures to information reasonably necessary
              for the relevant purpose. Third parties that independently
              determine how they use information may be subject to their own
              privacy policies and legal obligations.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              9. Third-Party Providers & International Processing
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our website and business processes may rely on external
              technology providers to host the website, transmit enquiries,
              deliver emails, store documents or support other functions.
              Those providers may process information on our behalf or in
              accordance with their own service terms.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Depending on the provider and its infrastructure, information
              may be processed or stored outside South Africa. Where an
              international transfer occurs, we will seek to ensure that the
              transfer meets applicable legal requirements, including POPIA
              where relevant.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              For details about a specific provider or transfer relating to
              your information, contact us using the details in Section 17.
            </p>
          </section>

          <section className="mt-12">
            <div className="flex items-start gap-4">
              <Lock className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold">
                  10. Information Security
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  We aim to take appropriate, reasonable technical and
                  organisational measures to protect personal information
                  against loss, damage, unauthorised access, unlawful
                  processing and disclosure.
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  No electronic transmission or storage method can be
                  guaranteed to be completely secure. You should use trusted
                  devices and communication channels and avoid sharing
                  sensitive information with unverified recipients.
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  If a security compromise occurs, we will take steps required
                  by applicable law, which may include notifying affected
                  parties and the relevant regulator.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              11. Retention & Deletion
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              We retain personal information for no longer than is necessary
              for the purpose for which it was collected, unless a longer
              retention period is permitted or required by law or is otherwise
              justified under applicable law.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Retention may depend on the type of information, the nature of
              the service, the status of an application or transaction, legal
              recordkeeping requirements and the need to resolve disputes or
              protect legal rights.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              When information is no longer required and no lawful reason for
              retaining it remains, it should be securely deleted, destroyed
              or de-identified as appropriate.
            </p>
          </section>

          <section className="mt-12">
            <div className="flex items-start gap-4">
              <UserCheck className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold">
                  12. Your Privacy Rights
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  Subject to applicable law and any relevant limitations, you
                  may be entitled to:
                </p>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-600">
                  <li>
                    Request confirmation of whether we hold personal
                    information about you and request access to it.
                  </li>
                  <li>
                    Request correction or deletion of information that is
                    inaccurate, irrelevant, excessive, outdated, incomplete,
                    misleading or unlawfully obtained, where applicable.
                  </li>
                  <li>
                    Object to certain processing where the law provides that
                    right.
                  </li>
                  <li>
                    Withdraw consent where processing is based on consent,
                    subject to legal limitations.
                  </li>
                  <li>
                    Raise a concern or lodge a complaint about the handling of
                    your personal information.
                  </li>
                </ul>
                <p className="mt-4 leading-7 text-slate-600">
                  We may need to verify your identity before responding to a
                  request. Some information may need to be retained where the
                  law requires it or another lawful basis applies.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              13. Cookies & Website Technologies
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our website or its hosting infrastructure may use essential
              technologies to support website operation, security and
              functionality. Analytics or other optional technologies may also
              be used if enabled.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              You can manage cookies through your browser settings. Blocking
              certain cookies may affect some website functionality. Where
              required, we will seek the appropriate consent for technologies
              that need it.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              14. Children&apos;s Information
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our services are not intended to encourage children to submit
              personal information without the appropriate legal authority or
              consent. Where information about a child is processed, we will
              seek to comply with the additional requirements that apply under
              relevant law.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              15. Links to Other Websites
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our website may link to third-party websites or services. Those
              services may operate under separate privacy policies and
              practices. We encourage you to review their policies before
              submitting personal information directly to them.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              16. Changes to This Policy
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              We may update this Privacy Policy to reflect changes in our
              services, technology, business practices or applicable law. The
              latest version and its update date will be published on this
              page. We encourage you to review it periodically.
            </p>
          </section>

          <section className="mt-12 rounded-xl bg-[#012a4a] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-semibold">
              17. Contact Us About Privacy
            </h2>
            <p className="mt-3 leading-7 text-white/75">
              To ask a question about this policy, request access to your
              personal information or raise a privacy concern, contact
              Optimus Solutions using the details below. Please do not include
              identity documents or other sensitive information in an ordinary
              email unless we have confirmed an appropriate channel.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-white/60" />
                <a
                  href="tel:+27729603512"
                  className="transition-colors hover:text-white/70"
                >
                  +27 (72) 960-3512
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-white/60" />
                <a
                  href="mailto:info@optimussolutions.co.za"
                  className="break-all transition-colors hover:text-white/70"
                >
                  info@optimussolutions.co.za
                </a>
              </div>
            </div>

            <p className="mt-6 text-xs leading-5 text-white/60">
              Optimus Solutions
              <br />
              Trade Number: 2025/17469107
            </p>

            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold">
                South African Information Regulator
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                If you are unable to resolve a privacy concern with us, you
                may contact the Information Regulator of South Africa,
                subject to its procedures and the applicable law.
              </p>
              <a
                href="https://inforegulator.org.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 transition hover:text-white/70"
              >
                Visit the Information Regulator
              </a>
            </div>
          </section>
        </div>

        <footer className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
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
        </footer>
      </div>
    </main>
  )
}
