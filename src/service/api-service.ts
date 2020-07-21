import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { ApiConfig, AppHeader, AuthUser } from 'types-module'
import { generateUuid } from '~/service/global-service'

let sessionId: string|null = null

export const configureAxiosDefaults = (axios: NuxtAxiosInstance) => {
  sessionId = generateUuid()
  axios.onRequest((config) => {
    config.headers.common[AppHeader.SESSION_ID] = sessionId
    config.headers.common[AppHeader.REQUEST_ID] = generateUuid()
  })
}

export const authVerify = (axios: NuxtAxiosInstance) => {
  return axios
    .get(ApiConfig.auth.verify)
    .then((response: AxiosResponse<AuthUser>) => {
      return response.data
    })
}

export const authClaims = (axios: NuxtAxiosInstance, username: string) => {
  const claims = { username }
  return axios.post(ApiConfig.auth.claims, { claims })
}

export const notificationNotify = (axios: NuxtAxiosInstance, notificationId: string) => {
  const notify = ApiConfig.notification.notify
  return axios.post(notify.context.replace(notify.params.notificationId, notificationId))
}
