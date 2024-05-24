'use client'

import { useEffect } from 'react'

import { accountService } from '@/services'

export function Profile() {
  useEffect(() => {
    const fetchProfile = async () => {
      await accountService.meClient()
    }

    fetchProfile()
  }, [])

  return (
    <div className="mt-10">
      <h1>Profile</h1>
    </div>
  )
}
