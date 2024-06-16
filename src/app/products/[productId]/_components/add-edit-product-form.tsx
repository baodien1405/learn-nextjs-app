'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { ProductType, UpdateProductBody, UpdateProductBodyType } from '@/schemaValidations/product.schema'
import { productService } from '@/services'

interface AddEditProductFormProps {
  initialValues?: Partial<ProductType>
  onSubmit?: () => void
}

export function AddEditProductForm({ initialValues }: AddEditProductFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

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

  const image = form.watch('image')

  async function onSubmit(values: UpdateProductBodyType) {
    try {
      setLoading(true)

      let response

      if (initialValues?.id) {
        let payload = values

        if (file) {
          const formData = new FormData()
          formData.append('file', file as Blob)

          const uploadImageResult = await productService.uploadImage(formData)

          const imageUrl = uploadImageResult.payload.data
          payload = {
            ...values,
            image: imageUrl
          }
        }

        response = await productService.update(initialValues.id, payload)
      } else {
        const formData = new FormData()
        formData.append('file', file as Blob)

        const uploadImageResult = await productService.uploadImage(formData)
        const imageUrl = uploadImageResult.payload.data

        response = await productService.add({
          ...values,
          image: imageUrl
        })
      }

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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="picture">Picture</FormLabel>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setFile(file)
                      field.onChange(`http://localhost:3000/${file.name}`)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(file || image) && (
          <div>
            <Image
              src={file ? URL.createObjectURL(file) : image}
              width={128}
              height={128}
              alt="preview"
              className="w-32 h-32 object-cover"
            />

            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => {
                setFile(null)
                form.setValue('image', '')
                if (inputRef.current) {
                  inputRef.current.value = ''
                }
              }}
            >
              Remove Image
            </Button>
          </div>
        )}

        <Button type="submit" className="!mt-8 w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialValues?.id ? 'Save' : 'Add'}
        </Button>
      </form>
    </Form>
  )
}
