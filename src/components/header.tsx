import Link from 'next/link'

import { ModeToggle } from '@/components/mode-toggle'
import { LogoutButton } from '@/components/logout-button'
import { cookies } from 'next/headers'
import { accountService } from '@/services'

export default async function Header() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  let user = null

  if (sessionToken?.value) {
    try {
      const response = await accountService.me(sessionToken?.value)
      user = response.payload.data
    } catch (error) {}
  }

  return (
    <div className="flex gap-5 items-center justify-end p-2">
      <ul className="flex gap-4 items-center">
        {user ? (
          <>
            <li>Hello everyone! I am {user.name}</li>
            <li>
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link href="/register">Đăng kí</Link>
            </li>
          </>
        )}
      </ul>

      <ModeToggle />
    </div>
  )
}
