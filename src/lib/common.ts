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
