import { cookies } from 'next/headers'

import { envConfig } from '@/configs'
import { Profile } from '@/app/me/_components'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken?.value}`
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

  return (
    <div className="p-2">
      <h1>Profile</h1>

      <div>Tên: {result.payload.data.name}</div>
      <div>Email: {result.payload.data.email}</div>

      <Profile />
    </div>
  )
}
