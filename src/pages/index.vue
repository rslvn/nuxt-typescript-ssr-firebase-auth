<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered has-margin-bottom-50">
        <h1 class="header">{{ $t('page.home.title') }}</h1>
      </div>
      <div class="columns is-centered">
        <a class="box" href="https://github.com/rslvn/nuxt-typescript-ssr-firebase-auth">
          <b-icon
            pack="fab"
            icon="github"
            size="is-large">
          </b-icon>
          <span>
            Go to sourceon Github
          </span>
        </a>
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

