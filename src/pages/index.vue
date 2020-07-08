<template>
  <div class="container">
    <PageTitle :title="$t('page.home.title')" />

    <div class="columns is-centered">
      <div class="column is-5-desktop">
        <a class="box has-text-centered" href="https://github.com/rslvn/nuxt-typescript-ssr-firebase-auth">
          <b-icon
            pack="fab"
            icon="github"
            size="is-large"
          />
          <span v-html="$t('page.home.goToSource')" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getHead } from '~/service/seo-service'
import { DefaultMeta } from '~/types'
import PageTitle from '~/components/ui/PageTitle.vue'

  @Component({
    components: { PageTitle }
  })
export default class extends Vue {
    head () {
      return getHead(DefaultMeta)
    }
  }
</script>
