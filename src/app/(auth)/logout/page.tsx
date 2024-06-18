'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { authService } from '@/services'
import { getSessionTokenFromLS } from '@/lib/common'
import { useAppContext } from '@/providers'

function LogoutLogic() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')
  const { setUser } = useAppContext()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (sessionToken === getSessionTokenFromLS()) {
      authService.logoutFromNextClientToNextServer(true, signal).then((res) => {
        setUser(null)
        router.push(`/login?redirectForm=${pathname}`)
      })
    }

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
