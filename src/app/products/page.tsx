import Link from 'next/link'
import { cookies } from 'next/headers'

import { ProductList } from '@/app/products/_components'
import { Button } from '@/components/ui/button'
import { productService } from '@/services'

export default async function ProductsPage() {
  const response = await productService.getAll()
  const productList = response.payload?.data || []
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const isAuthenticated = Boolean(sessionToken?.value)

  return (
    <div className="px-4">
      {isAuthenticated && (
        <Link href="/products/add" className="text-right my-4 block">
          <Button size="sm" variant="outline">
            Add Product
          </Button>
        </Link>
      )}

      <ProductList productList={productList} />
    </div>
  )
}
