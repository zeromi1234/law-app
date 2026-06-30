'use client'

import { useState, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import RiskBadge from '@/components/RiskBadge'
import { RiskLevel } from '@/lib/types'
import { downloadChecklistAsJpg } from '@/components/ChecklistPDF'

// ─── 내 집 위험도 체크 인터뷰 ─────────────────────────────────
function toEok(v: string) {
  const n = Number(v)
  if (!n) return ''
  return n >= 10000 ? `${(n / 10000).toFixed(1)}억원` : `${n.toLocaleString()}만원`
}

// 클라이언트 측 주소 인식 (서울/수도권/광역시/지방 + 대표 지명)
const knownDistricts: { keywords: string[]; label: string; region: string }[] = [
  { keywords: ['서울'], label: '서울', region: '서울' },
  { keywords: ['강남'], label: '서울 강남구', region: '서울' },
  { keywords: ['마포'], label: '서울 마포구', region: '서울' },
  { keywords: ['송파'], label: '서울 송파구', region: '서울' },
  { keywords: ['서초'], label: '서울 서초구', region: '서울' },
  { keywords: ['용산'], label: '서울 용산구', region: '서울' },
  { keywords: ['성동'], label: '서울 성동구', region: '서울' },
  { keywords: ['노원'], label: '서울 노원구', region: '서울' },
  { keywords: ['은평'], label: '서울 은평구', region: '서울' },
  { keywords: ['관악'], label: '서울 관악구', region: '서울' },
  { keywords: ['영등포'], label: '서울 영등포구', region: '서울' },
  { keywords: ['분당'], label: '경기 성남시 분당구', region: '수도권' },
  { keywords: ['수원'], label: '경기 수원시', region: '수도권' },
  { keywords: ['성남'], label: '경기 성남시', region: '수도권' },
  { keywords: ['고양'], label: '경기 고양시', region: '수도권' },
  { keywords: ['용인'], label: '경기 용인시', region: '수도권' },
  { keywords: ['부천'], label: '경기 부천시', region: '수도권' },
  { keywords: ['안양'], label: '경기 안양시', region: '수도권' },
  { keywords: ['남양주'], label: '경기 남양주시', region: '수도권' },
  { keywords: ['화성'], label: '경기 화성시', region: '수도권' },
  { keywords: ['인천'], label: '인천', region: '수도권' },
  { keywords: ['경기'], label: '경기', region: '수도권' },
  { keywords: ['부산'], label: '부산', region: '광역시' },
  { keywords: ['대구'], label: '대구', region: '광역시' },
  { keywords: ['대전'], label: '대전', region: '광역시' },
  { keywords: ['광주'], label: '광주', region: '광역시' },
  { keywords: ['울산'], label: '울산', region: '광역시' },
  { keywords: ['해운대'], label: '부산 해운대구', region: '광역시' },
  { keywords: ['수성'], label: '대구 수성구', region: '광역시' },
  { keywords: ['유성'], label: '대전 유성구', region: '광역시' },
]

function detectAddress(addr: string): { label: string; region: string } | null {
  for (const d of knownDistricts) {
    if (d.keywords.every(kw => addr.includes(kw))) return d
  }
  return null
}

function isValidAddress(addr: string) {
  return addr.trim().length >= 4 && /[구군시도]/.test(addr)
}

function AddressStep({ value, onChange, onNext }: {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  const [confirmed, setConfirmed] = useState(false)
  const valid = isValidAddress(value)
  const showError = value.trim().length > 0 && !valid
  const detected = valid ? detectAddress(value) : null

  const handleNext = () => {
    if (detected || confirmed) {
      onNext()
    } else {
      setConfirmed(true)
    }
  }

  // 주소 바뀌면 confirmed 초기화
  const handleChange = (v: string) => {
    setConfirmed(false)
    onChange(v)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-gray-400 font-medium mb-1">Step 1</p>
        <h2 className="text-xl font-black">어떤 집인지 알려주세요</h2>
        <p className="text-sm text-gray-400 mt-1">시·구 정도만 입력해도 분석돼요</p>
      </div>

      <div className="space-y-1">
        <input
          type="text"
          placeholder="예) 서울 마포구  또는  경기 성남시 분당구"
          value={value}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && valid && handleNext()}
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white transition-colors
            ${showError ? 'border-red-300 focus:ring-red-400' : detected ? 'border-green-400 focus:ring-green-400' : 'border-gray-200 focus:ring-black'}`}
          autoFocus
        />

        {/* 인식 성공 */}
        {detected && (
          <p className="text-xs text-green-600 px-1 font-medium">✓ {detected.label} ({detected.region}) 으로 인식됐어요</p>
        )}

        {/* 형식 오류 */}
        {showError && (
          <p className="text-xs text-red-400 px-1">시·구·군이 포함돼야 해요. 예) 서울 마포구</p>
        )}

        {/* 인식 실패 (형식은 맞는데 DB에 없음) */}
        {valid && !detected && !confirmed && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 space-y-2 mt-2">
            <p className="text-xs text-orange-700 font-bold">지역을 정확히 인식하지 못했어요</p>
            <p className="text-xs text-orange-600">실거래가 조회가 안 될 수 있고, 위험 기준은 <span className="font-bold">지방 기준(65%)</span>으로 적용돼요.</p>
          </div>
        )}

        {/* 인식 실패 + 확인 후 진행 안내 */}
        {valid && !detected && confirmed && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-600">지방 기준으로 계속 진행해요</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500 space-y-1.5">
        <p className="font-bold text-gray-700">지역별 전세가율 위험 기준</p>
        <p>서울 80% · 수도권 75% · 광역시 70% · 지방 65% 이상이면 위험 구간이에요</p>
        <p className="text-gray-400 leading-relaxed">
          집값이 하락해도 경매 낙찰가에서 보증금을 돌려받을 수 있는지를 기준으로 해요.
          서울·수도권은 경매 낙찰률이 높아 기준이 높고, 지방은 낙찰가가 낮게 형성돼 더 보수적으로 잡아요.
        </p>
        <p className="text-gray-400">주소를 입력하면 해당 지역 실거래가도 자동으로 조회해요</p>
      </div>

      <button
        onClick={handleNext}
        disabled={!valid}
        className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-30"
      >
        {valid && !detected && !confirmed ? '지방 기준으로 계속하기' : '다음'}
      </button>
    </div>
  )
}

type HouseTypeCheck = '아파트' | '빌라' | '오피스텔' | '다가구'

interface CheckDataFull {
  address: string
  houseType: HouseTypeCheck | null
  salePrice: string
  deposit: string
  mortgage: string
  hasPriority: boolean | null  // 선순위 임차인
  hasSeizure: boolean | null
  hasTax: boolean | null
}

const houseTypeCheckOptions: { label: HouseTypeCheck; emoji: string }[] = [
  { label: '아파트', emoji: '🏢' },
  { label: '빌라', emoji: '🏘️' },
  { label: '오피스텔', emoji: '🏙️' },
  { label: '다가구', emoji: '🏚️' },
]

function calcCheckResultFull(data: CheckDataFull, region: string) {
  const sale = Number(data.salePrice)
  const dep = Number(data.deposit)
  const mort = Number(data.mortgage) || 0
  const leaseRatio = sale > 0 ? Math.round((dep / sale) * 100) : 0
  const combinedRatio = sale > 0 ? Math.round(((dep + mort) / sale) * 100) : 0

  // 지역별 임계값
  const thresholds: Record<string, { caution: number; danger: number }> = {
    '서울':   { caution: 70, danger: 80 },
    '수도권': { caution: 65, danger: 75 },
    '광역시': { caution: 60, danger: 70 },
    '지방':   { caution: 55, danger: 65 },
  }
  const th = thresholds[region] ?? thresholds['지방']

  // 전세보증보험 가입 가능 여부 (HUG 기준)
  const maxDeposit = (region === '서울' || region === '수도권') ? 70000 : 50000
  const insuranceOk = leaseRatio <= 90 && dep <= maxDeposit

  // 경매 시 우선순위 시뮬레이션 (보수적 기준 — 낙찰가 70~85%)
  // 실제 낙찰가는 감정평가액의 70~85% 수준. 매매가 ≈ 감정평가액으로 가정.
  const auctionLow = Math.round(sale * 0.70)
  const auctionHigh = Math.round(sale * 0.85)
  const auctionExecCost = Math.round(sale * 0.03) // 집행 비용 약 3%

  // 소액임차인 최우선변제 (서울 기준: 보증금 1.65억 이하 → 5500만원 우선 배당)
  const smallTenantThresholds: Record<string, { limit: number; priority: number }> = {
    '서울':   { limit: 16500, priority: 5500 },
    '수도권': { limit: 14500, priority: 4800 },
    '광역시': { limit: 8500,  priority: 2800 },
    '지방':   { limit: 7500,  priority: 2500 },
  }
  const st = smallTenantThresholds[region] ?? smallTenantThresholds['지방']
  const smallTenantPriority = dep <= st.limit ? Math.min(dep, st.priority) : 0

  // 낙찰 후 순서: 집행비용 → 당해세(세금체납) → 소액임차인 최우선변제 → 선순위 근저당 → 내 보증금
  const calcRecovery = (auctionPrice: number) => {
    let remain = auctionPrice
    remain = Math.max(0, remain - auctionExecCost)
    if (data.hasTax) remain = Math.max(0, remain - 0) // 체납액 미상 → 숫자 제외, 경고만 표시
    remain = Math.max(0, remain - smallTenantPriority)
    remain = Math.max(0, remain - mort)
    return Math.min(dep - smallTenantPriority, remain) + smallTenantPriority
  }

  const recoverLow = calcRecovery(auctionLow)
  const recoverHigh = calcRecovery(auctionHigh)
  const recoverable = recoverLow
  const recoverRatio = dep > 0 ? Math.round((recoverLow / dep) * 100) : 100
  const recoverRatioHigh = dep > 0 ? Math.round((recoverHigh / dep) * 100) : 100

  const items: { label: string; status: RiskLevel; desc: string; reason: string }[] = [
    {
      label: '전세가율',
      status: leaseRatio >= th.danger ? '위험' : leaseRatio >= th.caution ? '경고' : '안전',
      desc: `${leaseRatio}%`,
      reason: leaseRatio >= th.danger
        ? `${region} 기준 위험 구간(${th.danger}% 이상)이에요. 집값이 하락하면 보증금 전액 회수가 어려울 수 있어요.`
        : leaseRatio >= th.caution
        ? `${region} 기준 주의 구간(${th.caution}~${th.danger}%)이에요. 전세보증보험 가입을 강력히 권장해요.`
        : `${region} 기준 안전 구간이에요. 집값이 다소 하락해도 보증금 회수 가능성이 높아요.`,
    },
    {
      label: '근저당 + 보증금 합산',
      status: combinedRatio >= 90 ? '위험' : combinedRatio >= 80 ? '경고' : '안전',
      desc: mort > 0 ? `합산 ${combinedRatio}% (근저당 ${mort.toLocaleString()}만원)` : '근저당 없음',
      reason: mort > 0
        ? `근저당 ${mort.toLocaleString()}만원 + 보증금 ${dep.toLocaleString()}만원 = 합산 ${(dep + mort).toLocaleString()}만원으로 매매가의 ${combinedRatio}%예요. 경매 시 은행이 먼저 근저당액을 가져가요.`
        : '근저당이 없어 경매 시 보증금이 우선 회수될 가능성이 높아요.',
    },
    {
      label: '압류',
      status: data.hasSeizure ? '위험' : '안전',
      desc: data.hasSeizure ? '압류 이력 있음' : '압류 없음',
      reason: data.hasSeizure
        ? '압류·가압류가 있으면 집이 강제경매로 넘어갈 수 있어요. 계약 전 반드시 법률 상담을 받으세요.'
        : '압류 이력이 없어 강제경매 위험이 낮아요.',
    },
    {
      label: '세금 체납',
      status: data.hasTax ? '위험' : '안전',
      desc: data.hasTax ? '세금 체납 의심' : '체납 없음',
      reason: data.hasTax
        ? '국세·지방세는 보증금보다 우선 변제돼요. 세무서에서 무료로 체납 조회 가능하니 계약 전 반드시 확인하세요.'
        : '세금 체납이 없어 국세 우선변제 위험이 없어요.',
    },
  ]

  if (data.houseType === '빌라' || data.houseType === '다가구') {
    items.push({
      label: '선순위 임차인',
      status: data.hasPriority ? '경고' : '안전',
      desc: data.hasPriority ? '선순위 임차인 있음' : '선순위 없음',
      reason: data.hasPriority
        ? '나보다 먼저 입주한 세입자가 있으면 경매 시 그 보증금이 내 것보다 먼저 배당돼요. 주민센터에서 전입세대 열람으로 확인하세요.'
        : '선순위 임차인이 없어 배당 순서에서 유리해요.',
    })
  }

  const dangerCount = items.filter(i => i.status === '위험').length
  const cautionCount = items.filter(i => i.status === '경고').length
  const risk: RiskLevel = dangerCount > 0 ? '위험' : cautionCount > 0 ? '경고' : '안전'

  const riskReason = risk === '위험'
    ? '위험 항목이 발견됐어요. 계약 전 반드시 전문가 상담이 필요해요.'
    : risk === '경고'
    ? '주의가 필요한 항목이 있어요. 아래 내용을 꼼꼼히 확인한 후 계약하세요.'
    : '현재 입력 기준으로 큰 위험 요소는 없어요. 계약 당일 등기부를 재확인하세요.'

  return {
    leaseRatio, combinedRatio, risk, riskReason, items, insuranceOk, th,
    recoverRatio, recoverRatioHigh, recoverable, recoverHigh,
    auctionLow, auctionHigh, auctionExecCost, smallTenantPriority,
  }
}

function CheckInterviewTab() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<CheckDataFull>({
    address: '', houseType: null, salePrice: '', deposit: '', mortgage: '',
    hasPriority: null, hasSeizure: null, hasTax: null,
  })
  const [done, setDone] = useState(false)
  const [region, setRegion] = useState('지방')
  const [apiPrice, setApiPrice] = useState<number | null>(null)
  const [apiLoading, setApiLoading] = useState(false)

  const totalSteps = 4
  const progress = Math.round(((step + 1) / (totalSteps + 1)) * 100)
  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => Math.max(0, s - 1))
  const restart = () => {
    setStep(0); setDone(false); setRegion('지방'); setApiPrice(null)
    setData({ address: '', houseType: null, salePrice: '', deposit: '', mortgage: '', hasPriority: null, hasSeizure: null, hasTax: null })
  }

  const fetchPrice = async (address: string, houseType: string) => {
    if (!address.trim()) return
    setApiLoading(true)
    try {
      const res = await fetch(`/api/price?address=${encodeURIComponent(address)}&houseType=${houseType}`)
      const json = await res.json()
      if (json.median) {
        setApiPrice(json.median)
        setRegion(json.region ?? '지방')
        setData(d => ({ ...d, salePrice: d.salePrice || String(json.median) }))
      }
      if (json.region) setRegion(json.region)
    } catch {}
    setApiLoading(false)
  }

  const regionLabel: Record<string, string> = {
    '서울': '서울 (위험 기준: 전세가율 80% 이상)',
    '수도권': '수도권 (위험 기준: 전세가율 75% 이상)',
    '광역시': '광역시 (위험 기준: 전세가율 70% 이상)',
    '지방': '지방 (위험 기준: 전세가율 65% 이상)',
  }

  if (done) {
    const r = calcCheckResultFull(data, region)
    const sale = Number(data.salePrice)
    const dep = Number(data.deposit)
    const mort = Number(data.mortgage) || 0

    return (
      <div className="space-y-4">
        <button onClick={restart} className="text-sm text-gray-400 hover:text-black">← 처음으로</button>

        {/* 위험도 요약 */}
        <div className={`rounded-2xl p-6 ${r.risk === '위험' ? 'bg-red-50 border border-red-200' : r.risk === '경고' ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xl font-black">{r.risk === '위험' ? '계약을 멈추세요.' : r.risk === '경고' ? '주의가 필요해요.' : '비교적 안전해요.'}</p>
            <RiskBadge level={r.risk} size="lg" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{r.riskReason}</p>
          <p className="text-xs text-gray-400 mt-2">{data.address} · {region}</p>
        </div>

        {/* 경매 시 우선순위 시뮬레이션 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <div>
            <p className="font-black text-sm">경매 시 내 보증금 회수 시뮬레이션</p>
            <p className="text-xs text-gray-400 mt-0.5">낙찰가 70~85% 기준 · 입력한 근저당은 전부 선순위로 가정해요</p>
          </div>

          {/* 배분 순서 */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-gray-100">
              <span className="text-gray-600">① 경매 낙찰 추정가</span>
              <span className="font-bold">{r.auctionLow.toLocaleString()}~{r.auctionHigh.toLocaleString()}만원</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-gray-50">
              <span className="text-gray-500">② - 집행 비용 (약 3%)</span>
              <span className="font-bold text-gray-500">-{r.auctionExecCost.toLocaleString()}만원</span>
            </div>
            {data.hasTax && (
              <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-red-50">
                <span className="text-red-600">③ - 세금 체납</span>
                <span className="font-bold text-red-500">금액 미상 ⚠️</span>
              </div>
            )}
            {r.smallTenantPriority > 0 && (
              <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-blue-50">
                <span className="text-blue-600">{data.hasTax ? '④' : '③'} 소액임차인 최우선변제</span>
                <span className="font-bold text-blue-600">+{r.smallTenantPriority.toLocaleString()}만원 먼저 확보</span>
              </div>
            )}
            {mort > 0 && (
              <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-orange-50">
                <span className="text-orange-600">{r.smallTenantPriority > 0 ? (data.hasTax ? '⑤' : '④') : (data.hasTax ? '④' : '③')} - 선순위 근저당</span>
                <span className="font-bold text-orange-500">-{mort.toLocaleString()}만원</span>
              </div>
            )}
            <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${r.recoverRatio >= 80 ? 'bg-green-100' : r.recoverRatio >= 50 ? 'bg-orange-100' : 'bg-red-100'}`}>
              <span className="font-bold">내 보증금 회수 가능액</span>
              <span className="font-bold">{r.recoverable.toLocaleString()}~{r.recoverHigh.toLocaleString()}만원</span>
            </div>
          </div>

          {/* 회수율 */}
          <div className={`rounded-xl p-3 text-center ${r.recoverRatio >= 80 ? 'bg-green-50' : r.recoverRatio >= 50 ? 'bg-orange-50' : 'bg-red-50'}`}>
            <p className="text-xs text-gray-500">보증금 회수 예상 비율</p>
            <p className={`text-2xl font-black mt-1 ${r.recoverRatio >= 80 ? 'text-green-600' : r.recoverRatio >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
              {r.recoverRatio}~{r.recoverRatioHigh}%
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{dep.toLocaleString()}만원 중 약 {r.recoverable.toLocaleString()}~{r.recoverHigh.toLocaleString()}만원</p>
          </div>

          {/* 면책 문구 */}
          <p className="text-xs text-gray-400 leading-relaxed">
            ※ 이 시뮬레이션은 참고용이에요. 실제 경매 결과는 낙찰가·체납세액·배분 이의 여부에 따라 달라질 수 있어요. 정확한 판단은 법무사·변호사 상담을 권장해요.
          </p>
        </div>

        {/* 전세보증보험 */}
        <div className={`rounded-2xl p-4 border ${r.insuranceOk ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black">전세보증보험 가입 {r.insuranceOk ? '가능 ✓' : '불가 ✗'}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {r.insuranceOk
                  ? 'HUG 또는 SGI에서 가입 가능해요. 꼭 가입하세요!'
                  : `전세가율 90% 초과 또는 보증금 한도 초과 (${region === '서울' || region === '수도권' ? '수도권 7억' : '지방 5억'} 이하만 가입 가능)`}
              </p>
            </div>
          </div>
        </div>

        {/* 항목별 결과 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <p className="font-black text-sm">항목별 분석</p>
          {r.items.map(item => (
            <div key={item.label} className="space-y-1.5 py-3 border-b border-gray-50 last:border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <RiskBadge level={item.status} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.reason}</p>
            </div>
          ))}
        </div>

        <Link href="/support" className="block text-center bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors text-sm">
          피해 시 대처방법 보러가기 →
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/law" className="flex flex-col items-center justify-center gap-1 border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl hover:border-black hover:bg-gray-50 transition-colors text-xs text-center">
            <span className="text-lg">⚖️</span>
            법률정보 확인하러 가기
          </Link>
          <Link href="/lawyers" className="flex flex-col items-center justify-center gap-1 bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors text-xs text-center">
            <span className="text-lg">👤</span>
            부동산 변호사 상담받기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>내 집 위험도 체크</span>
          <span>{step + 1} / {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-black h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step 1: 주소 */}
      {step === 0 && (
        <AddressStep
          value={data.address}
          onChange={v => setData(d => ({ ...d, address: v }))}
          onNext={next}
        />
      )}

      {/* Step 2: 집 유형 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Step 2</p>
            <h2 className="text-xl font-black">어떤 종류의 집인가요?</h2>
            <p className="text-sm text-gray-400 mt-1">집 유형에 따라 확인 항목이 달라져요</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {houseTypeCheckOptions.map(opt => (
              <button
                key={opt.label}
                onClick={() => {
                  setData(d => ({ ...d, houseType: opt.label }))
                  fetchPrice(data.address, opt.label)
                  next()
                }}
                className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5 hover:border-black transition-colors"
              >
                <span className="text-3xl">{opt.emoji}</span>
                <span className="font-bold text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
          <button onClick={back} className="text-sm text-gray-400 hover:text-black">← 이전</button>
        </div>
      )}

      {/* Step 3: 계약 조건 */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Step 3</p>
            <h2 className="text-xl font-black">계약 조건을 알려주세요</h2>
            <p className="text-sm text-gray-400 mt-1">만원 단위로 입력해주세요</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
            {apiLoading && <p className="text-xs text-gray-400 text-center">실거래가 조회 중...</p>}
            {apiPrice && !apiLoading && (
              <div className="bg-blue-50 rounded-xl px-3 py-2 text-xs text-blue-700">
                📊 최근 실거래 중간값 <span className="font-black">{apiPrice.toLocaleString()}만원</span> — 매매가 참고값으로 자동 입력했어요
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">매매가 (만원)</label>
              <input type="number" placeholder="예) 30000" value={data.salePrice}
                onChange={e => setData(d => ({ ...d, salePrice: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black" autoFocus />
              {data.salePrice && <p className="text-xs text-gray-400 mt-1">{Number(data.salePrice).toLocaleString()}만원 = {toEok(data.salePrice)}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">전세 보증금 (만원)</label>
              <input type="number" placeholder="예) 20000" value={data.deposit}
                onChange={e => setData(d => ({ ...d, deposit: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              {data.deposit && <p className="text-xs text-gray-400 mt-1">{Number(data.deposit).toLocaleString()}만원 = {toEok(data.deposit)}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">근저당 금액 (만원, 없으면 0)</label>
              <input type="number" placeholder="예) 5000" value={data.mortgage}
                onChange={e => setData(d => ({ ...d, mortgage: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              {data.mortgage && <p className="text-xs text-gray-400 mt-1">{Number(data.mortgage).toLocaleString()}만원 = {toEok(data.mortgage)}</p>}
            </div>
            {data.salePrice && data.deposit && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">전세가율</p>
                <p className="text-2xl font-black">{Math.round((Number(data.deposit) / Number(data.salePrice)) * 100)}%</p>
                {data.mortgage && <p className="text-xs text-gray-400 mt-0.5">근저당 합산 {Math.round(((Number(data.deposit) + Number(data.mortgage)) / Number(data.salePrice)) * 100)}%</p>}
              </div>
            )}
          </div>
          <button onClick={next} disabled={!data.salePrice || !data.deposit}
            className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-30">
            다음
          </button>
          <button onClick={back} className="text-sm text-gray-400 hover:text-black">← 이전</button>
        </div>
      )}

      {/* Step 4: 추가 확인 */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Step 4</p>
            <h2 className="text-xl font-black">추가로 확인해주세요</h2>
            <p className="text-sm text-gray-400 mt-1">해당하는 항목을 선택해주세요</p>
          </div>
          <div className="space-y-3">
            {[
              { key: 'hasSeizure' as const, emoji: '⚠️', label: '압류·가압류 이력이 있어요', desc: '등기부 을구에서 확인 가능해요' },
              { key: 'hasTax' as const, emoji: '📋', label: '집주인 세금 체납이 의심돼요', desc: '세무서에서 무료 조회 가능해요' },
              ...(data.houseType === '빌라' || data.houseType === '다가구'
                ? [{ key: 'hasPriority' as const, emoji: '👥', label: '선순위 임차인이 있어요', desc: '주민센터 전입세대 열람으로 확인해요' }]
                : []),
            ].map(opt => {
              const val = data[opt.key]
              return (
                <div key={opt.key} className="bg-white border border-gray-100 rounded-2xl p-4">
                  <p className="text-sm font-bold mb-2">{opt.emoji} {opt.label}</p>
                  <p className="text-xs text-gray-400 mb-3">{opt.desc}</p>
                  <div className="flex gap-2">
                    {[{ label: '예', v: true }, { label: '아니요', v: false }, { label: '모름', v: null }].map(btn => (
                      <button key={btn.label} onClick={() => setData(d => ({ ...d, [opt.key]: btn.v }))}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${val === btn.v ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <button onClick={() => setDone(true)}
            className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors">
            위험도 분석하기
          </button>
          <button onClick={back} className="text-sm text-gray-400 hover:text-black">← 이전</button>
        </div>
      )}
    </div>
  )
}

// ─── 계약 전 체크 인터뷰 ───────────────────────────────────────
type Stage = '집을 찾는 중' | '계약 직전' | '계약금 입금 전' | '잔금 전'
type HouseType = '아파트' | '빌라' | '오피스텔' | '다가구'

interface InterviewData {
  stage: Stage | null
  houseType: HouseType | null
  deposit: string
  knowAddress: boolean | null
}

const stageOptions: { label: Stage; emoji: string; desc: string }[] = [
  { label: '집을 찾는 중', emoji: '🏠', desc: '아직 매물 보는 단계예요' },
  { label: '계약 직전', emoji: '📝', desc: '곧 계약서 쓸 예정이에요' },
  { label: '계약금 입금 전', emoji: '💰', desc: '계약서는 썼어요' },
  { label: '잔금 전', emoji: '🔑', desc: '입주 직전이에요' },
]

const houseOptions: { label: HouseType; emoji: string }[] = [
  { label: '아파트', emoji: '🏢' },
  { label: '빌라', emoji: '🏘️' },
  { label: '오피스텔', emoji: '🏙️' },
  { label: '다가구', emoji: '🏚️' },
]

type CheckItem = { icon: string; title: string; desc: string; question: string; urgent: boolean }

function getCheckItems(data: InterviewData): CheckItem[] {
  const base: CheckItem[] = [
    {
      icon: '📜', title: '등기부등본 발급', urgent: true,
      desc: '대법원 인터넷등기소(iros.go.kr)에서 700원에 즉시 발급돼요. 계약 당일 최신본을 다시 확인하세요.',
      question: '등기부등본 기준 현재 근저당 설정 금액이 얼마인가요?',
    },
    {
      icon: '👤', title: '집주인 실소유 확인', urgent: true,
      desc: '신분증의 이름·생년월일과 등기부 갑구의 소유자가 일치하는지 직접 눈으로 확인하세요.',
      question: '집주인 분 신분증 직접 확인 가능한가요?',
    },
    {
      icon: '🏦', title: '근저당 + 보증금 합산 확인', urgent: true,
      desc: '근저당액 + 내 보증금이 매매가의 80%를 넘으면 깡통전세 위험이 있어요.',
      question: '현재 근저당 포함 총 채권 금액이 얼마인가요?',
    },
    {
      icon: '🛡️', title: '전세보증보험 가입', urgent: false,
      desc: 'HUG(주택도시보증공사) 또는 SGI서울보증에서 가입 가능 여부를 먼저 확인하세요.',
      question: '전세보증보험 가입 동의 특약을 계약서에 넣어주실 수 있나요?',
    },
  ]

  const extra: CheckItem[] = []

  if (data.houseType === '빌라' || data.houseType === '다가구') {
    extra.push({
      icon: '⚠️', title: '신탁 등기 확인', urgent: true,
      desc: '등기부 갑구에 "신탁" 문구가 있으면 집주인이 아닌 신탁사 동의 없이는 계약이 무효가 될 수 있어요.',
      question: '신탁 등기 여부 확인 부탁드립니다. 있다면 수탁자 동의서도 받을 수 있나요?',
    })
    extra.push({
      icon: '👥', title: '선순위 임차인 확인', urgent: true,
      desc: '이미 살고 있는 임차인 보증금 총액이 클수록 내 보증금이 위험해져요.',
      question: '현재 선순위 임차인 보증금 총액이 얼마인가요?',
    })
  }

  if (data.houseType === '오피스텔') {
    extra.push({
      icon: '📋', title: '임대사업자 등록 확인', urgent: false,
      desc: '집주인이 임대사업자로 등록된 경우 세입자 보호 혜택이 달라질 수 있어요.',
      question: '집주인 분이 임대사업자로 등록되어 계신가요?',
    })
  }

  if (data.stage === '계약금 입금 전' || data.stage === '잔금 전') {
    extra.push({
      icon: '📅', title: '확정일자 + 전입신고', urgent: true,
      desc: '잔금 지급 당일 바로 주민센터에서 전입신고 + 확정일자를 받아야 해요. 하루라도 늦으면 보호를 못 받아요.',
      question: '잔금일 당일 등기부등본 재확인 후 이상 없을 때만 잔금 지급 조건으로 특약 넣어주실 수 있나요?',
    })
  }

  return [...extra.filter(e => e.urgent), ...base, ...extra.filter(e => !e.urgent)]
}

function getRiskLevel(data: InterviewData): RiskLevel {
  const deposit = Number(data.deposit)
  if (data.stage === '잔금 전' && deposit > 30000) return '위험'
  if (data.houseType === '빌라' || data.houseType === '다가구') return '경고'
  if (data.stage === '계약금 입금 전') return '경고'
  return '안전'
}

function getRiskTitle(risk: RiskLevel, stage: Stage | null) {
  if (risk === '위험') return '오늘 계약하지 마세요.'
  if (risk === '경고') return '주의가 필요해요.'
  return stage === '집을 찾는 중' ? '미리 알아두면 안전해요.' : '기본 체크는 꼭 하세요.'
}

function getRiskReason(data: InterviewData, risk: RiskLevel): string {
  const deposit = Number(data.deposit)
  if (risk === '위험') return `잔금 전 ${deposit.toLocaleString()}만원 — 등기 상태가 바뀌기 전에 즉시 확인하세요.`
  if (data.houseType === '빌라' || data.houseType === '다가구') return `${data.houseType}은 선순위 임차인·신탁 등기 위험이 있어 꼼꼼히 확인이 필요해요.`
  if (data.stage === '계약금 입금 전') return `계약금 입금 후 잔금 전, 확정일자·전입신고 준비가 꼭 필요해요.`
  return `아직 ${data.stage} 단계라 여유 있게 체크할 수 있어요.`
}

function getAllQuestions(data: InterviewData): string[] {
  return getCheckItems(data).map(item => item.question)
}

// ─── 인터뷰 컴포넌트 ────────────────────────────────────────────
function InterviewTab({ onSwitchToCheck }: { onSwitchToCheck: () => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<InterviewData>({ stage: null, houseType: null, deposit: '', knowAddress: null })
  const [done, setDone] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const totalSteps = 4
  const progress = Math.round((step / totalSteps) * 100)

  const next = () => setStep(s => s + 1)
  const restart = () => { setDone(false); setStep(0); setData({ stage: null, houseType: null, deposit: '', knowAddress: null }) }
  const back = () => setStep(s => Math.max(0, s - 1))

  const handleKnowAddress = (know: boolean) => {
    setData(d => ({ ...d, knowAddress: know }))
    if (know) {
      onSwitchToCheck()
    } else {
      setDone(true)
    }
  }

  const saveAsJpg = () => downloadChecklistAsJpg({})

  const copyQuestions = () => {
    const questions = getAllQuestions(data)
    const text = `[집터뷰 - 공인중개사 확인 질문]\n\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
    navigator.clipboard.writeText(text)
    alert('클립보드에 복사됐어요!')
  }

  // 결과 화면
  if (done) {
    const risk = getRiskLevel(data)
    const title = getRiskTitle(risk, data.stage)
    const reason = getRiskReason(data, risk)
    const items = getCheckItems(data)

    return (
      <div className="space-y-4">
        <button onClick={restart} className="text-sm text-gray-400 hover:text-black">← 처음으로</button>

        <div ref={resultRef} className="space-y-4 bg-white p-1 rounded-3xl">
          {/* 위험도 */}
          <div className={`rounded-2xl p-6 ${risk === '위험' ? 'bg-red-50 border border-red-200' : risk === '경고' ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-black">{title}</p>
              <RiskBadge level={risk} size="lg" />
            </div>
            <p className="text-xs text-gray-500 truncate">{reason}</p>
            <p className="text-xs text-gray-400 mt-1">{data.houseType} · {Number(data.deposit).toLocaleString()}만원 · {data.stage}</p>
          </div>

          {/* 지금 해야 할 일 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <p className="font-black text-sm">지금 해야 할 일</p>
            {items.map((item, i) => (
              <div key={i} className="space-y-1.5 py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-black shrink-0">{i + 1}</span>
                  <p className="text-sm font-bold flex-1">{item.icon} {item.title}</p>
                  {item.urgent && <span className="text-xs text-red-500 font-bold shrink-0">필수</span>}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed ml-7">{item.desc}</p>
                <div className="ml-7 bg-gray-50 rounded-xl px-3 py-2">
                  <p className="text-xs text-gray-400 font-medium mb-0.5">💬 중개사에게 물어보세요</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{item.question}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 집터뷰 워터마크 */}
          <p className="text-center text-xs text-gray-300 pb-1">집터뷰 — 전세사기 예방 서비스</p>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={copyQuestions}
            className="border border-gray-200 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm"
          >
            📋 공인중개사 질문 복사하기
          </button>
          <button
            onClick={saveAsJpg}
            className="bg-black text-white font-bold py-3 rounded-2xl hover:bg-gray-800 transition-colors text-sm"
          >
            📥 체크리스트 이미지로 저장하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 진행률 */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>계약 전 체크하기</span>
          <span>{step + 1} / {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-black h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step 0: 계약 진행 상황 */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Step 1</p>
            <h2 className="text-xl font-black">계약은 몇 % 진행됐나요?</h2>
            <p className="text-sm text-gray-400 mt-1">현재 상황을 선택해주세요</p>
          </div>
          <div className="space-y-3">
            {stageOptions.map(opt => (
              <button
                key={opt.label}
                onClick={() => { setData(d => ({ ...d, stage: opt.label })); next() }}
                className="w-full flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-black transition-colors text-left"
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <p className="font-bold text-sm">{opt.label}</p>
                  <p className="text-xs text-gray-400">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: 집 유형 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Step 2</p>
            <h2 className="text-xl font-black">어떤 집을 보고 계신가요?</h2>
            <p className="text-sm text-gray-400 mt-1">집 유형에 따라 확인 항목이 달라져요</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {houseOptions.map(opt => (
              <button
                key={opt.label}
                onClick={() => { setData(d => ({ ...d, houseType: opt.label })); next() }}
                className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5 hover:border-black transition-colors"
              >
                <span className="text-3xl">{opt.emoji}</span>
                <span className="font-bold text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
          <button onClick={back} className="text-sm text-gray-400 hover:text-black">← 이전</button>
        </div>
      )}

      {/* Step 2: 보증금 */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Step 3</p>
            <h2 className="text-xl font-black">보증금은 얼마인가요?</h2>
            <p className="text-sm text-gray-400 mt-1">만원 단위로 입력해주세요</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
            <input
              type="number"
              placeholder="예) 20000"
              value={data.deposit}
              onChange={e => setData(d => ({ ...d, deposit: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
            />
            {data.deposit && (
              <p className="text-xs text-gray-400 mt-1">
                {Number(data.deposit).toLocaleString()}만원 = {toEok(data.deposit)}
              </p>
            )}
          </div>
          <button
            onClick={next}
            disabled={!data.deposit}
            className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-30"
          >
            다음
          </button>
          <button onClick={back} className="text-sm text-gray-400 hover:text-black">← 이전</button>
        </div>
      )}

      {/* Step 3: 주소 아는지 */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Step 4</p>
            <h2 className="text-xl font-black">주소를 알고 계신가요?</h2>
            <p className="text-sm text-gray-400 mt-1">주소를 알면 위험도를 더 정확하게 분석할 수 있어요</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => handleKnowAddress(true)}
              className="w-full flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-black transition-colors text-left"
            >
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold text-sm">네, 알아요</p>
                <p className="text-xs text-gray-400">주소 입력해서 위험도 분석하기</p>
              </div>
            </button>
            <button
              onClick={() => handleKnowAddress(false)}
              className="w-full flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-black transition-colors text-left"
            >
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-bold text-sm">아니요, 몰라요</p>
                <p className="text-xs text-gray-400">지금 확인해야 할 항목 보기</p>
              </div>
            </button>
          </div>
          <button onClick={back} className="text-sm text-gray-400 hover:text-black">← 이전</button>
        </div>
      )}
    </div>
  )
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────────
function CheckContent() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'checklist' ? 'checklist' : 'check'
  const [activeTab, setActiveTab] = useState<'check' | 'checklist'>(initialTab)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 탭 */}
      <div className="flex bg-gray-100 rounded-2xl p-1">
        <button
          onClick={() => setActiveTab('check')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'check' ? 'bg-black text-white shadow' : 'text-gray-400'}`}
        >
          내 집 체크하기
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'checklist' ? 'bg-black text-white shadow' : 'text-gray-400'}`}
        >
          계약 전 체크하기
        </button>
      </div>

      {/* 내 집 체크하기 — 인터뷰 */}
      {activeTab === 'check' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black">내 집 체크하기</h1>
            <p className="text-sm text-gray-400 mt-1">매물 정보를 입력하면 전세 위험도를 분석해드려요</p>
          </div>
          <CheckInterviewTab />
        </div>
      )}

      {/* 계약 전 체크하기 — 인터뷰 */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black">계약 전 체크하기</h1>
            <p className="text-sm text-gray-400 mt-1">계약 단계별로 꼭 확인해야 할 항목을 알려드려요</p>
          </div>
          <InterviewTab onSwitchToCheck={() => setActiveTab('check')} />
        </div>
      )}
    </div>
  )
}

export default function CheckPage() {
  return (
    <Suspense>
      <CheckContent />
    </Suspense>
  )
}
