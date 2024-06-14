import Link from 'next/link'

import { ModeToggle } from '@/components/mode-toggle'
import { LogoutButton } from '@/components/logout-button'
import { cookies } from 'next/headers'

export default function Header() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const isLoggedIn = Boolean(sessionToken?.value)

  return (
    <div className="flex gap-5 items-center justify-end p-2">
      <ul className="flex gap-4 items-center">
        {isLoggedIn ? (
          <li>
            <LogoutButton />
          </li>
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
