import Link from 'next/link'

import { ModeToggle } from '@/components/mode-toggle'

export default function Header() {
  return (
    <div className="flex gap-5 items-center justify-end p-2">
      <ul className="flex gap-2">
        <li>
          <Link href="/login">Đăng nhập</Link>
        </li>
        <li>
          <Link href="/register">Đăng kí</Link>
        </li>
      </ul>

      <ModeToggle />
    </div>
  )
}
