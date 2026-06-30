'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const groups = [
  {
    label: '계약 준비',
    items: [
      { href: '/checklist', label: '계약전 확인' },
      { href: '/contract', label: '계약서 분석' },
      { href: '/calculator', label: '보험 계산기' },
    ],
  },
  {
    label: '피해 대응',
    items: [
      { href: '/cases', label: '피해 사례' },
      { href: '/support', label: '피해 대처' },
      { href: '/counsel', label: '전문가 상담 연결' },
    ],
  },
  {
    label: '정보',
    items: [
      { href: '/check', label: '위험도 체크' },
      { href: '/law', label: '법률 정보' },
      { href: '/balance', label: '밸런스 게임' },
    ],
  },
]

function DropdownGroup({ group }: { group: typeof groups[0] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const isActive = group.items.some(i => pathname === i.href)

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`text-sm font-medium transition-colors ${
          isActive ? 'text-black font-bold' : 'text-gray-400 hover:text-black'
        }`}
      >
        {group.label}
      </button>

      {open && (
        <div className="absolute top-6 left-0 pt-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 py-2 min-w-[140px]">
            {group.items.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                  pathname === href ? 'font-bold text-black' : 'text-gray-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
    setMobileGroup(null)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 + 데스크탑 GNB */}
        <div className="flex items-center" style={{ gap: '40px' }}>
          <Link
            href="/"
            onClick={e => { if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}
            className="flex items-center gap-2 shrink-0"
          >
            <Image src="/logo.png" alt="집터뷰" width={36} height={36} />
            <span className="text-lg font-black text-black tracking-tight">집터뷰</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            {groups.map((group) => (
              <DropdownGroup key={group.label} group={group} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="hidden sm:block text-sm text-gray-400 hover:text-black transition-colors"
          >
            왜 만들었나요?
          </Link>
          <Link
            href="/counsel"
            className="hidden sm:block bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            무료 상담 받기
          </Link>
          {/* 햄버거 버튼 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden flex flex-col gap-1.5 p-2"
            aria-label="메뉴"
          >
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* 모바일 사이드 드로어 오버레이 */}
      {mobileOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일 사이드 드로어 */}
      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 드로어 헤더 */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <span className="font-black text-base">메뉴</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-gray-400 hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 드로어 메뉴 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <Link
            href="/"
            className={`block px-3 py-2.5 rounded-xl text-sm font-semibold ${
              pathname === '/' ? 'bg-gray-100 text-black' : 'text-gray-600'
            }`}
          >
            홈
          </Link>

          {groups.map((group) => (
            <div key={group.label}>
              <button
                onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-700"
              >
                {group.label}
                <svg
                  className={`w-4 h-4 transition-transform ${mobileGroup === group.label ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileGroup === group.label && (
                <div className="ml-3 space-y-0.5 mb-1">
                  {group.items.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`block px-3 py-2 rounded-xl text-sm ${
                        pathname === href ? 'bg-black text-white font-bold' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 드로어 하단 버튼 */}
        <div className="px-4 py-5 border-t border-gray-100 space-y-2">
          <Link
            href="/about"
            className="block text-center text-sm text-gray-400 py-2"
          >
            왜 만들었나요?
          </Link>
          <Link
            href="/counsel"
            className="block bg-black text-white text-sm font-bold px-4 py-3 rounded-2xl text-center"
          >
            무료 상담 받기
          </Link>
        </div>
      </div>
    </header>
  )
}
