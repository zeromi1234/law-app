'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Region = '전체' | '서울' | '경기·인천' | '부산·경남' | '대구·경북' | '대전·충청' | '광주·전라'
type Specialty = '전체' | '전세사기' | '임차권등기' | '명도소송' | '경매' | '계약해지'

const regions: Region[] = ['전체', '서울', '경기·인천', '부산·경남', '대구·경북', '대전·충청', '광주·전라']
const specialties: Specialty[] = ['전체', '전세사기', '임차권등기', '명도소송', '경매', '계약해지']

interface Lawyer {
  id: number
  name: string
  title: string
  firm: string
  region: Exclude<Region, '전체'>
  specialties: Exclude<Specialty, '전체'>[]
  career: number
  consultCount: number
  rating: number
  reviewCount: number
  tags: string[]
  intro: string
  avatar: string // 이니셜 or 이미지 경로
  featured: boolean
  responseTime: string
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: '이지현',
    title: '변호사',
    firm: '법무법인 세이프홈',
    region: '서울',
    specialties: ['전세사기', '임차권등기', '계약해지'],
    career: 11,
    consultCount: 340,
    rating: 4.9,
    reviewCount: 127,
    tags: ['전세사기 특화', '당일 답변', '법원 경험 다수'],
    intro: '전세사기 피해자 300명 이상을 도왔어요. 임차권등기·보증금반환 소송을 집중적으로 다뤄왔어요.',
    avatar: '이',
    featured: true,
    responseTime: '평균 2시간 내 답변',
  },
  {
    id: 2,
    name: '박성준',
    title: '변호사',
    firm: '박성준 법률사무소',
    region: '서울',
    specialties: ['경매', '전세사기', '명도소송'],
    career: 15,
    consultCount: 210,
    rating: 4.8,
    reviewCount: 89,
    tags: ['경매 전문', '깡통전세', '긴급상담 가능'],
    intro: '경매 낙찰 후 임차인 보호 및 배당이의 소송을 주로 담당해요. 긴급 상황에도 빠르게 대응해요.',
    avatar: '박',
    featured: true,
    responseTime: '평균 4시간 내 답변',
  },
  {
    id: 3,
    name: '김민서',
    title: '법무사',
    firm: '민서 법무사 사무소',
    region: '경기·인천',
    specialties: ['임차권등기', '계약해지'],
    career: 8,
    consultCount: 180,
    rating: 4.7,
    reviewCount: 64,
    tags: ['임차권등기 전문', '비용 합리적', '수도권'],
    intro: '임차권등기명령 신청부터 집행까지 원스톱으로 도와드려요. 복잡한 절차를 쉽게 안내해요.',
    avatar: '김',
    featured: true,
    responseTime: '평균 6시간 내 답변',
  },
  {
    id: 4,
    name: '정다은',
    title: '변호사',
    firm: '법무법인 하우징',
    region: '서울',
    specialties: ['전세사기', '명도소송', '경매'],
    career: 9,
    consultCount: 155,
    rating: 4.8,
    reviewCount: 51,
    tags: ['여성 변호사', '피해자 지원', '무료 초기 상담'],
    intro: '피해자의 입장에서 꼼꼼하게 분석해요. 첫 상담은 무료로 진행하고 있어요.',
    avatar: '정',
    featured: false,
    responseTime: '평균 1일 내 답변',
  },
  {
    id: 5,
    name: '최우진',
    title: '변호사',
    firm: '최우진 법률사무소',
    region: '부산·경남',
    specialties: ['전세사기', '계약해지', '임차권등기'],
    career: 13,
    consultCount: 120,
    rating: 4.6,
    reviewCount: 43,
    tags: ['부산·경남 전문', '전세사기', '빠른 처리'],
    intro: '부산·경남 지역 전세 분쟁을 전문으로 다뤄요. 지역 법원과의 네트워크가 강점이에요.',
    avatar: '최',
    featured: false,
    responseTime: '평균 1일 내 답변',
  },
  {
    id: 6,
    name: '한소영',
    title: '법무사',
    firm: '한소영 법무사 사무소',
    region: '대전·충청',
    specialties: ['임차권등기', '경매'],
    career: 6,
    consultCount: 98,
    rating: 4.5,
    reviewCount: 31,
    tags: ['충청권', '경매 배당', '합리적 비용'],
    intro: '경매 배당 절차와 임차권등기를 전문으로 다뤄요. 충청권 전세 피해자분들을 적극 돕고 있어요.',
    avatar: '한',
    featured: false,
    responseTime: '평균 1일 내 답변',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-xs text-gray-500">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))} {rating.toFixed(1)}
    </span>
  )
}

export default function LawyersPage() {
  const [region, setRegion] = useState<Region>('전체')
  const [specialty, setSpecialty] = useState<Specialty>('전체')

  const filtered = lawyers.filter(l => {
    const regionOk = region === '전체' || l.region === region
    const specOk = specialty === '전체' || l.specialties.includes(specialty as Exclude<Specialty, '전체'>)
    return regionOk && specOk
  }).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      {/* 헤더 */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Partners</p>
        <h1 className="text-3xl font-black">파트너 변호사 · 법무사</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          전세사기·부동산 분쟁 전문가만 엄선했어요.<br />
          집터뷰 파트너는 부동산 법 분야 경력자로만 구성돼요.
        </p>
      </div>

      {/* 필터 */}
      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          {regions.map(r => (
            <button key={r} onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${region === r ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {specialties.map(s => (
            <button key={s} onClick={() => setSpecialty(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${specialty === s ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 수 */}
      <p className="text-xs text-gray-400">{filtered.length}명의 전문가</p>

      {/* 카드 목록 */}
      <div className="space-y-4">
        {filtered.map(l => (
          <div key={l.id} className={`bg-white rounded-2xl border p-5 space-y-4 ${l.featured ? 'border-black' : 'border-gray-100'}`}>
            <div className="flex items-start gap-4">
              {/* 아바타 */}
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image src="/lawyers/ex-person.png" alt={l.name} width={56} height={56} className="w-full h-full object-cover" />
              </div>

              {/* 기본 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-base">{l.name} {l.title}</span>
                  {l.featured && (
                    <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded-full">파트너</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{l.firm} · {l.region} · 경력 {l.career}년</p>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={l.rating} />
                  <span className="text-xs text-gray-400">({l.reviewCount})</span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">상담 {l.consultCount}건+</span>
                </div>
              </div>
            </div>

            {/* 소개 */}
            <p className="text-sm text-gray-600 leading-relaxed">{l.intro}</p>

            {/* 태그 */}
            <div className="flex gap-1.5 flex-wrap">
              {l.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* 전문 분야 */}
            <div className="flex gap-1.5 flex-wrap">
              {l.specialties.map(s => (
                <span key={s} className="text-xs font-bold text-black border border-black px-2.5 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>

            {/* 하단 */}
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-gray-400">{l.responseTime}</p>
              <button className="bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
                상담 신청하기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 파트너 등재 CTA */}
      <div className="border border-dashed border-gray-300 rounded-2xl p-6 text-center space-y-3">
        <p className="font-black text-base">부동산 전문가이신가요?</p>
        <p className="text-sm text-gray-500">집터뷰 파트너로 등재하면 전세사기 피해자들과 연결될 수 있어요.</p>
        <Link href="mailto:zeromi.0924@gmail.com?subject=집터뷰 파트너 등재 문의"
          className="inline-block bg-black text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
          파트너 등재 문의하기
        </Link>
      </div>
    </main>
  )
}
