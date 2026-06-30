import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const counselors = [
  {
    category: '법률 상담',
    items: [
      {
        name: '대한법률구조공단',
        tel: '132',
        hours: '평일 09:00~18:00',
        desc: '전국 무료 법률 상담. 소득 기준 없이 누구나 이용 가능. 소송 지원도 제공.',
        url: 'https://www.klac.or.kr',
        badge: '무료',
      },
      {
        name: '대한변호사협회 법률상담센터',
        tel: '02-3476-6500',
        hours: '평일 09:00~17:00',
        desc: '변호사 직접 상담. 30분 무료 상담 제공.',
        url: 'https://www.koreanbar.or.kr',
        badge: '무료',
      },
    ],
  },
  {
    category: '주거 지원',
    items: [
      {
        name: 'LH 마이홈센터',
        tel: '1600-1004',
        hours: '평일 09:00~18:00',
        desc: '전세 피해 상담, 공공임대주택 안내, 긴급 주거지원 연계.',
        url: 'https://www.myhome.go.kr',
        badge: '무료',
      },
      {
        name: '주거복지재단',
        tel: '1600-0777',
        hours: '평일 09:00~18:00',
        desc: '취약계층 주거 지원 및 전세 피해자 긴급 지원.',
        url: 'https://www.hf.go.kr',
        badge: '무료',
      },
    ],
  },
  {
    category: '보증·금융 지원',
    items: [
      {
        name: 'HUG 주택도시보증공사',
        tel: '1566-9009',
        hours: '평일 09:00~18:00',
        desc: '전세보증보험 가입 안내 및 피해 시 보증금 대위변제 지원.',
        url: 'https://www.khug.or.kr',
        badge: '무료',
      },
      {
        name: 'SGI서울보증',
        tel: '1670-7000',
        hours: '평일 09:00~18:00',
        desc: '전세보증보험 상담 및 가입 안내.',
        url: 'https://www.sgic.co.kr',
        badge: '무료',
      },
    ],
  },
  {
    category: '피해 신고',
    items: [
      {
        name: '국토교통부 전세피해지원센터',
        tel: '1533-8119',
        hours: '평일 09:00~18:00',
        desc: '전세피해 확인서 발급, 피해 접수 및 종합 지원.',
        url: 'https://www.molit.go.kr',
        badge: '공식',
      },
      {
        name: '경찰청 전세사기 신고센터',
        tel: '182',
        hours: '24시간',
        desc: '전세사기 형사 신고 접수. 긴급 상황 시 이용.',
        url: 'https://www.police.go.kr',
        badge: '24시간',
      },
    ],
  },
]

export default function CounselPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black">전문가 상담 연결</h1>
        <p className="text-sm text-gray-400 mt-1">전세 문제, 혼자 고민하지 마세요. 전문가가 도와드려요.</p>
      </div>

      {/* 긴급 배너 */}
      <div className="bg-red-500 text-white rounded-2xl p-5">
        <p className="font-black text-lg">긴급 상황이라면</p>
        <p className="text-sm text-red-100 mt-1">보증금 반환 거부, 집주인 잠적, 경매 통지를 받으셨나요?</p>
        <a href="tel:132" className="mt-3 inline-block bg-white text-red-500 font-black px-5 py-2.5 rounded-full text-sm hover:bg-red-50 transition-colors">
          ☎ 132 대한법률구조공단 바로 전화
        </a>
      </div>

      {counselors.map((group, idx) => (
        <Fragment key={group.category}>
          <section className="space-y-3">
            <h2 className="font-black text-lg">{group.category}</h2>
            {group.items.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{item.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.badge === '24시간' ? 'bg-black text-white' : 'bg-green-50 text-green-600'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{item.hours}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <a href={`tel:${item.tel}`}
                    className="flex-1 bg-black text-white font-bold text-sm py-2.5 rounded-xl text-center hover:bg-gray-800 transition-colors">
                    ☎ {item.tel}
                  </a>
                  <a href={item.url} target="_blank" rel="noopener noreferrer"
                    className="flex-1 border border-gray-200 text-gray-600 font-medium text-sm py-2.5 rounded-xl text-center hover:bg-gray-50 transition-colors">
                    사이트 바로가기
                  </a>
                </div>
              </div>
            ))}
          </section>

          {idx === 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="font-black text-lg">파트너 변호사 · 법무사</h2>
                <p className="text-xs text-gray-400 mt-0.5">전세사기·부동산 분쟁 전문가를 직접 연결해드려요</p>
              </div>
              {[
                { name: '이지현', title: '변호사', firm: '법무법인 세이프홈', tags: ['전세사기 특화', '임차권등기', '당일 답변'], career: 11, rating: 4.9, reviews: 127 },
                { name: '박성준', title: '변호사', firm: '박성준 법률사무소', tags: ['경매 전문', '깡통전세', '긴급상담 가능'], career: 15, rating: 4.8, reviews: 89 },
                { name: '김민서', title: '법무사', firm: '민서 법무사 사무소', tags: ['임차권등기 전문', '비용 합리적', '수도권'], career: 8, rating: 4.7, reviews: 64 },
              ].map((l) => (
                <div key={l.name} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <Image src="/lawyers/ex-person.png" alt={l.name} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm">{l.name} {l.title}</span>
                      <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold">파트너</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{l.firm} · 경력 {l.career}년</p>
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {l.tags.map(t => (
                        <span key={t} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                  <Link href="/lawyers" className="shrink-0 bg-black text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-gray-800 transition-colors">
                    상담 신청
                  </Link>
                </div>
              ))}
              <Link href="/lawyers" className="block text-center text-sm text-gray-400 hover:text-black transition-colors">
                파트너 변호사 전체보기 →
              </Link>
            </section>
          )}
        </Fragment>
      ))}

      {/* 변호사 등록 배너 */}
      <div className="border border-dashed border-gray-300 rounded-2xl p-6 text-center space-y-2">
        <p className="font-black text-sm">부동산 전문 변호사·법무사이신가요?</p>
        <p className="text-xs text-gray-400 leading-relaxed">전세사기 피해자와 연결되는 집터뷰 파트너로 등록하세요.<br />월 단위 간편 등재, 직접 문의로 시작할 수 있어요.</p>
        <Link
          href="mailto:zeromi.0924@gmail.com?subject=집터뷰 파트너 등재 문의"
          className="inline-block mt-1 bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
        >
          파트너 등재 문의하기
        </Link>
      </div>

      <Link href="/support" className="block text-center border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-colors">
        ← 피해 대처 방법 보기
      </Link>
    </div>
  )
}
