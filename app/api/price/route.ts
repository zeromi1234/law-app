import { NextRequest, NextResponse } from 'next/server'
import { parseAddress } from '@/lib/lawd-codes'

const API_KEY = process.env.MOLIT_API_KEY!
const BASE = 'https://apis.data.go.kr/1613000/RTMSOBJSvc'

const endpoints: Record<string, string> = {
  아파트: `${BASE}/getRTMSDataSvcAptTradeDev`,
  빌라: `${BASE}/getRTMSDataSvcRHTrade`,
  다가구: `${BASE}/getRTMSDataSvcSHTrade`,
  오피스텔: `${BASE}/getRTMSDataSvcOffiTrade`,
}

function recentMonths(n: number) {
  const months = []
  const d = new Date()
  for (let i = 0; i < n; i++) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    months.push(`${y}${m}`)
    d.setMonth(d.getMonth() - 1)
  }
  return months
}

function parsePrice(s: string) {
  return Number(s.replace(/,/g, '').trim())
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const address = searchParams.get('address') || ''
  const houseType = searchParams.get('houseType') || '아파트'

  const parsed = parseAddress(address)
  if (!parsed) {
    return NextResponse.json({ error: '지역을 인식하지 못했어요' }, { status: 400 })
  }

  const url = endpoints[houseType] ?? endpoints['아파트']
  const months = recentMonths(3)

  const prices: number[] = []

  await Promise.all(
    months.map(async (ym) => {
      try {
        const res = await fetch(
          `${url}?serviceKey=${API_KEY}&LAWD_CD=${parsed.code}&DEAL_YMD=${ym}&numOfRows=100&pageNo=1&_type=json`,
          { next: { revalidate: 3600 } }
        )
        const json = await res.json()
        const items = json?.response?.body?.items?.item
        if (!items) return
        const arr = Array.isArray(items) ? items : [items]
        arr.forEach((item: Record<string, string>) => {
          const price = parsePrice(item['거래금액'] ?? '')
          if (price > 0) prices.push(price)
        })
      } catch {}
    })
  )

  if (prices.length === 0) {
    return NextResponse.json({ error: '거래 데이터 없음', region: parsed.region }, { status: 404 })
  }

  prices.sort((a, b) => a - b)
  const median = prices[Math.floor(prices.length / 2)]
  const avg = Math.round(prices.reduce((s, p) => s + p, 0) / prices.length)

  return NextResponse.json({
    region: parsed.region,
    lawdCode: parsed.code,
    median,
    avg,
    count: prices.length,
    months,
  })
}
