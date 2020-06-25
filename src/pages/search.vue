<template>
  <div>{{query}}</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { Context } from '@nuxt/types';
  import { AuthUser, QueryParameters, Routes, StateNamespace } from '~/types';
  import { getHeadByRouteType } from '~/service/seo-service';
  import { searchWithNewQuery } from '~/service/rx-service';

  @Component({
    components: {}
  })
  export default class search extends Vue {

    @StateNamespace.auth.Getter authUser !: AuthUser;

    query: string | null = null;

    head() {
      return getHeadByRouteType(Routes.SEARCH, this)
    }

    async asyncData({ query }: Context) {
      const queryText = (query[QueryParameters.QUERY] as string);

      return {
        query: queryText
      }
    }

    created() {
      this.$subscribeTo(searchWithNewQuery.asObservable(), (query: string) => {
        this.query = query
      })
    }
  }
</script>
