'use client'

import { useEffect } from 'react'

import { useAppContext } from '@/providers'
import { accountService } from '@/services'

export function Profile() {
  const { sessionToken } = useAppContext()

  useEffect(() => {
    const fetchProfile = async () => {
      await accountService.me(sessionToken)
    }

    fetchProfile()
  }, [sessionToken])

  return (
    <div className="mt-10">
      <h1>Profile</h1>
      <div>{sessionToken}</div>
    </div>
  )
}
