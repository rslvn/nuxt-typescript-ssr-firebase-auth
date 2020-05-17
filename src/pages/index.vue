<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">
        <h1 class="header">{{ $t('page.home.title') }}</h1>
      </div>
      <div class="columns">
        <card
          title="Free"
          icon="github-circle"
        >
          Open source on <a href="https://github.com/buefy/buefy">
          GitHub
        </a>
        </card>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"
  import { getHead } from "~/service/seo-service"
  import { DefaultMeta } from "~/types"

  @Component({
    components: {}
  })
  export default class extends Vue {
    head() {
      return getHead(DefaultMeta)
    }
  }
</script>

