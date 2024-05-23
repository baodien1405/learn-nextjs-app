'use client'

import { ReactNode, createContext, useState, useContext } from 'react'

const AppContext = createContext({
  sessionToken: '',
  setSessionToken: (token: string) => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}

export function AppProvider({
  children,
  initialSessionToken = ''
}: {
  children: ReactNode
  initialSessionToken?: string
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken)

  return <AppContext.Provider value={{ sessionToken, setSessionToken }}>{children}</AppContext.Provider>
}
