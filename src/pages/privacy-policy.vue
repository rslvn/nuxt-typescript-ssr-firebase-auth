<template>
  <div>privacy-policy</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { getHead } from "~/service/seo-service";
  import { DefaultMeta } from "~/types";

  @Component({
    components: {}
  })
  export default class privacyPolicy extends Vue {
    head() {
      return getHead(DefaultMeta, 'Policy&Privacy')
    }
  }
</script>
