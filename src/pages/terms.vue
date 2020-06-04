<template>
  <div class="container">
    <div class="columns has-margin-bottom-50">
      <div class="column has-text-centered">
        <h1 class="title">{{ $t('page.terms.title') }}</h1>
      </div>
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
  export default class terms extends Vue {
    pageMeta: PageMeta = {
      ...DefaultMeta,
      title: `Terms | ${DefaultMeta.title}`,
      url: `${DefaultMeta.url}${RouteType.TERMS.path}`
    }

    head() {
      return getHead(this.pageMeta)
    }
  }
</script>
