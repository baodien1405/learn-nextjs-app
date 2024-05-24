import { http } from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'

export const accountService = {
  me(sessionToken: string) {
    return http.get<AccountResType>('/account/me', {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    })
  },

  meClient() {
    return http.get<AccountResType>('/account/me')
  }
}
