<template>
  <div class="columns has-text-centered is-gapless">
    <div class="column is-6">
      <p class="has-margin-left-15">
        <small v-html="$t('page.footer.copyRight')" />
        <a :href="routes.HOME.path">nuxt-typescript-ssr-firebase-auth</a>
      </p>
    </div>
    <div class="column is-6">
      <a class="has-margin-left-10 has-margin-right-15" :href="routes.TERMS.path"> {{ $t('page.terms.title') }}</a>
      <a :href="routes.PRIVACY_POLICY.path">{{ $t('page.privacyAndPolicy.title') }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Routes } from '~/types'

  @Component({
    components: {}
  })
export default class AppFooter extends Vue {
    routes = Routes
  }
</script>
