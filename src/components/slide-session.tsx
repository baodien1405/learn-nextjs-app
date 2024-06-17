'use client'

import { differenceInHours } from 'date-fns'
import { useEffect } from 'react'

import { authService } from '@/services'
import { getSessionTokenExpiresAtFromLS, setSessionTokenExpiresAtToLS } from '@/lib/common'

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date()
      const sessionTokenExpiresAt = getSessionTokenExpiresAtFromLS()
      const expiresAt = sessionTokenExpiresAt ? new Date(sessionTokenExpiresAt) : new Date()

      if (differenceInHours(expiresAt, now) < 1) {
        const res = await authService.slideSessionFromNextClientToNextServer()
        setSessionTokenExpiresAtToLS(res.payload.data.expiresAt)
      }
    }, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [])

  return null
}
