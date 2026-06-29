import Link from 'next/link'
import { notFound } from 'next/navigation'
import { laws } from '@/lib/mock-data'

export default async function LawDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const law = laws.find((l) => l.id === id)
  if (!law) notFound()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/law"
        className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm"
      >
        <span className="text-base">&#8249;</span> 법률 목록으로
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-5">
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
          {law.category}
        </span>

        <h1 className="text-2xl font-black">{law.title}</h1>

        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-black">
          <p className="text-sm font-semibold text-gray-700">{law.summary}</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-bold text-sm text-gray-400 uppercase tracking-wider">상세 내용</h2>
          <p className="text-gray-700 leading-relaxed">{law.content}</p>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400">관련 법령</p>
          <p className="text-sm font-semibold mt-1">{law.relatedLaw}</p>
        </div>
      </div>

      <Link
        href="/check"
        className="block text-center bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors"
      >
        내 집 위험도 체크하기
      </Link>
    </div>
  )
}
