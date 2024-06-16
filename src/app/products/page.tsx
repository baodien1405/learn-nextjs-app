import Link from 'next/link'

import { ProductList } from '@/app/products/_components'
import { Button } from '@/components/ui/button'
import { productService } from '@/services'

export default async function ProductsPage() {
  const response = await productService.getAll()
  const productList = response.payload?.data || []

  return (
    <div className="px-4">
      <Link href="/products/add" className="text-right my-4 block">
        <Button size="sm" variant="outline">
          Add Product
        </Button>
      </Link>
      <ProductList productList={productList} />
    </div>
  )
}
