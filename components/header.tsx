"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply Now" },
  { href: "#contact", label: "Contact" },
  { href: "#why-us", label: "Why Us" },
  { href: "#about", label: "About Us" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#012a4a] shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <span className="text-xl font-bold text-white">O</span>
            </div>
            <span className="text-lg font-semibold text-white">
              Optimus Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="ml-4 bg-white text-[#012a4a] hover:bg-white/90"
            >
              <Link href="/apply">Apply Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-md p-2 text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-white/10 pb-4 md:hidden">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 bg-white text-[#012a4a] hover:bg-white/90"
              >
                <Link href="/apply" onClick={() => setMobileMenuOpen(false)}>
                  Apply Now
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
