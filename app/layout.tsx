import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import WhatsAppButton from "@/components/WhatsAppButton"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.optimussolutions.co.za"
  ),

  title: {
    default:
      "Optimus Solutions - Fast & Reliable Loan Solutions",
    template: "%s | Optimus Solutions",
  },

  description:
    "Get approved within 24–48 hours with flexible loan solutions tailored to your needs. Trusted South African financial solutions with personalized support.",

  keywords: [
    "loans",
    "personal loans",
    "South Africa",
    "fast approval",
    "flexible repayment",
    "loan application",
    "financial solutions",
    "Optimus Solutions",
  ],

  authors: [
    {
      name: "Optimus Solutions",
    },
  ],

  creator: "Optimus Solutions",
  publisher: "Optimus Solutions",

  alternates: {
    canonical:
      "https://www.optimussolutions.co.za",
  },

  openGraph: {
    type: "website",

    locale: "en_ZA",

    url: "https://www.optimussolutions.co.za",

    siteName: "Optimus Solutions",

    title:
      "Optimus Solutions - Fast & Reliable Loan Solutions",

    description:
      "Get approved within 24–48 hours with flexible loan solutions tailored to your needs. Trusted South African financial solutions with personalized support.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt:
          "Optimus Solutions - Fast & Reliable Loan Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Optimus Solutions - Fast & Reliable Loan Solutions",

    description:
      "Get approved within 24–48 hours with flexible loan solutions tailored to your needs.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: "#012a4a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Analytics />

        {children}

        <WhatsAppButton />
      </body>
    </html>
  )
}
