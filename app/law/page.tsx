'use client'

import { useState } from 'react'
import Link from 'next/link'
import { laws } from '@/lib/mock-data'

const categories = ['전체', '계약', '보증금', '임대인', '임차인', '분쟁', '세금']

export default function LawPage() {
  const [selected, setSelected] = useState('전체')
  const [query, setQuery] = useState('')

  const filtered = laws.filter((l) => {
    const matchCat = selected === '전체' || l.category === selected
    const matchQuery = query === '' || l.title.includes(query) || l.summary.includes(query)
    return matchCat && matchQuery
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">부동산 법률 정보</h1>
        <p className="text-sm text-gray-400 mt-1">전세 계약 전 꼭 알아야 할 법률을 확인하세요</p>
      </div>

      <input
        type="text"
        placeholder="법률 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === cat ? 'bg-black text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((law) => (
          <Link
            key={law.id}
            href={`/law/${law.id}`}
            className="block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                  {law.category}
                </span>
                <h3 className="font-bold mt-2 group-hover:underline">{law.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{law.summary}</p>
              </div>
              <span className="text-gray-300 group-hover:text-black transition-colors text-xl shrink-0">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
