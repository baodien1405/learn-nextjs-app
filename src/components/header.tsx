import Link from 'next/link'

import { LogoutButton } from '@/components/logout-button'
import { ModeToggle } from '@/components/mode-toggle'
import { AccountResType } from '@/schemaValidations/account.schema'

interface HeaderProps {
  user: AccountResType['data'] | null
}

export default async function Header({ user }: HeaderProps) {
  return (
    <div className="flex gap-5 items-center justify-end p-2">
      <ul className="flex gap-4 items-center">
        <li>
          <Link href="/products">Products</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/me">Hello everyone! I am {user.name}</Link>
            </li>
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
