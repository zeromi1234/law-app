'use client'

import { useState } from 'react'
import { downloadChecklist } from '@/components/ChecklistPDF'

const steps = [
  {
    step: 1,
    title: '계약 전 — 등기부등본 확인',
    items: [
      '대법원 인터넷등기소에서 등기부등본 발급 (700원)',
      '을구에서 근저당 설정 금액 확인',
      '갑구에서 압류·가처분·경매 이력 확인',
      '소유자가 임대인과 동일인인지 확인',
      '근저당 + 전세보증금이 매매가의 80% 이하인지 확인',
    ],
  },
  {
    step: 2,
    title: '계약 전 — 집주인 확인',
    items: [
      '신분증으로 임대인 본인 여부 확인',
      '대리인 계약 시 위임장 + 인감증명서 확인',
      '관할 세무서에서 집주인 세금 체납 여부 조회',
      '건축물대장으로 건물 소유자 확인',
      '다가구 주택이라면 선순위 임차인 보증금 총액 확인',
    ],
  },
  {
    step: 3,
    title: '계약 당일 — 계약서 작성',
    items: [
      '계약서에 실제 주소·층수·호수 정확히 기재',
      '보증금 금액 숫자와 한글 병기 확인',
      '특약사항에 "전세보증보험 가입 동의" 명시',
      '잔금일에 등기부등본 재확인 조건 특약 추가',
      '확정일자 당일 받기 (주민센터 또는 온라인)',
    ],
  },
  {
    step: 4,
    title: '잔금일 — 입주 당일',
    items: [
      '잔금 지급 전 등기부등본 다시 한 번 확인',
      '잔금 지급 즉시 전입신고 (당일 완료)',
      '전입신고 완료 후 확정일자 확인',
      '전세보증보험 가입 신청 (HUG 또는 SGI)',
      '임대차 계약서 사본 안전한 곳에 보관',
    ],
  },
  {
    step: 5,
    title: '입주 후 — 계약 기간 중',
    items: [
      '집주인 변경 시 새 소유자에게 대항력 확인',
      '경매·공매 통지 수령 시 즉시 법률 상담',
      '계약 만료 2개월 전 갱신 또는 퇴거 의사 통보',
      '보증금 반환일 전 이사 금지 (대항력 유지)',
      '보증금 미반환 시 임차권등기명령 즉시 신청',
    ],
  },
]

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [openStep, setOpenStep] = useState<number>(1)
  const handleDownload = () => {
    downloadChecklist(checked)
  }

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  const totalItems = steps.flatMap((s) => s.items).length
  const checkedCount = Object.values(checked).filter(Boolean).length
  const progress = Math.round((checkedCount / totalItems) * 100)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">계약 전 체크리스트</h1>
        <p className="text-sm text-gray-400 mt-1">전세 계약 전 이 항목들을 반드시 확인하세요</p>
      </div>

      {/* 진행률 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">전체 진행률</span>
          <span className="text-sm font-black">{checkedCount}/{totalItems}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-black h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">
            {progress === 100 ? '✓ 모든 항목 확인 완료!' : `${100 - progress}% 남았어요`}
          </p>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            📄 PDF 저장
          </button>
        </div>
      </div>

      {/* 체크리스트 */}
      <div className="space-y-3">
        {steps.map((s) => {
          const stepChecked = s.items.filter((_, i) => checked[`${s.step}-${i}`]).length
          const isOpen = openStep === s.step
          return (
            <div key={s.step} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenStep(isOpen ? 0 : s.step)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${stepChecked === s.items.length ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {stepChecked === s.items.length ? '✓' : s.step}
                  </span>
                  <span className="font-bold text-sm">{s.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{stepChecked}/{s.items.length}</span>
                  <span className="text-gray-400">{isOpen ? '∧' : '∨'}</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 space-y-2 border-t border-gray-50">
                  {s.items.map((item, i) => {
                    const key = `${s.step}-${i}`
                    return (
                      <label key={key} className="flex items-start gap-3 cursor-pointer py-2">
                        <input
                          type="checkbox"
                          checked={!!checked[key]}
                          onChange={() => toggle(key)}
                          className="mt-0.5 w-4 h-4 accent-black shrink-0"
                        />
                        <span className={`text-sm leading-relaxed ${checked[key] ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                          {item}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
