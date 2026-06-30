import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto space-y-10 py-4">

      {/* 헤더 */}
      <div className="space-y-1">
        <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">왜 만들었나요?</p>
        <h1 className="text-2xl font-black">집 계약 꼭 확인해야할까?</h1>
      </div>

      {/* 편지 */}
      <div className="space-y-6">
        <p className="text-sm font-bold text-gray-500">2024년, 저는 전세사기를 당했습니다.</p>

        <div className="border-l-2 border-black pl-5 space-y-4">
          <p className="text-xs text-gray-400 font-medium">그때의 나에게 —</p>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>그 집 계약하지 마.</p>
            <p>
              등기부등본 한 번만 뽑아봤어도 됐는데.
              공인중개사 말만 믿지 말고, 근저당이 얼마인지 직접 확인했어야 했어.
              집주인 얼굴도 못 봤잖아.
            </p>
            <p>근데 나는 몰랐어. 아무도 알려주지 않았거든.</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          집터뷰는 그 경험에서 시작됐어요.<br />
          저처럼 아무것도 모른 채 계약서에 도장 찍는 사람이<br />
          한 명이라도 줄었으면 해서요.
        </p>
      </div>

      {/* 마무리 */}
      <div className="space-y-4 pt-2">
        <p className="text-lg font-black">당신의 집은 안녕하십니까?</p>
        <Link
          href="/check?tab=check"
          className="inline-block bg-black text-white font-bold px-5 py-3 rounded-full text-sm hover:bg-gray-800 transition-colors"
        >
          안녕한지 확인하러 가기 →
        </Link>
      </div>

    </div>
  )
}
