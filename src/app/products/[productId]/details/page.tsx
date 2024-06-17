import Image from 'next/image'
import { cache } from 'react'

import { productService } from '@/services'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getProductDetails = cache(productService.get)

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { payload } = await getProductDetails(params.productId)
  const product = payload?.data

  return {
    title: product.name,
    description: product.description
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  let product = null

  try {
    const { payload } = await getProductDetails(params.productId)
    product = payload?.data
  } catch (error) {}

  if (!product) {
    return null
  }

  return (
    <div className="inline-flex p-4 rounded-lg gap-3 border">
      <div>
        <Image src={product.image} width={48} height={48} alt={product.name} />
      </div>

      <div>
        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <h4>{product.price}</h4>
      </div>
    </div>
  )
}
