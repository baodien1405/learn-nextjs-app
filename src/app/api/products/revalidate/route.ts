import { revalidateTag } from 'next/cache'

export async function GET() {
  revalidateTag('products')
  return Response.json({ revalidated: true, now: Date.now() })
}
