'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { authService } from '@/services'
import { getSessionTokenFromLS } from '@/lib/common'

function LogoutLogic() {
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

    if (sessionToken === getSessionTokenFromLS()) handleLogout()

    return () => controller.abort()
  }, [router, sessionToken, pathname])

  return (
    <div>
      <h1>Logout...</h1>
    </div>
  )
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}
