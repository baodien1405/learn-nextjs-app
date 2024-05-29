import Link from 'next/link'

import { ModeToggle } from '@/components/mode-toggle'
import { LogoutButton } from '@/components/logout-button'

export default function Header() {
  return (
    <div className="flex gap-5 items-center justify-end p-2">
      <ul className="flex gap-4 items-center">
        <li>
          <Link href="/login">Đăng nhập</Link>
        </li>
        <li>
          <Link href="/register">Đăng kí</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>

      <ModeToggle />
    </div>
  )
}
