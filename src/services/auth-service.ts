import { http } from '@/lib/http'
import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType } from '@/schemaValidations/auth.schema'
import { MessageResType } from '@/schemaValidations/common.schema'

export const authService = {
  login(body: LoginBodyType) {
    return http.post<LoginResType>('/auth/login', body)
  },

  register(body: RegisterBodyType) {
    return http.post<RegisterResType>('/auth/register', body)
  },

  auth(body: { sessionToken: string }) {
    return http.post('/api/auth', body, {
      baseUrl: ''
    })
  },

  logoutFromNextServerToServer(sessionToken: string) {
    return http.post<MessageResType>(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    )
  },

  logoutFromNextClientToNextServer() {
    return http.post(
      '/api/auth/logout',
      {},
      {
        baseUrl: ''
      }
    )
  }
}
