'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getSessionTokenFromLS } from '@/lib/common'
import { isClient } from '@/lib/http'

export function AddProductButton() {
  const isAuthenticated = isClient && Boolean(getSessionTokenFromLS())

  if (!isAuthenticated) return null

  return (
    <Link href="/products/add" className="text-right my-4 block">
      <Button size="sm" variant="outline">
        Add Product
      </Button>
    </Link>
  )
}
