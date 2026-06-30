'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    question: '둘 중 하나만 고른다면?',
    a: { label: '전입신고 했는데\n확정일자 깜빡 😅', emoji: '📋' },
    b: { label: '확정일자 받았는데\n전입신고 일주일 뒤 😬', emoji: '📅' },
    answer: 'a',
    explanation: '전입신고가 더 중요해요! 전입신고 다음날 0시부터 대항력이 생겨요. 확정일자는 나중에라도 받을 수 있지만, 전입신고가 늦으면 그 사이에 근저당이 설정될 수 있어요. 물론 둘 다 당일에 하는 게 최고!',
    tip: '꿀팁: 잔금 치르는 날 바로 전입신고하세요 🏃',
  },
  {
    id: 2,
    question: '어디 살래?',
    a: { label: '전세가율 85%\n깔끔한 신축 ✨', emoji: '🏢' },
    b: { label: '전세가율 55%\n오래된 구축 🏚️', emoji: '🏠' },
    answer: 'b',
    explanation: '전세가율 55% 구축을 선택하는 게 맞아요! 신축이 아무리 예뻐도 전세가율 85%는 위험 구간이에요. 집값이 조금만 떨어져도 보증금을 못 돌려받을 수 있어요. 안전한 집이 예쁜 집보다 낫습니다 😤',
    tip: '꿀팁: 전세가율 70% 이하 매물을 찾으세요 🔍',
  },
  {
    id: 3,
    question: '더 위험한 집주인은?',
    a: { label: '근저당 1억 설정한\n집주인 💸', emoji: '🏦' },
    b: { label: '세금 500만원\n체납한 집주인 🚨', emoji: '💰' },
    answer: 'b',
    explanation: '세금 체납한 집주인이 더 위험해요! 국세는 전세보증금보다 우선 변제돼요. 즉, 집이 경매에 넘어가면 국가가 먼저 세금 받아가고 남은 돈에서 보증금을 받아야 해요. 근저당은 금액에 따라 다르지만 체납은 무조건 빨간불 🚨',
    tip: '꿀팁: 세무서에서 집주인 세금 체납 무료 조회 가능해요',
  },
  {
    id: 4,
    question: '어떤 계약이 더 안전해?',
    a: { label: '보증금 3억\n전세보증보험 미가입 😰', emoji: '💎' },
    b: { label: '보증금 5억\n전세보증보험 가입 ✅', emoji: '🛡️' },
    answer: 'b',
    explanation: '보증금이 더 많아도 전세보증보험 가입이 훨씬 안전해요! 보험이 있으면 집주인이 돈을 안 돌려줘도 보증기관이 대신 돌려줘요. 보험료는 연 0.1~0.4% 정도라 생각보다 많이 비싸지 않아요 😌',
    tip: '꿀팁: HUG나 SGI서울보증에서 전세보증보험 가입하세요',
  },
  {
    id: 5,
    question: '계약서 어떤 게 나아?',
    a: { label: '특약 아무것도 없는\n깔끔한 계약서 📃', emoji: '✨' },
    b: { label: '특약이 빽빽하게\n적힌 계약서 📝', emoji: '📋' },
    answer: 'b',
    explanation: '특약이 많을수록 좋아요! 특약은 나를 보호하는 장치예요. "근저당 추가 설정 금지", "전세보증보험 동의", "잔금일 등기 재확인" 같은 내용을 넣을수록 분쟁 시 유리해요. 빈 계약서가 오히려 위험해요 😅',
    tip: '꿀팁: 계약서 분석 메뉴에서 필수 특약 확인하세요',
  },
  {
    id: 6,
    question: '어떤 상황이 더 무서워?',
    a: { label: '등기부등본에\n근저당이 잔뜩 🏋️', emoji: '📜' },
    b: { label: '집주인이 대리인으로\n계약하자고 함 👤', emoji: '🕵️' },
    answer: 'b',
    explanation: '대리인 계약이 더 무서워요! 실제 전세사기의 상당수가 대리인 계약으로 이루어져요. 위임장과 인감증명서를 요구하고, 가능하면 집주인과 직접 통화해서 확인하세요. 근저당은 금액을 보고 판단할 수 있지만 대리인 사기는 눈에 잘 안 보여요 🚨',
    tip: '꿀팁: 대리인 계약 시 인감증명서 + 위임장 반드시 확인',
  },
  {
    id: 7,
    question: '어디가 더 살기 안전해?',
    a: { label: '신탁 등기 된\n브랜드 신축 오피스텔 🏗️', emoji: '🏙️' },
    b: { label: '근저당 조금 있는\n일반 빌라 🏘️', emoji: '🏠' },
    answer: 'b',
    explanation: '신탁 등기 건물은 함정이 많아요! 신탁 건물은 수탁자(신탁회사)만 임대 권한이 있어요. 집주인인 척하는 수익자와 계약하면 나중에 신탁회사가 건물을 팔아도 보증금을 못 돌려받아요. 브랜드 신축이어도 신탁 등기라면 무조건 꼼꼼히 확인! 📋',
    tip: '꿀팁: 등기부등본 갑구에서 신탁 등기 여부 꼭 확인',
  },
  {
    id: 8,
    question: '이사 후 가장 먼저 할 일은?',
    a: { label: '짐 정리하고\n인증샷 찍기 📸', emoji: '🤳' },
    b: { label: '전입신고 하러\n주민센터 달려가기 🏃', emoji: '🏛️' },
    answer: 'b',
    explanation: '전입신고가 인증샷보다 백만 배 중요해요! 이사 당일 바로 전입신고를 완료해야 대항력이 생겨요. 전입신고를 미루는 사이에 집주인이 근저당을 추가로 설정할 수 있거든요. 짐 정리는 나중에 해도 돼요 😂',
    tip: '꿀팁: 정부24 앱으로 온라인 전입신고도 가능해요!',
  },
  {
    id: 9,
    question: '어떤 중개사를 믿을래?',
    a: { label: '집주인이 직접\n소개해준 중개사 🤝', emoji: '🏠' },
    b: { label: '내가 직접\n찾아낸 중개사 🔍', emoji: '🕵️' },
    answer: 'b',
    explanation: '집주인이 소개한 중개사는 사실상 집주인 편일 수 있어요. 실제 전세사기 사건 중 상당수가 집주인-중개사 공모였어요. 나를 대변해줄 중개사는 내가 직접 찾는 게 훨씬 안전해요! 🚨',
    tip: '꿀팁: 한국공인중개사협회 앱에서 자격증 조회 가능해요',
  },
  {
    id: 10,
    question: '어떤 계약이 더 현명해?',
    a: { label: '전세보증보험 없는\n저렴한 전세 🏠', emoji: '💸' },
    b: { label: '보험료 내고\n전세보증보험 가입한 전세 🛡️', emoji: '✅' },
    answer: 'b',
    explanation: '보험료가 아깝게 느껴져도 보증보험은 필수예요! 연 보험료는 보증금의 약 0.1~0.4% 수준이에요. 보증금 2억이면 연 20~80만원 정도. 반면 보증금을 못 돌려받으면 수억 원을 잃을 수 있어요. 이 보험이 최고의 보험이에요 💪',
    tip: '꿀팁: HUG 전세보증보험은 보증금 5억 이하면 대부분 가입 가능해요',
  },
  {
    id: 11,
    question: '다가구 주택 계약 전 확인할 것은?',
    a: { label: '집 컨디션이랑\n주변 환경만 체크 🌿', emoji: '🏡' },
    b: { label: '선순위 임차인\n보증금 총액 확인 📋', emoji: '👥' },
    answer: 'b',
    explanation: '다가구 주택은 한 건물에 여러 임차인이 있어요. 내가 보증금을 2억 냈어도 먼저 들어온 세입자 합산 보증금이 크면, 경매 시 내 차례까지 돈이 남지 않을 수 있어요. 주민센터에서 전입 세대 열람 꼭 하세요! 📋',
    tip: '꿀팁: 임대차 계약 전 주민센터 방문해 전입세대 열람 신청 가능해요',
  },
  {
    id: 12,
    question: '계약금 입금 직전 마지막으로 할 일은?',
    a: { label: '계약서 한 번 더\n꼼꼼히 읽기 📄', emoji: '📝' },
    b: { label: '등기부등본 실시간\n재발급해서 확인 📜', emoji: '🖨️' },
    answer: 'b',
    explanation: '계약 직전 등기부등본을 다시 뽑아야 해요! 계약 협의 기간 중에 집주인이 몰래 근저당을 추가 설정할 수 있거든요. 계약서를 아무리 잘 읽어도 등기 변동을 놓치면 소용없어요. 입금 직전 반드시 재확인! ⚠️',
    tip: '꿀팁: 대법원 인터넷등기소에서 700원에 즉시 발급 가능해요',
  },
]

