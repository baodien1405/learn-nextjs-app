'use client'

import { ReactNode, useState } from 'react'

import { clientSessionToken } from '@/lib/http'

export function AppProvider({
  children,
  initialSessionToken = ''
}: {
  children: ReactNode
  initialSessionToken?: string
}) {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialSessionToken
    }
  })

  return <>{children}</>
}
