import { cookies } from 'next/headers'

import { HttpError } from '@/lib/http'
import { authService } from '@/services'

export async function POST(request: Request) {
  const res = await request.json()
  const force = res.force as boolean | undefined

  if (force) {
    return Response.json(
      {
        message: 'Force logout success'
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
        }
      }
    )
  }

  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được sessionToken' },
      {
        status: 401
      }
    )
  }

  try {
    const result = await authService.logoutFromNextServerToServer(sessionToken.value)

    return Response.json(result.payload, {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
      }
    })
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error)
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        { message: 'Lỗi không xác định' },
        {
          status: 500
        }
      )
    }
  }
}
