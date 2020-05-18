<template>
  <div>terms</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { getHead } from "~/service/seo-service";
  import { PageMeta, DefaultMeta } from "~/types";

  @Component({
    components: {}
  })
  export default class terms extends Vue {
    pageMeta: PageMeta = {
      ...DefaultMeta,
      title: 'Terms | ' + DefaultMeta.title,
      url: DefaultMeta.url + '/terms'
    }

    head() {
      return getHead(this.pageMeta)
    }
  }
</script>
