import { config } from '@vue/test-utils'
config.mocks.$t = (key: string) => key
config.showDeprecationWarnings = false
