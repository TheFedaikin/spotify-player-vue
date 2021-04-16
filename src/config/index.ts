type Config = {
  apiLink: string
  loginLink: string
  isClient: boolean
  isDevelopment: boolean
}

const createConfig = (): Config => {
  const isClient = typeof window !== 'undefined'
  const isDevelopment = import.meta.env.DEV
  // ! Apparently I catch on that this will be inlined and therefore exposed to the client, but time ran out :(
  // TODO: Fix me ASAP
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID

  const authEndpoint = 'https://accounts.spotify.com/authorize'
  const redirectUri = 'http://localhost:3000'
  const scopes = ['user-top-read', 'user-read-currently-playing', 'user-read-playback-state']

  const loginLink = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20',
  )}&response_type=token&show_dialog=true`
  const apiLink = 'https://api.spotify.com/v1/me/player'

  return {
    apiLink,
    loginLink,
    isClient,
    isDevelopment,
  }
}

export const config = createConfig()
