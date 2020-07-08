<template>
  <div class="container">
    <PageTitle :title="$t('page.privacyAndPolicy.title')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getHeadByRouteType } from '~/service/seo-service'
import { Routes } from '~/types'
import PageTitle from '~/components/ui/PageTitle.vue'

  @Component({
    components: { PageTitle }
  })
export default class privacyPolicy extends Vue {
    head () {
      return getHeadByRouteType(Routes.PRIVACY_POLICY, this)
    }
  }
</script>
