import { RiskLevel } from '@/lib/types'

const styles: Record<RiskLevel, string> = {
  안전: 'bg-green-500 text-white',
  경고: 'bg-orange-400 text-white',
  위험: 'bg-red-500 text-white',
}

const icons: Record<RiskLevel, string> = {
  안전: '✓',
  경고: '!',
  위험: '✕',
}

export default function RiskBadge({ level, size = 'sm' }: { level: RiskLevel; size?: 'sm' | 'lg' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full ${styles[level]} ${
        size === 'lg' ? 'text-base px-4 py-2' : 'text-xs px-2.5 py-1'
      }`}
    >
      {icons[level]} {level}
    </span>
  )
}
