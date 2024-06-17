import Image from 'next/image'
import { cache } from 'react'
import { Metadata } from 'next'

import { productService } from '@/services'
import { envConfig } from '@/configs'
import { baseOpenGraph } from '@/app/shared-metadata'

type Props = {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getProductDetails = cache(productService.get)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { payload } = await getProductDetails(params.productId)
  const product = payload?.data
  const url = `${envConfig.NEXT_PUBLIC_URL}/products/${product.id}/details`

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      ...baseOpenGraph,
      title: product.name,
      description: product.description,
      url,
      images: [
        {
          url: product.image
        }
      ]
    },
    alternates: {
      canonical: url
    }
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  let product = null

  try {
    const { payload } = await getProductDetails(params.productId)
    product = payload?.data
  } catch (error) {
    product = null
  }

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
