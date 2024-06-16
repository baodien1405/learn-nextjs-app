import { http } from '@/lib/http'
import { MessageResType } from '@/schemaValidations/common.schema'
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType
} from '@/schemaValidations/product.schema'

export const productService = {
  getAll() {
    return http.get<ProductListResType>('/products', {
      cache: 'no-store'
    })
  },

  get(id: string) {
    return http.get<ProductResType>(`/products/${id}`, {
      cache: 'no-store'
    })
  },

  add(body: CreateProductBodyType) {
    return http.post<ProductResType>('/products', body)
  },

  update(id: number, body: UpdateProductBodyType) {
    return http.put<ProductResType>(`/products/${id}`, body)
  },

  delete(id: number) {
    return http.delete<MessageResType>(`/products/${id}`)
  },

  uploadImage(body: FormData) {
    return http.post<{ message: string; data: string }>(`/media/upload`, body)
  }
}
