import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#012a4a] text-white" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <span className="text-xl font-bold text-white">O</span>
              </div>
              <span className="text-lg font-semibold">
                Optimus Solutions
              </span>
            </div>

            <p className="mt-4 text-sm text-white/70">
              Fast and reliable loan solutions tailored to your needs. Trusted
              by thousands of South Africans.
            </p>

            {/* NCR Accreditation */}
            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
              <Image
                src="/images/NCR LOGO.png"
                alt="National Credit Regulator"
                width={120}
                height={50}
                className="h-10 w-auto object-contain"
              />

              <p className="mt-3 text-sm font-semibold">
                Registered Credit Provider
              </p>

              <p className="text-sm text-white/70">
                NCR Registration No.
              </p>

              <p className="text-base font-bold text-white">
                NCRCP23929
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/apply"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Apply Now
                </Link>
              </li>

              <li>
                <Link
                  href="/why-us"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Why Us
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </h3>

            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>

            <div className="mt-2 space-y-1 text-sm text-white/70">
              <p>Email: optimusolutions2@gmail.com</p>
              <p>Phone: +27 (72) 960-3512</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Optimus Solutions. All rights
            reserved.
          </p>

          <p className="mt-2 text-sm text-white/50">
            Trade No: 2025/17469107 | Registered Credit Provider |
            NCR Registration No. <span className="font-semibold">NCRCP23929</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
