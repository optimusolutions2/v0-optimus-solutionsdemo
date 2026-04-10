import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import WhatsAppButton from "@/components/WhatsAppButton"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Optimus Solutions - Fast & Reliable Loan Solutions',
  description: 'Get approved within 24-48 hours with flexible terms tailored to your needs. Trusted South African loan service with personalized support.',
  keywords: ['loans', 'personal loans', 'South Africa', 'fast approval', 'flexible repayment'],
}

export const viewport: Viewport = {
  themeColor: '#012a4a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>  {children}
        <Analytics />
  {children}
  <WhatsAppButton />
      </body>
    </html>
  )
}
