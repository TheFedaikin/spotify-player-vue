// * This interface can be lifted up if necessary
interface ApiData {
  is_playing?: boolean
  progress_ms?: number
  item?: Item
}

interface Item {
  duration_ms?: number
  album?: {
    images?: [AlbumImages, AlbumImages, AlbumImages]
  }
  artists?: [Artists]
  name?: string
}

interface AlbumImages {
  url?: string
}

interface Artists {
  name?: string
}

export interface Song {
  albumCover: string
  artist: string
  duration: number
  isPlaying: boolean
  name: string
  progress: number
}

const createSongInfo = (data?: ApiData): Song => {
  const isPlaying = data?.is_playing ?? false
  const progress = data?.progress_ms ?? 0
  const albumCover = data?.item?.album?.images?.[1]?.url
    ? `url(${data?.item?.album?.images?.[1]?.url})`
    : ''
  const artist = data?.item?.artists?.[0]?.name ?? ''
  const duration = data?.item?.duration_ms ?? 0
  const name = data?.item?.name ?? ''

  return { isPlaying, progress, albumCover, artist, duration, name }
}

export const SongEntity = {
  createSongInfo,
}
