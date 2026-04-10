import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/27768513565?text=Hi%2C%20I%20need%20help%20with%20my%20loan%20application."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-semibold">WhatsApp Us</span>
    </Link>
  )
}
 
