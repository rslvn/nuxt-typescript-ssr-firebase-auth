<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { NuxtError } from '@nuxt/types'
import Error403 from '~/components/error/Error403.vue'
import Error404 from '~/components/error/Error404.vue'
import Error500 from '~/components/error/Error500.vue'

  @Component({
    components: {}
  })
export default class error extends Vue {
    @Prop({ required: true }) error : NuxtError

    get errorPage () {
      if (this.error.statusCode === 404) {
        return Error404
      }
      if (this.error.statusCode === 403) {
        return Error403
      }
      // catch everything else
      return Error500
    }
}
</script>
