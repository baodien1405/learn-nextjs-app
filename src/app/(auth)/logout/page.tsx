'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { authService } from '@/services'
import { clientSessionToken } from '@/lib/http'

export default function Logout() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const handleLogout = async () => {
      try {
        await authService.logoutFromNextClientToNextServer(true, signal)
        router.push(`/login?redirectForm=${pathname}`)
      } catch (error) {}
    }

    if (sessionToken === clientSessionToken.value) handleLogout()

    return () => controller.abort()
  }, [router, sessionToken, pathname])

  return (
    <div>
      <h1>Logout...</h1>
    </div>
  )
}
