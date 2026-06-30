import Link from 'next/link'
import Image from 'next/image'
import { laws } from '@/lib/mock-data'

const features = [
  {
    href: '/check',
    icon: '/icons/search-icon.png',
    title: '내 집 위험도 체크',
    desc: '주소·보증금·근저당 입력으로 내 전세 위험도를 바로 확인',
  },
  {
    href: '/checklist',
    icon: '/icons/check-icon.png',
    title: '계약 전 체크하기',
    desc: '계약 전부터 입주 후까지 놓치면 안 되는 5단계 체크리스트',
  },
  {
    href: '/calculator',
    icon: '/icons/calculate-icon.png',
    title: '보험 계산기',
    desc: '전세보증보험 가입 가능 여부와 예상 보험료를 계산',
  },
  {
    href: '/cases',
    icon: '/icons/damage-icon.png',
    title: '피해 사례',
    desc: '깡통전세·신탁사기·이중계약 등 실제 피해 사례 모음',
  },
  {
    href: '/support',
    icon: '/icons/sos-icon.png',
    title: '피해 대처',
    desc: '피해를 입었다면? 즉시 해야 할 6단계 대처 방법',
  },
  {
    href: '/contract',
    icon: '/icons/contract-icon.png',
    title: '계약서 분석',
    desc: '독소조항과 안전 특약, 계약서에서 꼭 확인해야 할 것들',
  },
  {
    href: '/counsel',
    icon: '/icons/call-icon.png',
    title: '전문가 상담 연결',
    desc: '변호사·법률·주거 전문 상담 바로 연결',
  },
  {
    href: '/law',
    icon: '/icons/law-icon.png',
    title: '법률 정보',
    desc: '전세 계약 관련 핵심 법률 한눈에 보기',
  },
]

export default function Home() {
  return (
    <div className="space-y-14">
      {/* 히어로 */}
      <section className="rounded-3xl bg-black text-white p-8 sm:p-14">
        <div className="flex flex-row items-center gap-6 mb-6">
          <div className="flex-1 space-y-4 min-w-0">
            <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-widest uppercase">전세사기 예방 서비스</p>
            <h1 className="text-[1.6rem] sm:text-5xl font-black leading-tight">
              이집<span className="text-xl sm:text-3xl">..</span><br />과연 안전할까?
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              집터뷰와 함께 안전한 집 찾기
            </p>
          </div>
          <Image src="/logo.png" alt="집터뷰" width={160} height={160} className="invert opacity-90 hidden sm:block shrink-0" />
          <Image src="/logo.png" alt="집터뷰" width={80} height={80} className="invert opacity-90 sm:hidden shrink-0" />
        </div>
        <div className="flex gap-2">
          <Link href="/check?tab=checklist" className="bg-white text-black font-bold px-4 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-gray-100 transition-colors text-xs sm:text-sm whitespace-nowrap">
            계약 전 체크하기
          </Link>
          <Link href="/check?tab=check" className="border border-gray-700 text-white font-medium px-4 py-2.5 sm:px-6 sm:py-3 rounded-full hover:border-gray-500 transition-colors text-xs sm:text-sm whitespace-nowrap">
            내 집 체크하기
          </Link>
        </div>
      </section>

      {/* 기능 바로가기 */}
      <section>
        <h2 className="text-xl font-black mb-5">집터뷰가 도와드릴게요</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-black transition-all group"
            >
              <Image src={f.icon} alt={f.title} width={40} height={40} className="object-contain" />
              <h3 className="font-black text-sm mt-3 group-hover:underline">{f.title}</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 계약전 확인 배너 */}
      <section className="bg-black text-white rounded-3xl p-8 flex flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-2">계약 전 필수</p>
          <h2 className="text-xl sm:text-2xl font-black">이사갈 집 안전한지 체크하자!</h2>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            전세사기 피해를 방지하기 위해 지금 바로 체크해보세요.
          </p>
        </div>
        <Link
          href="/check?tab=checklist"
          className="shrink-0 bg-white text-black font-black px-5 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
        >
          시작하기 →
        </Link>
      </section>

      {/* 밸런스 게임 배너 */}
      <section>
        <Link
          href="/balance"
          className="block bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
                <span className="text-xs text-gray-400 font-medium">전세 지식 테스트</span>
              </div>
              <h2 className="text-xl font-black">전세 밸런스 게임</h2>
              <p className="text-sm text-gray-500">
                나는 전세 계약에 대해 얼마나 알고 있을까?<br />
                8문제로 내 전세 지식 레벨을 확인해봐요
              </p>
            </div>
            <span className="shrink-0 bg-black text-white font-black px-5 py-3 rounded-full text-sm whitespace-nowrap">
              게임하러가기 →
            </span>
          </div>
        </Link>
      </section>

      {/* 법률 정보 미리보기 */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black">꼭 알아야 할 부동산 법률</h2>
          <Link href="/law" className="text-sm text-gray-400 hover:text-black transition-colors">
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {laws.slice(0, 4).map((law) => (
            <Link
              key={law.id}
              href={`/law/${law.id}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow group"
            >
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                {law.category}
              </span>
              <h3 className="font-bold mt-2 text-sm group-hover:underline">{law.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{law.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
