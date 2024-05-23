import { cookies } from 'next/headers'

import { envConfig } from '@/configs'
import { Profile } from '@/app/me/_components'
import { accountService } from '@/services'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await accountService.me(sessionToken?.value ?? '')

  return (
    <div className="p-2">
      <h1>Profile</h1>

      <div>Tên: {result.payload.data.name}</div>
      <div>Email: {result.payload.data.email}</div>

      <Profile />
    </div>
  )
}
