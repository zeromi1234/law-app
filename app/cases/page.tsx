'use client'

import { useState } from 'react'
import Link from 'next/link'

const cases = [
  {
    id: 1,
    type: '깡통전세',
    title: '전세가율 95% 빌라, 집값 폭락 후 보증금 증발',
    location: '서울 강서구',
    amount: '1억 8천만원',
    summary: '2022년 매매가 2억 빌라에 전세 1억 8천만원 계약. 이후 집값이 1억 5천만원으로 하락하며 집주인이 보증금 반환 불가 통보.',
    cause: '전세가율 95%로 처음부터 위험 구간이었으나 공인중개사가 안전하다고 안내함.',
    result: '경매 진행 후 낙찰가 1억 4천만원. 선순위 근저당 6천만원 변제 후 임차인에게 돌아온 금액 없음.',
    lesson: '전세가율 80% 이상 매물은 반드시 기피하고, 전세보증보험 가입 여부를 사전 확인해야 합니다.',
    tag: '깡통전세',
  },
  {
    id: 2,
    type: '신탁사기',
    title: '신탁 등기된 건물, 집주인인 척한 수탁자',
    location: '경기 화성시',
    amount: '2억 3천만원',
    summary: '오피스텔 전세 계약 시 등기부등본에 신탁 등기가 있었으나 공인중개사가 문제없다고 해 계약 진행. 이후 신탁회사가 건물 매각.',
    cause: '신탁 등기 건물의 경우 수익자(집주인)가 아닌 수탁자(신탁회사)만이 임대 권한을 가짐.',
    result: '신탁회사 건물 매각 후 임차인의 보증금은 후순위로 밀려 전액 미반환.',
    lesson: '등기부등본 갑구에 신탁 등기 여부 반드시 확인. 신탁 건물은 신탁회사와 직접 계약해야 합니다.',
    tag: '신탁사기',
  },
  {
    id: 3,
    type: '이중계약',
    title: '한 집에 임차인 3명, 집주인의 이중 계약',
    location: '서울 노원구',
    amount: '각 8천만원',
    summary: '단독주택 1층을 집주인이 3명의 임차인과 각각 전세 계약 체결. 임차인들은 서로의 존재를 몰랐음.',
    cause: '임차인들이 전입신고를 서로 다른 날짜에 했고, 선순위 임차인이 대항력을 먼저 취득함.',
    result: '선입신고 가장 빠른 임차인만 일부 보증금 회수. 나머지 2명은 전액 피해.',
    lesson: '다가구·단독주택의 경우 주민센터에서 전입 세대 열람을 통해 선순위 임차인 보증금을 반드시 확인해야 합니다.',
    tag: '이중계약',
  },
  {
    id: 4,
    type: '세금체납',
    title: '집주인 세금 9천만원 체납, 경매 후 국세 우선변제',
    location: '부산 남구',
    amount: '1억 5천만원',
    summary: '매매가 2억 5천만원 아파트에 전세 1억 5천만원 계약. 집주인이 국세 9천만원을 체납한 상태였으나 계약 전 확인하지 않음.',
    cause: '2023년 이전에는 임차인이 임대인의 세금 체납을 확인할 방법이 제한적이었음.',
    result: '경매 후 국가 세금 채권이 임차인 보증금보다 우선 변제. 보증금 3천만원만 회수.',
    lesson: '2023년부터 임차인은 임대인 동의 없이 세무서에서 체납 조회 가능. 반드시 활용하세요.',
    tag: '세금체납',
  },
  {
    id: 5,
    type: '미등기건물',
    title: '미등기 신축빌라, 계약 후 등기 불가 통보',
    location: '인천 미추홀구',
    amount: '1억 2천만원',
    summary: '신축 빌라 홍보에 혹해 계약. 잔금 납부 후 건물이 미등기 상태로 전입신고 주소 등록 불가.',
    cause: '건물 준공 후 등기를 마치지 않은 상태에서 분양·임대를 진행한 사기 사례.',
    result: '전입신고 불가 → 대항력 미취득 → 집주인 잠적 → 보증금 전액 피해.',
    lesson: '계약 전 등기부등본으로 건물 등기 완료 여부 확인 필수. 미등기 건물은 절대 계약하면 안 됩니다.',
    tag: '미등기',
  },
  {
    id: 6,
    type: '공인중개사 공모',
    title: '공인중개사와 집주인의 조직적 사기',
    location: '서울 구로구',
    amount: '피해자 47명, 총 68억원',
    summary: '공인중개사가 시세보다 낮은 전세가를 제시해 피해자를 모집. 집주인과 공모해 받은 보증금을 빼돌린 후 잠적.',
    cause: '허위 시세 정보 제공, 등기부등본 위조, 보증금 편취 목적의 조직적 범행.',
    result: '피해자 47명 중 보증금 회수한 사람 없음. 주범 구속 기소.',
    lesson: '시세보다 현저히 저렴한 매물은 반드시 의심. 공인중개사 자격 여부와 직접 등기부등본 열람으로 확인해야 합니다.',
    tag: '공모사기',
  },
]

const tags = ['전체', '깡통전세', '신탁사기', '이중계약', '세금체납', '미등기', '공모사기']

export default function CasesPage() {
  const [selected, setSelected] = useState('전체')
  const [openId, setOpenId] = useState<number | null>(null)

  const filtered = selected === '전체' ? cases : cases.filter(c => c.tag === selected)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">전세사기 피해 사례</h1>
        <p className="text-sm text-gray-400 mt-1">실제 피해 사례로 배우는 전세사기 유형</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelected(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === tag ? 'bg-black text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-black'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenId(openId === c.id ? null : c.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">{c.tag}</span>
                    <span className="text-xs text-gray-400">{c.location}</span>
                  </div>
                  <h3 className="font-bold text-sm">{c.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">피해금액 <span className="font-semibold text-red-500">{c.amount}</span></p>
                </div>
                <span className="text-gray-300 text-lg">{openId === c.id ? '∧' : '∨'}</span>
              </div>
            </button>

            {openId === c.id && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                {[
                  { label: '사건 개요', content: c.summary },
                  { label: '사기 원인', content: c.cause },
                  { label: '결과', content: c.result },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
                  </div>
                ))}
                <div className="bg-black text-white rounded-xl p-4">
                  <p className="text-xs font-bold mb-1">핵심 교훈</p>
                  <p className="text-sm leading-relaxed">{c.lesson}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link href="/support" className="block text-center bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors">
        피해 발생 시 대처 방법 보기 →
      </Link>
    </div>
  )
}
