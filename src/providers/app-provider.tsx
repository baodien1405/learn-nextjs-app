'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

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

export function AppProvider({ children, user: userProps }: { children: ReactNode; user: User }) {
  const [user, setUser] = useState(userProps)

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}
