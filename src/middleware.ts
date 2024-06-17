import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/me']
const authPaths = ['/login', '/register']
const addEditProductRegex = /^\/products\/(add|\d+)$/

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const sessionToken = request.cookies.get('sessionToken')?.value

  if (privatePaths.some((path) => pathname.startsWith(path) && !sessionToken)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authPaths.some((path) => pathname.startsWith(path) && sessionToken)) {
    return NextResponse.redirect(new URL('/me', request.url))
  }

  if (pathname.match(addEditProductRegex) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/me', '/login', '/register', '/products/:path*']
}
