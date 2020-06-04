<template>
  <div class="container">
    <div class="columns has-margin-bottom-50">
      <div class="column has-text-centered">
        <h1 class="title">{{ $t('page.home.title') }}</h1>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-one-quarter-desktop">
        <a class="box has-text-centered" href="https://github.com/rslvn/nuxt-typescript-ssr-firebase-auth">
          <b-icon
            pack="fab"
            icon="github"
            size="is-large">
          </b-icon>
          <span v-html="$t('page.home.goToSource')"/>
        </a>
      </div>
    </div>
  </div>
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

