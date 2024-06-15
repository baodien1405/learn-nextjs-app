import { http } from '@/lib/http'
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType
} from '@/schemaValidations/product.schema'

export const productService = {
  getAll() {
    return http.get<ProductListResType>('/products')
  },

  get(id: string) {
    return http.get<ProductResType>(`/products/${id}`)
  },

  add(body: CreateProductBodyType) {
    return http.post<ProductResType>('/products', body)
  },

  update(id: number, body: UpdateProductBodyType) {
    return http.put<ProductResType>(`/products/${id}`, body)
  },

  uploadImage(body: FormData) {
    return http.put<{ message: string; data: string }>(`/media/upload`, body)
  }
}
