'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

import { getUserFromLS, setUserToLS } from '@/lib/common'
import { AccountResType } from '@/schemaValidations/account.schema'

type User = AccountResType['data'] | null

interface AppContextInterface {
  user: User
  setUser: (user: User) => void
  isAuthenticated: boolean
}

const AppContext = createContext<AppContextInterface>({
  user: null,
  setUser: () => {},
  isAuthenticated: false
})

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) throw Error('context must be in useAppContext')

  return context
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(null)

  useEffect(() => {
    const _user = getUserFromLS()
    setUserState(_user ? JSON.parse(_user) : null)
  }, [setUserState])

  const isAuthenticated = Boolean(user)

  const setUser = useCallback(
    (user: User) => {
      setUserState(user)
      setUserToLS(user)
    },
    [setUserState]
  )

  return <AppContext.Provider value={{ user, setUser, isAuthenticated }}>{children}</AppContext.Provider>
}
