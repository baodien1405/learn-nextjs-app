import { envConfig } from '@/configs'
import { normalizePath } from '@/lib/utils'
import { LoginResType, RegisterResType } from '@/schemaValidations/auth.schema'
import { redirect } from 'next/navigation'

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }

  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload

  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

class ClientSessionToken {
  private token = ''
  private _expiresAt = new Date().toISOString()

  get value() {
    return this.token
  }

  set value(token: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side')
    }

    this.token = token
  }

  get expiresAt() {
    return this._expiresAt
  }

  set expiresAt(expiresAt: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set expiresAt on server side')
    }

    this._expiresAt = expiresAt
  }
}

export const clientSessionToken = new ClientSessionToken()

let clientLogoutRequest: null | Promise<any>

export const isClient = typeof window !== 'undefined'

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined

  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
        }
      : {
          'Content-Type': 'application/json',
          Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
        }

  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    body,
    method
  })

  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }

  // Handle interceptors
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        }
      )
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      // Handle auto logout from next client
      if (isClient) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {}
          })
          await clientLogoutRequest
          clientSessionToken.value = ''
          clientSessionToken.expiresAt = new Date().toISOString()
          location.href = '/login'
        }
      } else {
        const sessionToken = (options?.headers as any)?.Authorization.split('Bearer ')[1]
        redirect(`/logout?sessionToken=${sessionToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }

  if (isClient) {
    const isMatchPath = ['auth/login', 'auth/register'].some((path) => path === normalizePath(url))

    if (isMatchPath) {
      clientSessionToken.value = (payload as LoginResType | RegisterResType).data.token
      clientSessionToken.expiresAt = (payload as LoginResType | RegisterResType).data.expiresAt
    } else if ('auth/logout' === normalizePath(url)) {
      clientSessionToken.value = ''
      clientSessionToken.expiresAt = new Date().toISOString()
    }
  }

  return data
}

export const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('DELETE', url, { ...options })
  }
}
