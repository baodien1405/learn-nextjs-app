import Image from 'next/image'

import { productService } from '@/services'

interface ProductDetailsPageProps {
  params: { productId: string }
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  let product = null

  try {
    const { payload } = await productService.get(params.productId)
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
