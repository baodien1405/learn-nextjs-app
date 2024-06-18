'use client'

import { TableHead } from '@/components/ui/table'
import { getSessionTokenFromLS } from '@/lib/common'
import { isClient } from '@/lib/http'

export function ActionTableHead() {
  const isAuthenticated = isClient && Boolean(getSessionTokenFromLS())

  if (!isAuthenticated) return null

  return <TableHead>Actions</TableHead>
}
