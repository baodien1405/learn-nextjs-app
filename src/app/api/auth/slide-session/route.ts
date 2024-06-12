import { cookies } from 'next/headers'

import { HttpError } from '@/lib/http'
import { authService } from '@/services'

export async function POST() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được sessionToken' },
      {
        status: 400
      }
    )
  }

  try {
    const res = await authService.slideSessionFromNextServerToServer(sessionToken.value)
    const newExpiredDate = new Date(res.payload.data.expiresAt).toUTCString()

    return Response.json(res.payload, {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken.value}; Path=/; HttpOnly; Expires=${newExpiredDate}; SameSite=Lax; Secure`
      }
    })
  } catch (error) {
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
