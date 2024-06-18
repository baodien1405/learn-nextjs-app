import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { baseOpenGraph } from '@/app/shared-metadata'
import Header from '@/components/header'
import SlideSession from '@/components/slide-session'
import { Toaster } from '@/components/ui/toaster'
import { AppProvider, ThemeProvider } from '@/providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | ShopApp',
    default: 'ShopApp'
  },
  description: 'Create by Bao Dien',
  openGraph: baseOpenGraph
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Toaster />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProvider>
            <Header />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
