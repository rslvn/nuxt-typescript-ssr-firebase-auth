<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">
        <h1 class="header">{{ $t('page.home.title') }}</h1>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"

  @Component({
    components: {}
  })
  export default class extends Vue {
  }
</script>

