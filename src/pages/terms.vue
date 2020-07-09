<template>
  <div class="container">
    <PageTitle :title="$t('page.terms.title')" />
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
export default class terms extends Vue {
  head () {
    return getHeadByRouteType(Routes.TERMS, this)
  }
}
</script>
