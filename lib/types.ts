export type RiskLevel = '안전' | '경고' | '위험'

export interface Property {
  id: string
  address: string
  buildingName: string
  type: '아파트' | '빌라' | '오피스텔' | '원룸'
  floor: string
  area: number
  deposit: number
  monthlyRent: number | null
  salePrice: number
  leaseRatio: number
  risk: RiskLevel
  mortgage: number
  seizure: boolean
  ownerTax: boolean
  builtYear: number
  images: string[]
  description: string
}

export interface LawItem {
  id: string
  title: string
  category: '계약' | '보증금' | '임대인' | '임차인' | '분쟁' | '세금'
  summary: string
  content: string
  relatedLaw: string
}
