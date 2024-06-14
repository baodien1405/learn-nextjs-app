import { AddEditProductForm } from '@/app/products/[productId]/_components'
import { productService } from '@/services/product-service'

export interface AddEditProductPageProps {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function AddEditProductPage({ params }: AddEditProductPageProps) {
  const isAddMode = params.productId === 'add'
  const result = isAddMode ? null : await productService.get(params.productId)

  return (
    <div>
      <AddEditProductForm initialValues={result?.payload?.data} />
    </div>
  )
}
