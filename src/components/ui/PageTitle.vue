<template>
  <div class="columns has-margin-bottom-25 has-margin-top-25">
    <div class="column has-text-centered">
      <h1 class="title">
        {{ title }}
      </h1>
      <h2 v-if="subtitle" class="subtitle has-margin-15">
        {{ subtitle }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

  @Component({
    components: {}
  })
export default class PageTitle extends Vue {
    @Prop({ type: String, required: true }) title : string
    @Prop({ type: String, required: false, default: null }) subtitle : string
}
</script>
