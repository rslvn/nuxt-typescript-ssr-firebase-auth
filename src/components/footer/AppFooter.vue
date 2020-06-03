<template>
  <div>
    <p class="has-margin-left-15"><small v-html="$t('page.footer.copyRight')"></small>
      <a :href="routeType.HOME.path">nuxt-typescript-ssr-firebase-auth</a>
    </p>

    <a class="is-pulled-right has-margin-left-10 has-margin-right-15" :href="routeType.TERMS.path"> {{ $t('page.terms.title') }}</a>
    <a class="is-pulled-right" :href="routeType.PRIVACY_POLICY.path">{{ $t('page.privacyAndPolicy.title') }}</a>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { RouteType } from '~/types';

  @Component({
    components: {}
  })
  export default class AppFooter extends Vue {

    routeType = RouteType
  }
</script>
