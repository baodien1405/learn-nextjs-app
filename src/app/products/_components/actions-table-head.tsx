'use client'

import { TableHead } from '@/components/ui/table'
import { useAppContext } from '@/providers'

export function ActionTableHead() {
  const { isAuthenticated } = useAppContext()

  if (!isAuthenticated) return null

  return <TableHead>Actions</TableHead>
}
