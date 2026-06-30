'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChecklistRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/check?tab=checklist')
  }, [router])
  return null
}
