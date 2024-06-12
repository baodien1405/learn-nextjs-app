'use client'

import { differenceInHours } from 'date-fns'
import { useEffect } from 'react'

import { clientSessionToken } from '@/lib/http'
import { authService } from '@/services'

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date()
      const expiresAt = new Date(clientSessionToken.expiresAt)

      if (differenceInHours(expiresAt, now) < 1) {
        const res = await authService.slideSessionFromNextClientToNextServer()
        clientSessionToken.expiresAt = res.payload.data.expiresAt
      }
    }, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [])

  return null
}
