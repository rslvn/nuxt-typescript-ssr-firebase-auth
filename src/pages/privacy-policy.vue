<template>
  <div class="container">
    <div class="columns is-centered has-margin-bottom-50">
      <h1 class="title">{{ $t('page.privacyAndPolicy.title') }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { getHead } from "~/service/seo-service";
  import { DefaultMeta, PageMeta, RouteType } from "~/types";

  @Component({
    components: {}
  })
  export default class privacyPolicy extends Vue {
    pageMeta: PageMeta = {
      ...DefaultMeta,
      title: `Policy&Privacy | ${DefaultMeta.title}`,
      url: `${DefaultMeta.url}${RouteType.PRIVACY_POLICY.path}`
    }

    head() {
      return getHead(this.pageMeta)
    }
  }
</script>
