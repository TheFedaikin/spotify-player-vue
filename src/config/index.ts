interface Config {
  apiLink: string
  loginLink: string
  isClient: boolean
  isDevelopment: boolean
}

const createConfig = (): Config => {
  const isClient = typeof window !== 'undefined'
  const isDevelopment = import.meta.env.DEV
  // * Apparently Vite will inline these variables but it's ok for this case...
  // *  Because everything will be exposed in the query parameters of the redirect
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const redirectUri = import.meta.env.VITE_REDIRECT

  const apiLink = 'https://api.spotify.com/v1/me/player'
  const authEndpoint = 'https://accounts.spotify.com/authorize'
  const scopes = ['user-top-read', 'user-read-currently-playing', 'user-read-playback-state']
  const loginLink = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20',
  )}&response_type=token&show_dialog=true`

  return {
    apiLink,
    loginLink,
    isClient,
    isDevelopment,
  }
}

export const config = createConfig()
