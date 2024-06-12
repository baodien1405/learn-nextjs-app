import { http } from '@/lib/http'
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType
} from '@/schemaValidations/auth.schema'
import { MessageResType } from '@/schemaValidations/common.schema'

export const authService = {
  login(body: LoginBodyType) {
    return http.post<LoginResType>('/auth/login', body)
  },

  register(body: RegisterBodyType) {
    return http.post<RegisterResType>('/auth/register', body)
  },

  auth(body: { sessionToken: string; expiresAt: string }) {
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

  logoutFromNextClientToNextServer(force?: boolean, signal?: AbortSignal | undefined) {
    return http.post(
      '/api/auth/logout',
      { force },
      {
        baseUrl: '',
        signal
      }
    )
  },

  slideSessionFromNextServerToServer(sessionToken: string) {
    return http.post<SlideSessionResType>(
      '/auth/slide-session',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    )
  },

  slideSessionFromNextClientToNextServer() {
    return http.post<SlideSessionResType>(
      '/api/auth/slide-session',
      {},
      {
        baseUrl: ''
      }
    )
  }
}
