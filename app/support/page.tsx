'use client'

import { useState } from 'react'
import Link from 'next/link'

const steps = [
  {
    step: 1,
    title: '즉시 — 이사 나가지 마세요',
    color: 'bg-red-500',
    content: '보증금을 돌려받기 전에 절대 이사를 나가면 안 됩니다. 전입신고 + 점유를 유지해야 대항력이 살아 있습니다. 이사를 나가는 순간 법적 보호가 사라집니다.',
  },
  {
    step: 2,
    title: '즉시 — 임차권등기명령 신청',
    color: 'bg-red-500',
    content: '부득이하게 이사를 나가야 한다면 임차권등기명령을 먼저 신청하세요. 관할 지방법원에 신청하면 등기 완료 후 이사를 나가도 대항력이 유지됩니다. 비용은 5천원 수준.',
  },
  {
    step: 3,
    title: '1주일 내 — 내용증명 발송',
    color: 'bg-orange-400',
    content: '집주인에게 보증금 반환을 요청하는 내용증명을 발송하세요. 우체국 또는 온라인 우체국에서 발송 가능합니다. 반환 기한(통상 2주)을 명시해야 합니다. 이후 법적 절차의 중요 증거가 됩니다.',
  },
  {
    step: 4,
    title: '1개월 내 — 전세피해 확인서 신청',
    color: 'bg-orange-400',
    content: '주소지 관할 지자체(시·군·구청)에서 전세피해 확인서를 발급받을 수 있습니다. 이 확인서가 있어야 정부 지원 프로그램(저금리 대출, 공공임대 등)을 이용할 수 있습니다.',
  },
  {
    step: 5,
    title: '법적 절차 — 지급명령 또는 소액심판',
    color: 'bg-gray-800',
    content: '보증금 3천만원 이하는 소액심판, 이상은 지급명령을 신청하세요. 대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있습니다. 소송 비용은 패소 시 상대방 부담 청구 가능.',
  },
  {
    step: 6,
    title: '경매 대응 — 배당요구 신청',
    color: 'bg-gray-800',
    content: '집이 경매에 넘어간 경우 배당요구 종기일 전에 배당요구를 신청해야 합니다. 법원 경매 공고를 확인하고 즉시 신청하세요. 신청하지 않으면 보증금을 받을 기회를 잃습니다.',
  },
]

const agencies = [
  {
    region: '전국',
    name: '대한법률구조공단',
    tel: '132',
    desc: '무료 법률 상담 및 소송 지원',
    url: 'https://www.klac.or.kr',
  },
  {
    region: '전국',
    name: 'LH 마이홈센터',
    tel: '1600-1004',
    desc: '전세 피해 상담 및 공공임대 안내',
    url: 'https://www.myhome.go.kr',
  },
  {
    region: '전국',
    name: 'HUG 주택도시보증공사',
    tel: '1566-9009',
    desc: '전세보증보험 및 피해 지원',
    url: 'https://www.khug.or.kr',
  },
  {
    region: '전국',
    name: '국토교통부 전세피해지원센터',
    tel: '1533-8119',
    desc: '전세피해 확인서 발급 및 종합 지원',
    url: 'https://www.molit.go.kr',
  },
  {
    region: '서울',
    name: '서울 전세피해지원센터',
    tel: '02-2133-1200',
    desc: '서울시 전세 피해 전담 지원',
    url: 'https://housing.seoul.go.kr',
  },
  {
    region: '경기',
    name: '경기도 전세피해지원센터',
    tel: '031-120',
    desc: '경기도 전세 피해 전담 지원',
    url: 'https://www.gg.go.kr',
  },
  {
    region: '인천',
    name: '인천 전세피해지원센터',
    tel: '032-120',
    desc: '인천시 전세 피해 전담 지원',
    url: 'https://www.incheon.go.kr',
  },
  {
    region: '부산',
    name: '부산 전세피해지원센터',
    tel: '051-120',
    desc: '부산시 전세 피해 전담 지원',
    url: 'https://www.busan.go.kr',
  },
]

const regions = ['전국', '서울', '경기', '인천', '부산']

export default function SupportPage() {
  const [selectedRegion, setSelectedRegion] = useState('전국')

  const filtered = agencies.filter(a => a.region === selectedRegion || selectedRegion === '전국')

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-black">피해 발생 시 대처 방법</h1>
        <p className="text-sm text-gray-400 mt-1">전세사기 피해를 입었다면 순서대로 행동하세요</p>
      </div>

      {/* 대처 단계 */}
      <section className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4">
            <div className={`${s.color} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0`}>
              {s.step}
            </div>
            <div>
              <h3 className="font-bold text-sm">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.content}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 전세피해 확인서 안내 */}
      <section className="bg-black text-white rounded-2xl p-6 space-y-3">
        <h2 className="font-black text-lg">전세피해 확인서란?</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          전세사기 피해자임을 공식 인정받는 문서로, 시·군·구청에서 발급합니다.
          이 확인서가 있으면 다음 혜택을 받을 수 있습니다.
        </p>
        <ul className="space-y-2 text-sm text-gray-300">
          {[
            'LH 공공임대주택 우선 입주',
            '저금리 긴급 주거안정 대출 (연 1~2%)',
            '경·공매 유예 신청 가능',
            '법률 지원 무료 제공',
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-green-400 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mt-2">신청처: 주소지 관할 시·군·구청 주택과</p>
      </section>

      {/* 지역별 지원기관 */}
      <section className="space-y-4">
        <h2 className="text-xl font-black">지역별 지원기관</h2>
        <div className="flex gap-2 flex-wrap">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === r ? 'bg-black text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-black'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((a) => (
            <div key={a.name} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a.region}</span>
                </div>
                <h3 className="font-bold text-sm">{a.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
              </div>
              <a
                href={`tel:${a.tel}`}
                className="shrink-0 bg-black text-white font-bold text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                {a.tel}
              </a>
            </div>
          ))}
        </div>
      </section>

      <Link href="/checklist" className="block text-center border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-colors">
        계약 전 체크리스트 보기
      </Link>
    </div>
  )
}
