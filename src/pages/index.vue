<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">
        <h1 class="header">{{ $t('page.home.title') }}</h1>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"
  import { getHead } from "~/service/helper/global-helpers";
  import { DefaultMeta } from "~/types";

  @Component({
    components: {}
  })
  export default class extends Vue {
    head(){
      return getHead(DefaultMeta)
    }
  }
</script>

