import Link from 'next/link'
import { Property, RiskLevel } from '@/lib/types'

const riskStyle: Record<RiskLevel, string> = {
  안전: 'bg-green-500 text-white',
  경고: 'bg-orange-400 text-white',
  위험: 'bg-red-500 text-white',
}

const riskIcon: Record<RiskLevel, string> = {
  안전: '✓',
  경고: '!',
  위험: '✕',
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/search/${property.id}`} className="group block">
      <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-shadow">
        <div className="relative h-44 overflow-hidden bg-gray-100">
          <img
            src={property.images[0]}
            alt={property.buildingName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${riskStyle[property.risk]}`}>
            {riskIcon[property.risk]} {property.risk}
          </span>
          <span className="absolute top-3 right-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full">
            {property.type}
          </span>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400">{property.address}</p>
          <h3 className="font-bold text-gray-900 mt-0.5 group-hover:underline">
            {property.buildingName}
          </h3>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400">전세 보증금</p>
              <p className="text-lg font-black">
                {(property.deposit / 10000).toFixed(0)}억
                {property.deposit % 10000 > 0 ? ` ${property.deposit % 10000}만` : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">전세가율</p>
              <p className={`text-sm font-bold ${property.leaseRatio >= 80 ? 'text-red-500' : property.leaseRatio >= 70 ? 'text-orange-400' : 'text-green-500'}`}>
                {property.leaseRatio}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
