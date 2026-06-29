import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '집터뷰 — 전세사기 예방 부동산 정보',
  description: '전세 계약 전 꼭 확인하세요. 매물 위험도, 등기 정보, 부동산 법률까지.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8 pb-24 sm:pb-8">
          {children}
        </main>
      </body>
    </html>
  )
}
