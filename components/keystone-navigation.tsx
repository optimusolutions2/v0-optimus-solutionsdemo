
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Calculator,
  FileCheck2,
  Menu,
} from "lucide-react"

const links = [
  { href: "/keystone", label: "Overview" },
  { href: "/keystone/accounting", label: "Accounting" },
  { href: "/keystone/tax", label: "Tax" },
  { href: "/keystone/advisory", label: "Advisory" },
]

export function KeystoneNavigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Return to Optimus Solutions homepage"
            className="flex shrink-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#012a4a] text-white">
              <ArrowLeft className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-[#012a4a] sm:text-base">
                Optimus Solutions
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Back to main website
              </span>
            </span>
          </Link>

          <nav
            aria-label="Keystone navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#012a4a]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/keystone#contact"
              className="hidden items-center gap-2 rounded-xl bg-[#012a4a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#001d36] sm:inline-flex"
            >
              Contact Keystone
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <details className="relative lg:hidden">
              <summary
                aria-label="Open navigation menu"
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 text-[#012a4a] hover:bg-slate-50 [&::-webkit-details-marker]:hidden"
              >
                <Menu className="h-5 w-5" />
              </summary>

              <nav
                aria-label="Mobile Keystone navigation"
                className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
              >
                <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Keystone Advisory
                </p>

                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#012a4a]"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="my-2 border-t border-slate-100" />

                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-[#012a4a] hover:bg-slate-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Optimus
                </Link>

                <Link
                  href="/keystone#contact"
                  className="mt-1 flex items-center gap-2 rounded-lg bg-[#012a4a] px-3 py-3 text-sm font-semibold text-white hover:bg-[#001d36]"
                >
                  Contact Keystone
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </Link>
              </nav>
            </details>
          </div>
        </div>

        <div className="border-t border-slate-100 py-2 lg:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calculator className="h-3.5 w-3.5" />
            <span>Keystone Advisory and Associates</span>
            <FileCheck2 className="ml-auto h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </header>
  )
}
