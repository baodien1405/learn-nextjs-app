import { AddEditProductForm } from '@/app/products/[productId]/_components'
import { productService } from '@/services/product-service'

interface AddEditProductPageProps {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function AddEditProductPage({ params }: AddEditProductPageProps) {
  const isAddMode = params.productId === 'add'
  let result

  try {
    if (isAddMode) {
      result = null
    } else {
      result = await productService.get(params.productId)
    }
  } catch (error) {}

  return (
    <div>
      <h1 className="font-bold text-center">{`${isAddMode ? 'Add' : 'Edit'} Product`}</h1>

      <AddEditProductForm initialValues={result?.payload?.data} />
    </div>
  )
}
