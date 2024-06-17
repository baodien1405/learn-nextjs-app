import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import SlideSession from '@/components/slide-session'
import { AppProvider, ThemeProvider } from '@/providers'
import { accountService } from '@/services'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | ShopApp',
    default: 'ShopApp'
  },
  description: 'Create by Bao Dien'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  let user = null

  if (sessionToken?.value) {
    try {
      const response = await accountService.me(sessionToken?.value)
      user = response.payload.data
    } catch (error) {
      user = null
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Toaster />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProvider initialSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
