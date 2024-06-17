import { Metadata } from 'next'
import { cache } from 'react'

import { AddEditProductForm } from '@/app/products/[productId]/_components'
import { productService } from '@/services/product-service'

interface Props {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getProductDetails = cache(productService.get)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAddMode = params.productId === 'add'
  let result

  try {
    if (isAddMode) {
      result = null
    } else {
      result = await getProductDetails(params.productId)
    }
  } catch (error) {
    result = null
  }

  return {
    title: isAddMode ? 'Add product' : `Edit product: ${result?.payload?.data?.name}`,
    description: isAddMode ? 'Add your favorite product' : result?.payload?.data?.description
  }
}

export default async function AddEditProductPage({ params }: Props) {
  const isAddMode = params.productId === 'add'
  let result

  try {
    if (isAddMode) {
      result = null
    } else {
      result = await getProductDetails(params.productId)
    }
  } catch (error) {
    result = null
  }

  return (
    <div>
      <h1 className="font-bold text-center">{`${isAddMode ? 'Add' : 'Edit'} Product`}</h1>

      <AddEditProductForm initialValues={result?.payload?.data} />
    </div>
  )
}
