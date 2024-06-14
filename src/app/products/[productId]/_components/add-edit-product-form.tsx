'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import {
  ProductResType,
  ProductType,
  UpdateProductBody,
  UpdateProductBodyType
} from '@/schemaValidations/product.schema'
import { Textarea } from '@/components/ui/textarea'
import { productService } from '@/services/product-service'

interface AddEditProductFormProps {
  initialValues?: Partial<ProductType>
  onSubmit?: () => void
}

export function AddEditProductForm({ initialValues }: AddEditProductFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<ProductType>({
    resolver: zodResolver(UpdateProductBody),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      image: '',
      ...initialValues
    }
  })

  async function onSubmit(values: UpdateProductBodyType) {
    try {
      setLoading(true)

      let response
      if (initialValues?.id) {
        response = await productService.update(initialValues.id, values)
      } else {
        response = await productService.add(values)
      }

      console.log('🚀 ~ onSubmit ~ response:', response)
      toast({ description: response?.payload?.message })

      router.push('/products')
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
        noValidate
        className="space-y-2 max-w-[400px] w-full px-4"
      >
        <h1 className="font-bold text-center">Add</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="picture">Picture</FormLabel>
              <FormControl>
                <Input id="picture" type="file" accept="image/*" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  )
}
