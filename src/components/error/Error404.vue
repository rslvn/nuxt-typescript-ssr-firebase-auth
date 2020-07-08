<template>
  <pre>{{ error }}</pre>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { NuxtError } from '@nuxt/types'

  @Component({
    components: {}
  })
export default class Error404 extends Vue {
    @Prop({ required: true }) error:NuxtError
  }
</script>
