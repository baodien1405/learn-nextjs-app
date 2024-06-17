'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

import { clientSessionToken } from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'

type User = AccountResType['data'] | null

interface AppContextInterface {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const AppContext = createContext<AppContextInterface>({
  user: null,
  setUser: () => {}
})

export function AppProvider({
  children,
  initialSessionToken = '',
  user: userProps
}: {
  children: ReactNode
  initialSessionToken?: string
  user: User
}) {
  const [user, setUser] = useState(userProps)
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialSessionToken
    }
  })

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}
