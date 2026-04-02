"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#why-us", label: "Why Us" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    // Handle scroll behavior
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isScrolled
          ? "bg-[#012a4a]/95 shadow-lg shadow-black/10 backdrop-blur-lg"
          : "bg-[#012a4a]/80 backdrop-blur-md"
      }`}
    >
      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="group relative flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-lg transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
              <Image
                src="/images/logo.png"
                alt="Optimus Solutions"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">
                Optimus
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400/80">
                Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white"
                style={{
                  animationDelay: `${(index + 1) * 100}ms`,
                }}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover underline effect */}
                <span className="absolute inset-x-4 bottom-1 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            
            {/* CTA Button */}
            <Button
              asChild
              className="group ml-6 overflow-hidden bg-gradient-to-r from-white to-white/95 px-6 text-[#012a4a] shadow-lg shadow-black/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              <Link href="/apply" className="flex items-center gap-2">
                <span className="font-semibold">Apply Now</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-white transition-colors duration-300 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="relative block h-6 w-6">
              <Menu 
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                }`} 
              />
              <X 
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                }`} 
              />
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-out lg:hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="border-t border-white/10 pb-6 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-all duration-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                    transform: mobileMenuOpen ? "translateX(0)" : "translateX(-10px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                >
                  <span className="mr-3 h-1 w-1 rounded-full bg-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-white to-white/95 py-6 text-[#012a4a] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <Link 
                    href="/apply" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="font-semibold">Apply Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Bottom border glow on scroll */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`} 
      />
    </header>
  )
}
