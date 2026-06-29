'use client'

import { useState } from 'react'
import RiskBadge from '@/components/RiskBadge'
import { RiskLevel } from '@/lib/types'

interface Result {
  leaseRatio: number
  risk: RiskLevel
  items: { label: string; status: RiskLevel; desc: string }[]
}

export default function CheckPage() {
  const [form, setForm] = useState({
    address: '',
    salePrice: '',
    deposit: '',
    mortgage: '',
    seizure: false,
    ownerTax: false,
  })
  const [result, setResult] = useState<Result | null>(null)

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()

    const sale = Number(form.salePrice)
    const dep = Number(form.deposit)
    const mort = Number(form.mortgage)
    const leaseRatio = Math.round((dep / sale) * 100)

    const riskItems: Result['items'] = [
      {
        label: '전세가율',
        status: leaseRatio >= 80 ? '위험' : leaseRatio >= 70 ? '경고' : '안전',
        desc: `${leaseRatio}% — ${leaseRatio >= 80 ? '깡통전세 위험 구간입니다' : leaseRatio >= 70 ? '주의가 필요한 수준입니다' : '안전한 수준입니다'}`,
      },
      {
        label: '근저당',
        status: mort > 0 ? (mort / sale > 0.5 ? '위험' : '경고') : '안전',
        desc: mort > 0 ? `${mort.toLocaleString()}만원 설정 — 매매가의 ${Math.round((mort / sale) * 100)}%` : '근저당 없음',
      },
      {
        label: '압류 여부',
        status: form.seizure ? '위험' : '안전',
        desc: form.seizure ? '압류 이력 있음 — 계약 전 반드시 확인하세요' : '압류 없음',
      },
      {
        label: '집주인 세금 체납',
        status: form.ownerTax ? '위험' : '안전',
        desc: form.ownerTax ? '세금 체납 이력 있음 — 국가가 보증금보다 우선 변제됩니다' : '체납 없음',
      },
    ]

    const dangerCount = riskItems.filter(i => i.status === '위험').length
    const cautionCount = riskItems.filter(i => i.status === '경고').length

    const overall: RiskLevel = dangerCount > 0 ? '위험' : cautionCount > 0 ? '경고' : '안전'

    setResult({ leaseRatio, risk: overall, items: riskItems })
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">위험도 체크</h1>
        <p className="text-sm text-gray-400 mt-1">매물 정보를 입력하면 전세 위험도를 분석해드려요</p>
      </div>

      <form onSubmit={handleCheck} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-bold mb-1.5">주소</label>
          <input
            required
            type="text"
            placeholder="예) 서울시 마포구 서교동 123-4"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1.5">매매가 (만원)</label>
            <input
              required
              type="number"
              placeholder="예) 30000"
              value={form.salePrice}
              onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5">전세 보증금 (만원)</label>
            <input
              required
              type="number"
              placeholder="예) 20000"
              value={form.deposit}
              onChange={(e) => setForm({ ...form, deposit: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5">근저당 금액 (만원, 없으면 0)</label>
          <input
            type="number"
            placeholder="예) 5000"
            value={form.mortgage}
            onChange={(e) => setForm({ ...form, mortgage: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.seizure}
              onChange={(e) => setForm({ ...form, seizure: e.target.checked })}
              className="w-5 h-5 rounded accent-black"
            />
            <span className="text-sm font-medium">압류 이력 있음</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.ownerTax}
              onChange={(e) => setForm({ ...form, ownerTax: e.target.checked })}
              className="w-5 h-5 rounded accent-black"
            />
            <span className="text-sm font-medium">집주인 세금 체납 이력 있음</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors"
        >
          위험도 분석하기
        </button>
      </form>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-lg">분석 결과</h2>
            <RiskBadge level={result.risk} size="lg" />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400">전세가율</p>
            <p className="text-4xl font-black mt-1">{result.leaseRatio}%</p>
            <p className="text-xs text-gray-400 mt-1">
              {result.leaseRatio >= 80 ? '⚠️ 깡통전세 위험 구간' : result.leaseRatio >= 70 ? '주의 구간' : '안전 구간'}
            </p>
          </div>

          <div className="space-y-3">
            {result.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <RiskBadge level={item.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
