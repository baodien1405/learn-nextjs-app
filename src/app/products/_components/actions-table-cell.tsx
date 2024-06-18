'use client'

import Link from 'next/link'

import { DeleteProductButton } from '@/app/products/_components/delete-product-button'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { ProductType } from '@/schemaValidations/product.schema'
import { isClient } from '@/lib/http'
import { getSessionTokenFromLS } from '@/lib/common'

interface ActionTableCellProps {
  product: ProductType
}

export function ActionTableCell({ product }: ActionTableCellProps) {
  const isAuthenticated = isClient && Boolean(getSessionTokenFromLS())

  if (!isAuthenticated) return null

  return (
    <TableCell>
      <div className="gap-2 flex">
        <Link href={`/products/${product.id}`}>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </Link>
        <DeleteProductButton product={product} />
      </div>
    </TableCell>
  )
}
