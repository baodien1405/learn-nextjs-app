'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useAppContext } from '@/providers'

export function AddProductButton() {
  const { isAuthenticated } = useAppContext()

  if (!isAuthenticated) return null

  return (
    <Link href="/products/add" className="text-right my-4 block">
      <Button size="sm" variant="outline">
        Add Product
      </Button>
    </Link>
  )
}
