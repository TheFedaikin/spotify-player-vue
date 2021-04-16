export * from './storage'
import { getTokenFromStorage } from './storage'

export const getToken = (hash: string): string => {
  const token = hash.includes('access_token=') ? hash.split('access_token=')[1].split('&')[0] : null
  if (!token) {
    const savedToken = getTokenFromStorage()
    if (!savedToken) {
      return ''
    }
    return savedToken
  }
  return token
}
