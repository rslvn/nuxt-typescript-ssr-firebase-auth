<template>
  <div>terms</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { getHead } from "~/service/helper/global-helpers";
  import { DefaultMeta } from "~/types";

  @Component({
    components: {}
  })
  export default class terms extends Vue {
    head(){
      return getHead(DefaultMeta, 'Terms')
    }
  }
</script>
