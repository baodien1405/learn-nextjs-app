import { ProductList } from '@/app/products/_components'
import { productService } from '@/services'

export default async function ProductsPage() {
  const response = await productService.getAll()
  const productList = response.payload?.data || []

  return (
    <div className="px-4">
      <ProductList productList={productList} />
    </div>
  )
}
