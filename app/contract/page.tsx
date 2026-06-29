'use client'

import { useState } from 'react'

const clauses = [
  {
    id: 1,
    keyword: '묵시적 갱신',
    risk: '주의',
    title: '"별도 통보 없을 시 자동 연장"',
    desc: '계약 만료 2개월 전까지 의사 표시가 없으면 자동 연장됩니다. 임대인이 갱신 거절을 통보하지 않으면 동일 조건으로 2년 연장됩니다.',
    action: '만료 3개월 전 갱신 또는 퇴거 의사를 서면으로 통보하세요.',
    safe: false,
  },
  {
    id: 2,
    keyword: '원상복구',
    risk: '주의',
    title: '"임차인은 원상복구 의무를 진다"',
    desc: '원상복구 범위가 명확하지 않으면 퇴거 시 분쟁이 생길 수 있습니다. 정상적인 사용에 의한 마모는 임차인 부담이 아닙니다.',
    action: '입주 전 사진 촬영 후 보관. 원상복구 범위를 특약에 구체적으로 명시하세요.',
    safe: false,
  },
  {
    id: 3,
    keyword: '전세보증보험 동의',
    risk: '안전',
    title: '"임대인은 전세보증보험 가입에 동의한다"',
    desc: '임대인이 전세보증보험 가입에 동의한다는 특약이 있으면 보증금을 안전하게 보호받을 수 있습니다.',
    action: '이 특약이 없다면 반드시 추가 요청하세요.',
    safe: true,
  },
  {
    id: 4,
    keyword: '중도 해지 위약금',
    risk: '위험',
    title: '"계약 기간 중 임차인이 해지 시 보증금의 10% 위약금"',
    desc: '과도한 위약금 조항은 법적으로 무효가 될 수 있습니다. 그러나 분쟁이 생기면 시간과 비용이 소모됩니다.',
    action: '위약금 조항이 있다면 삭제하거나 합리적인 수준(1~2개월 월세)으로 협상하세요.',
    safe: false,
  },
  {
    id: 5,
    keyword: '시설 현황 고지',
    risk: '안전',
    title: '"임대인은 시설 현황을 사전에 고지한다"',
    desc: '누수, 결로, 하자 등 기존 시설 문제를 사전에 고지하는 조항이 있으면 입주 후 분쟁을 예방할 수 있습니다.',
    action: '이 특약과 함께 기존 하자 목록을 계약서에 첨부하세요.',
    safe: true,
  },
  {
    id: 6,
    keyword: '전대차 금지',
    risk: '주의',
    title: '"임차인은 임대인 동의 없이 전대할 수 없다"',
    desc: '법적으로 당연한 내용이지만, 에어비앤비 등 단기 임대도 전대에 해당할 수 있습니다.',
    action: '단기 임대를 계획 중이라면 계약 전 임대인과 협의하세요.',
    safe: false,
  },
  {
    id: 7,
    keyword: '근저당 추가 설정 금지',
    risk: '안전',
    title: '"임대인은 계약 기간 중 근저당을 추가 설정하지 않는다"',
    desc: '계약 후 집주인이 추가로 근저당을 설정해 보증금 반환이 어려워지는 상황을 방지합니다.',
    action: '이 특약이 없다면 반드시 추가하세요. 매우 중요한 보호 조항입니다.',
    safe: true,
  },
  {
    id: 8,
    keyword: '잔금일 등기 재확인',
    risk: '안전',
    title: '"잔금 지급 전 등기부등본을 재확인한다"',
    desc: '잔금일에 새로운 근저당이나 가압류가 설정될 수 있습니다. 잔금 직전 최종 확인 조항이 있으면 안전합니다.',
    action: '이 특약이 없다면 추가하세요. 잔금일 당일 오전에 등기부등본을 꼭 확인하세요.',
    safe: true,
  },
]

export default function ContractPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [filter, setFilter] = useState('전체')

  const filtered = filter === '전체' ? clauses : clauses.filter(c =>
    filter === '위험/주의' ? !c.safe : c.safe
  )

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">계약서 분석</h1>
        <p className="text-sm text-gray-400 mt-1">전세 계약서 주요 조항과 독소조항을 알아보세요</p>
      </div>

      <div className="flex gap-2">
        {['전체', '위험/주의', '안전 조항'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-black text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-black'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(clause => (
          <div key={clause.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setSelected(selected === clause.id ? null : clause.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      clause.safe ? 'bg-green-50 text-green-600' : clause.risk === '위험' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                    }`}>
                      {clause.safe ? '안전' : clause.risk}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">#{clause.keyword}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">{clause.title}</p>
                </div>
                <span className="text-gray-300 text-lg">{selected === clause.id ? '∧' : '∨'}</span>
              </div>
            </button>

            {selected === clause.id && (
              <div className="px-5 pb-5 space-y-3 border-t border-gray-50">
                <p className="text-sm text-gray-600 leading-relaxed">{clause.desc}</p>
                <div className={`rounded-xl p-4 ${clause.safe ? 'bg-green-50' : 'bg-orange-50'}`}>
                  <p className="text-xs font-bold mb-1">{clause.safe ? '✓ 이렇게 활용하세요' : '! 이렇게 대응하세요'}</p>
                  <p className="text-sm leading-relaxed">{clause.action}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