export default function BalancePage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<'a' | 'b' | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  const choose = (choice: 'a' | 'b') => {
    if (selected) return
    setSelected(choice)
    if (choice === q.answer) setScore(s => s + 1)
  }

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const getResultMessage = () => {
    const ratio = score / questions.length
    if (ratio >= 0.875) return { emoji: '🏆', title: '전세 고수!', desc: '당신은 이미 전세 전문가예요. 집터뷰가 더 검증해드릴게요.' }
    if (ratio >= 0.625) return { emoji: '👍', title: '제법인데요?', desc: '기본은 알고 있어요! 놓친 부분만 조금 더 확인해봐요.' }
    if (ratio >= 0.375) return { emoji: '😅', title: '조금 더 알아야 해요', desc: '전세 계약은 꼼꼼함이 생명! 집터뷰와 함께 공부해봐요.' }
    return { emoji: '🚨', title: '위험해요!', desc: '지금 바로 체크리스트부터 시작하세요. 보증금을 지켜야 해요!' }
  }

  if (finished) {
    const result = getResultMessage()
    return (
      <div className="max-w-lg mx-auto space-y-6 text-center">
        <h1 className="text-2xl font-black">결과 발표!</h1>
        <div className="bg-black text-white rounded-3xl p-10 space-y-4">
          <div className="text-6xl">{result.emoji}</div>
          <p className="text-3xl font-black">{score}/{questions.length}점</p>
          <p className="text-xl font-bold">{result.title}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{result.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={restart}
            className="border border-gray-200 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm"
          >
            다시 하기
          </button>
          <Link
            href="/checklist"
            className="bg-black text-white font-bold py-3 rounded-2xl hover:bg-gray-800 transition-colors text-sm text-center"
          >
            계약전 확인하기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">전세 밸런스 게임</h1>
        <p className="text-sm text-gray-400 mt-1">둘 중 더 안전한 선택은 뭘까요? 🤔</p>
      </div>

      {/* 진행률 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full transition-all duration-500"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-gray-400">{current + 1}/{questions.length}</span>
      </div>

      {/* 질문 */}
      <div className="bg-black text-white rounded-3xl p-6 text-center">
        <p className="text-lg font-black">{q.question}</p>
      </div>

      {/* 선택지 */}
      <div className="grid grid-cols-2 gap-4">
        {(['a', 'b'] as const).map((choice) => {
          const item = q[choice]
          const isSelected = selected === choice
          const isAnswer = selected && choice === q.answer
          const isWrong = selected === choice && choice !== q.answer

          return (
            <button
              key={choice}
              onClick={() => choose(choice)}
              disabled={!!selected}
              className={`rounded-3xl p-6 text-center space-y-3 border-2 transition-all duration-300 ${
                !selected
                  ? 'bg-white border-gray-100 hover:border-black hover:shadow-md active:scale-95'
                  : isAnswer
                  ? 'bg-green-50 border-green-400'
                  : isWrong
                  ? 'bg-red-50 border-red-300'
                  : 'bg-white border-gray-100 opacity-50'
              }`}
            >
              <div className="text-4xl">{item.emoji}</div>
              <p className="text-sm font-bold leading-relaxed whitespace-pre-line">{item.label}</p>
              {isSelected && (
                <div className={`text-xs font-black ${isAnswer ? 'text-green-600' : 'text-red-500'}`}>
                  {isAnswer ? '정답! ✓' : '오답 ✗'}
                </div>
              )}
              {selected && !isSelected && choice === q.answer && (
                <div className="text-xs font-black text-green-600">정답 ✓</div>
              )}
            </button>
          )
        })}
      </div>

      {/* 해설 */}
      {selected && (
        <div className="space-y-3 animate-in fade-in duration-300">
          <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
            <p className="font-black text-sm">
              {selected === q.answer ? '🎉 맞았어요!' : '😅 아쉬워요!'}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
            <p className="text-xs text-gray-400 font-medium mt-2">{q.tip}</p>
          </div>
          <button
            onClick={next}
            className="w-full bg-black text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-colors"
          >
            {current + 1 >= questions.length ? '결과 보기 🏆' : '다음 문제 →'}
          </button>
        </div>
      )}
    </div>
  )
}
