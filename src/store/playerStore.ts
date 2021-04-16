import { reactive, readonly, onMounted, onUnmounted } from 'vue'
import { getToken, removeTokenFromStorage, saveTokenToStorage } from '@utils'
import { httpClient } from '@http'
import { config } from '@config'
import { Song, SongEntity } from '@entities'

// * For JS code it should be an object/enum (you can also do that in TS).
// * My preference is to keep it out of the runtime, and check in compile time.
type Statuses = 'LOADING' | 'IDLE' | 'AD' | 'TRACK' | 'ERROR'

type State = {
  song: Song
  status: Statuses
  token: string
}

type SetSongInfo = (song: Song) => void

type ChangeStatus = (status: Statuses) => void

type PlayerStore = {
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
        case 204:
          return changeStatus('IDLE')
        case 401:
          removeTokenFromStorage()
          return changeStatus('LOADING')
        case 500:
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
