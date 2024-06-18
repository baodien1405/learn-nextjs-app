import { AccountResType } from '@/schemaValidations/account.schema'

export const getSessionTokenFromLS = () => localStorage.getItem('sessionToken')

export const setSessionTokenToLS = (sessionToken: string) => {
  localStorage.setItem('sessionToken', sessionToken)
}

export const removeSessionTokenToLS = () => {
  localStorage.removeItem('sessionToken')
}

export const getSessionTokenExpiresAtFromLS = () => localStorage.getItem('sessionTokenExpiresAt')

export const setSessionTokenExpiresAtToLS = (sessionTokenExpiresAt: string) => {
  localStorage.setItem('sessionTokenExpiresAt', sessionTokenExpiresAt)
}

export const removeSessionTokenExpiresAtToLS = () => {
  localStorage.removeItem('sessionTokenExpiresAt')
}

export const getUserFromLS = () => localStorage.getItem('user')

export const setUserToLS = (user: AccountResType['data'] | null) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserToLS = () => {
  localStorage.removeItem('user')
}
