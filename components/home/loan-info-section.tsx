import Image from "next/image"

export function LoanInfoSection() {
  return (
    <section className="bg-background py-16 md:py-20" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:block">
            <Image
              src="/images/documents.jpg"
              alt="Required loan application documents"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Applying for a Personal Loan
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Applying for a personal loan with Optimus Solutions is
                straightforward. Simply fill out our online application form
                with your basic details, including your full name, ID number,
                contact information, and income details.
              </p>
              <p>
                Before you begin, make sure you have the necessary documents
                ready: a valid South African ID document and your latest three
                months&apos; bank statements with a bank stamp.
              </p>
              <p>
                Once you submit your application, our team will assess your
                eligibility within one to two business days. If approved,
                you&apos;ll receive a loan agreement via email for you to review
                and sign.
              </p>
              <p>
                After returning the signed agreement, the approved funds will be
                deposited directly into your bank account. It&apos;s that
                simple.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
