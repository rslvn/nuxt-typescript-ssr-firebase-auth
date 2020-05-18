<template>
  <div>privacy-policy</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { getHead } from "~/service/seo-service";
  import { PageMeta, DefaultMeta } from "~/types";

  @Component({
    components: {}
  })
  export default class privacyPolicy extends Vue {
    pageMeta: PageMeta = {
      ...DefaultMeta,
      title: 'Policy&Privacy | ' + DefaultMeta.title,
      url: DefaultMeta.url + '/privacy-policy'
    }

    head() {
      return getHead(this.pageMeta)
    }
  }
</script>
