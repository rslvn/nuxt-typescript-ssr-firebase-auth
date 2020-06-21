import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ApiConfig, AuthUser } from '~/types'
import { AxiosResponse } from 'axios'

export const authVerify = async (axios: NuxtAxiosInstance) => {
  return await axios
    .get(ApiConfig.auth.verify)
    .then((response: AxiosResponse<AuthUser>) => {
      console.log('decoded User on Server', response.data)
      return response.data
    })
}

export const authClaims = async (
  axios: NuxtAxiosInstance,
  username: string
) => {
  let claims = { username }
  return await axios.post(ApiConfig.auth.claims, { claims })
}
