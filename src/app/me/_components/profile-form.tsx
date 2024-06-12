'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from '@/schemaValidations/account.schema'
import { accountService } from '@/services'

interface ProfileFormProps {
  profile: AccountResType['data']
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name
    }
  })

  async function onSubmit(values: UpdateMeBodyType) {
    try {
      setLoading(true)
      const result = await accountService.updateMe(values)

      toast({ description: result.payload.message })

      router.refresh()
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-2 max-w-[400px] w-full">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="Email" type="email" value={profile.email} readOnly />
        </FormControl>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  )
}
