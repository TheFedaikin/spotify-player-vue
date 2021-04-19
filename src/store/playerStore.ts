import { reactive, readonly, onMounted, onUnmounted } from 'vue'
import { getToken, removeTokenFromStorage, saveTokenToStorage } from '@utils'
import { httpClient } from '@http'
import { config } from '@config'
import { Song, SongEntity } from '@entities'

// * For JS code it should be an object/enum (you can also do that in TS).
// * My preference is to keep it out of the runtime, and check in compile time.
type Statuses = 'LOADING' | 'IDLE' | 'AD' | 'TRACK' | 'ERROR'

// * In this case we actually want to provide the wrapper...
// * Because our contract relies on this particular API/endpoint
const SpotifyHttpStatuses = {
  NO_PLAYBACK: 204,
  TOKEN_EXPIRED: 401,
  INTERNAL: 500,
} as const

interface State {
  song: Song
  status: Statuses
  token: string
}

type SetSongInfo = (song: Song) => void

type ChangeStatus = (status: Statuses) => void

interface PlayerStore {
  setSongInfo: SetSongInfo
  changeStatus: ChangeStatus
  state: State
}

const song = SongEntity.createSongInfo()

export const createPlayerStore = (): PlayerStore => {
  const state = reactive<State>({
    status: 'LOADING',
    song,
    token: '',
  })

  const setToken = (token: string) => {
    state.token = token
  }

  const setSongInfo: SetSongInfo = song => {
    state.song = song
  }

  const changeStatus: ChangeStatus = status => {
    state.status = status
  }

  const getSpotifyInfo = async () => {
    if (state.token) {
      const { body, status } = await httpClient(config.apiLink, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      switch (status) {
        case SpotifyHttpStatuses.NO_PLAYBACK:
          return changeStatus('IDLE')
        case SpotifyHttpStatuses.TOKEN_EXPIRED:
          removeTokenFromStorage()
          return changeStatus('LOADING')
        case SpotifyHttpStatuses.INTERNAL:
          return changeStatus('ERROR')
        default:
          if (body?.currently_playing_type === 'ad') {
            changeStatus('AD')
          } else {
            changeStatus('TRACK')
            setSongInfo(SongEntity.createSongInfo(body))
          }
      }
    }
  }

  let interval: NodeJS.Timeout | null = null

  onMounted(async () => {
    changeStatus('LOADING')
    const token = getToken(config.isClient ? window.location.hash : '')
    if (token) {
      setToken(token)
      saveTokenToStorage(token)
      await getSpotifyInfo()
      interval = setInterval(() => getSpotifyInfo(), 5000)
      if (config.isClient) {
        window.location.hash = ''
      }
    }
  })

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })

  return { setSongInfo, changeStatus, state: readonly(state) }
}
