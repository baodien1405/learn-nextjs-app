import { Metadata } from 'next'

import { AddProductButton, ProductList } from '@/app/products/_components'
import { productService } from '@/services'

export const metadata: Metadata = {
  title: 'Products',
  description: 'This is product list of ShopApp, create by Bao Dien'
}

export default async function ProductsPage() {
  const response = await productService.getAll()
  const productList = response.payload?.data || []

  return (
    <div className="px-4">
      <AddProductButton />

      <ProductList productList={productList} />
    </div>
  )
}
