'use client'

import { useEffect } from 'react'

import { envConfig } from '@/configs'
import { useAppContext } from '@/providers'

export function Profile() {
  const { sessionToken } = useAppContext()

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`
        }
      }).then(async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }

        if (!res.ok) throw data

        return data
      })
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
