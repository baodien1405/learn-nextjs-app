import { cookies } from 'next/headers'
import { Metadata } from 'next'

import { accountService } from '@/services'
import { ProfileForm } from '@/app/me/_components'

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await accountService.me(sessionToken?.value ?? '')

  return (
    <div className="p-2">
      <h1>MeProfile</h1>

      <h2>{result.payload.data.name}</h2>

      <ProfileForm profile={result.payload.data} />
    </div>
  )
}
