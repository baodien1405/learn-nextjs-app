import { envConfig } from '@/configs'
import { LoginResType, RegisterResType } from '@/schemaValidations/auth.schema'

const ENTITY_ERROR_STATUS = 422

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

class HttpError extends Error {
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

  get value() {
    return this.token
  }

  set value(token: string) {
    if (typeof window === undefined) {
      throw new Error('Cannot set token on server side')
    }

    this.token = token
  }
}

export const clientSessionToken = new ClientSessionToken()

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined

  const baseHeaders = {
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
    },
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
    } else {
      throw new HttpError(data)
    }
  }

  if (['/auth/login', '/auth/register'].includes(url)) {
    clientSessionToken.value = (payload as LoginResType | RegisterResType).data.token
  } else if (['/auth/logout'].includes(url)) {
    clientSessionToken.value = ''
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
  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('DELETE', url, { ...options, body })
  }
}
