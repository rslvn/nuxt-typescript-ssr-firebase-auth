import { Plugin } from '@nuxt/types'
import { configureAxiosObservable } from '~/service/rx-service'
import { configureAxiosDefaults } from '~/service/api-service'

const axiosPlugin: Plugin = ({ app }) => {
  configureAxiosObservable.asObservable().subscribe(() => {
    configureAxiosDefaults(app.$axios)
  })
  configureAxiosDefaults(app.$axios)
}

export default axiosPlugin
