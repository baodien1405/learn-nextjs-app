import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'This is homepage of ShopApp, create by Bao Dien'
}

export default function Home() {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">HomePage</main>
}
