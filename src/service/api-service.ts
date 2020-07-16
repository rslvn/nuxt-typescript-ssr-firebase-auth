import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { ApiConfig, AuthUser } from '~/types'

export const authVerify = async (axios: NuxtAxiosInstance) => {
  return await axios
    .get(ApiConfig.auth.verify)
    .then((response: AxiosResponse<AuthUser>) => {
      return response.data
    })
}

export const authClaims = async (
  axios: NuxtAxiosInstance,
  username: string
) => {
  const claims = { username }
  return await axios.post(ApiConfig.auth.claims, { claims })
}

export const notificationNotify = async (
  axios: NuxtAxiosInstance,
  notificationId: string
) => {
  const notify = ApiConfig.notification.notify
  return await axios.post(notify.context.replace(notify.params.notificationId, notificationId))
}
