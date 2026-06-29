'use client'

import { useState } from 'react'

export default function CalculatorPage() {
  const [form, setForm] = useState({
    salePrice: '',
    deposit: '',
    mortgage: '',
  })
  const [result, setResult] = useState<null | {
    leaseRatio: number
    totalRisk: number
    insuranceEligible: boolean
    insuranceFeeMin: number
    insuranceFeeMax: number
    safeDeposit: number
  }>(null)

  const calc = (e: React.FormEvent) => {
    e.preventDefault()
    const sale = Number(form.salePrice)
    const dep = Number(form.deposit)
    const mort = Number(form.mortgage)

    const leaseRatio = Math.round((dep / sale) * 100)
    const totalRisk = Math.round(((dep + mort) / sale) * 100)
    const insuranceEligible = totalRisk <= 90
    const insuranceFeeMin = Math.round(dep * 0.001)
    const insuranceFeeMax = Math.round(dep * 0.004)
    const safeDeposit = Math.round(sale * 0.7) - mort

    setResult({ leaseRatio, totalRisk, insuranceEligible, insuranceFeeMin, insuranceFeeMax, safeDeposit })
  }

  const getRiskColor = (ratio: number) =>
    ratio >= 80 ? 'text-red-500' : ratio >= 70 ? 'text-orange-400' : 'text-green-500'

  const getRiskLabel = (ratio: number) =>
    ratio >= 80 ? '위험' : ratio >= 70 ? '경고' : '안전'

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">전세보증보험 계산기</h1>
        <p className="text-sm text-gray-400 mt-1">보증금·매매가 입력으로 위험도와 보험료를 계산해드려요</p>
      </div>

      <form onSubmit={calc} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        {[
          { label: '매매가 (만원)', key: 'salePrice', placeholder: '예) 30000' },
          { label: '전세 보증금 (만원)', key: 'deposit', placeholder: '예) 20000' },
          { label: '선순위 근저당 (만원, 없으면 0)', key: 'mortgage', placeholder: '예) 5000' },
        ].map(({ label, key, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-bold mb-1.5">{label}</label>
            <input
              required
              type="number"
              placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors">
          계산하기
        </button>
      </form>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <p className="text-xs text-gray-400 mb-1">전세가율</p>
              <p className={`text-3xl font-black ${getRiskColor(result.leaseRatio)}`}>{result.leaseRatio}%</p>
              <p className={`text-xs font-bold mt-1 ${getRiskColor(result.leaseRatio)}`}>{getRiskLabel(result.leaseRatio)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <p className="text-xs text-gray-400 mb-1">총위험비율 (보증금+근저당)</p>
              <p className={`text-3xl font-black ${getRiskColor(result.totalRisk)}`}>{result.totalRisk}%</p>
              <p className={`text-xs font-bold mt-1 ${getRiskColor(result.totalRisk)}`}>{getRiskLabel(result.totalRisk)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-black">분석 결과</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <div>
                  <p className="font-semibold text-sm">전세보증보험 가입 가능 여부</p>
                  <p className="text-xs text-gray-400">총위험비율 90% 이하 시 가입 가능</p>
                </div>
                <span className={`text-sm font-black ${result.insuranceEligible ? 'text-green-500' : 'text-red-500'}`}>
                  {result.insuranceEligible ? '가입 가능' : '가입 불가'}
                </span>
              </div>

              {result.insuranceEligible && (
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <div>
                    <p className="font-semibold text-sm">예상 보험료</p>
                    <p className="text-xs text-gray-400">연 0.1~0.4% 수준 (기관별 상이)</p>
                  </div>
                  <span className="text-sm font-black">
                    {result.insuranceFeeMin.toLocaleString()}~{result.insuranceFeeMax.toLocaleString()}만원/년
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-semibold text-sm">안전한 전세 보증금 한도</p>
                  <p className="text-xs text-gray-400">매매가의 70% - 근저당 금액</p>
                </div>
                <span className="text-sm font-black text-green-500">
                  {result.safeDeposit > 0 ? `${result.safeDeposit.toLocaleString()}만원` : '한도 초과'}
                </span>
              </div>
            </div>

            <div className={`rounded-xl p-4 ${result.leaseRatio >= 80 ? 'bg-red-50' : result.leaseRatio >= 70 ? 'bg-orange-50' : 'bg-green-50'}`}>
              <p className={`text-sm font-bold ${getRiskColor(result.leaseRatio)}`}>
                {result.leaseRatio >= 80
                  ? '⚠️ 깡통전세 위험 구간입니다. 계약을 재검토하세요.'
                  : result.leaseRatio >= 70
                  ? '! 전세가율이 높은 편입니다. 전세보증보험 가입을 강력 추천합니다.'
                  : '✓ 비교적 안전한 수준입니다. 전세보증보험 가입으로 완전히 보호받으세요.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
