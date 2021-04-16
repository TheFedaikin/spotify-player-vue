/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '@config'

type ApiClientResponse<T> = Promise<{ status: number; body: T; response?: Response }>

const parseBody = async (response: Response) => {
  const text = await response.text()
  try {
    const json = JSON.parse(text)
    return json
  } catch (error) {
    // In real app this would be wrapped into logger/debugger and send to analytics
    config.isDevelopment && console.warn(error)
    return text
  }
}
// * We assume modern browsers so we don't check for fetch availability, but for SSR check we add check for window, so if environment is different we won't get an error
// * We can also use some isomorphic library here, but as a safety measure for demo purposes this should be enough
const fetch = config.isClient
  ? window.fetch
  : async (): Promise<Response> =>
      ({ status: 0, json: async () => ({}), text: async () => '' } as Response)

const createHttpClient = () => {
  return async <T = any>(url: RequestInfo, options?: RequestInit): ApiClientResponse<T> => {
    try {
      const response = await fetch(url, options)
      const body = await parseBody(response)
      return { body, status: response.status, response }
    } catch (error) {
      config.isDevelopment && console.warn(error)
      return { body: '' as any, status: 500 }
    }
  }
}

export const httpClient = createHttpClient()
