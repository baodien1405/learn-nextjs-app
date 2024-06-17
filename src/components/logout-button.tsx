'use client'

import { Loader2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { handleErrorApi } from '@/lib/utils'
import { authService } from '@/services'
import { removeSessionTokenExpiresAtToLS, removeSessionTokenToLS } from '@/lib/common'

export function LogoutButton() {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setLoading(true)
      await authService.logoutFromNextClientToNextServer()
      router.push('/login')
    } catch (error) {
      handleErrorApi({ error })
      authService.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectForm=${pathname}`)
      })
    } finally {
      setLoading(false)
      router.refresh()
      removeSessionTokenToLS()
      removeSessionTokenExpiresAtToLS()
    }
  }

  return (
    <Button size="sm" disabled={loading} onClick={handleLogout}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Logout
    </Button>
  )
}
