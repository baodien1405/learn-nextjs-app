'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ProductType } from '@/schemaValidations/product.schema'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { handleErrorApi } from '@/lib/utils'
import { productService } from '@/services'
import { useToast } from '@/components/ui/use-toast'

interface DeleteProductButtonProps {
  product: ProductType
}

export function DeleteProductButton({ product }: DeleteProductButtonProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteProduct = async () => {
    if (isLoading) return
    try {
      setIsLoading(true)
      const response = await productService.delete(product.id)

      toast({ description: response.payload.message })
      router.refresh()
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>Product &rdquo;{product.name}&rdquo; will remove forever!!!</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
