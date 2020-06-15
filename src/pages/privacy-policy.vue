<template>
  <div class="container">
    <div class="columns has-margin-bottom-50">
      <div class="column has-text-centered">
        <h1 class="title">{{ $t('page.privacyAndPolicy.title') }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { getHeadByRouteType } from "~/service/seo-service";
  import { Routes } from "~/types";

  @Component({
    components: {}
  })
  export default class privacyPolicy extends Vue {
    head() {
      return getHeadByRouteType(Routes.PRIVACY_POLICY, this)
    }
  }
</script>
