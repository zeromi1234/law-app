import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="집터뷰" width={24} height={24} />
          <span className="font-black text-sm">집터뷰</span>
        </div>
        <Link href="/about" className="text-xs text-gray-400 hover:text-black transition-colors whitespace-nowrap">
          왜 만들었나요? →
        </Link>
      </div>
    </footer>
  )
}
