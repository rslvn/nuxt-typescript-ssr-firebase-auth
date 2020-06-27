<template>
  <div class="container">
    <PageTitle :title="$t('page.search.title')"></PageTitle>

    <div class="columns is-centered">
      <div class="column is-half">
        <b-field :label="$t('common.field.search')" label-position="on-border" position="is-centered" grouped>
          <b-input
            v-model="query"
            :loading="isFetching"
            :placeholder="$t('common.field.searchPlaceholder')"
            type="search"
            icon="magnify"
            @keyup.enter.native="enterPressed"
            rounded expanded
          />
          <b-button @click="searchByPage(1)" :loading="isFetching" type="is-primary" rounded>{{$t('common.search')}}
          </b-button>
        </b-field>
      </div>
    </div>

    <div v-if="hasResult" class="columns is-centered is-multiline">
      <div class="column is-full">
        <SearchConfig :total="total" :per-page.sync="perPage"/>
      </div>

      <div class="column is-full">
        <SearchPaging :current.sync="current" :total="total" :per-page="perPage" :on-page-change="onPageChange"/>
      </div>

      <div class="column is-half">
        <SearchResultCard v-for="(item, index) in list" :key="index" :search-result="item"/>
      </div>

      <div class="column is-full">
        <SearchPaging :current.sync="current" :total="total" :per-page="perPage" :on-page-change="onPageChange"/>
      </div>

      <b-loading :is-full-page="false" :active.sync="isFetching" :can-cancel="false"></b-loading>
    </div>

    <div v-if="noResult && searched" class="columns is-centered">
      <div class="column has-text-centered">
        <span> {{ $t('page.search.noResult') }} </span>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'nuxt-property-decorator';
  import { Context } from '@nuxt/types';
  import { AuthUser, QueryParameters, Routes, SearchData, StateNamespace } from '~/types';
  import { getHeadByRouteType } from '~/service/seo-service';
  import PageTitle from '~/components/ui/PageTitle.vue';
  import { sendWarningNotification, showErrorToaster } from '~/service/notification-service';
  import { searchUsers } from '~/service/firebase/firestore';
  import SearchResultCard from '~/components/search/SearchResultCard.vue';
  import SearchPaging from '~/components/search/SearchPaging.vue';
  import SearchConfig from '~/components/search/SearchConfig.vue';

  @Component({
    components: { SearchConfig, SearchPaging, SearchResultCard, PageTitle }
  })
  export default class search extends Vue {
    pagingConfig = {
      rangeBefore: 1,
      rangeAfter: 2,
      simple: false,
      rounded: true,
      order: 'is-centered'
    }

    // paging dynamic config
    total = 1
    current = 1
    perPage = 5

    // search page data
    query = '';
    list: SearchData[] = []
    isFetching = false
    searched = false

    @StateNamespace.auth.Getter authUser !: AuthUser;

    @Watch('perPage')
    onActiveChanged(value: number) {
      this.resetSearch();
    }

    head() {
      return getHeadByRouteType(Routes.SEARCH, this)
    }

    mounted() {
      if (this.query) {
        this.resetSearch()
      }
    }

    async asyncData({ query }: Context) {
      const queryText = (query[QueryParameters.QUERY] as string);

      return {
        query: queryText
      }
    }

    get noResult() {
      return !this.list.length
    }

    get hasResult() {
      return !this.noResult
    }

    watchQuery(newQuery: any) {
      this.query = newQuery[QueryParameters.QUERY];
      this.resetSearch()
    }

    resetSearch() {
      this.searchByPage(1)
    }

    onPageChange(page: number) {
      this.searchByPage(page)
    }

    searching(isSearching: boolean) {
      this.searched = !isSearching
      this.isFetching = isSearching
    }

    searchByPage(page: number) {
      if (!this.authUser) {
        return sendWarningNotification(this.$store.dispatch, this.$t('notification.search.notAllowedToSearch'))
      }

      console.log('searchByPage', page)
      this.searching(true);
      if (!this.query) {
        this.list = []
        return this.searching(false);
      }
      searchUsers(this.query, page, this.perPage)
        .then((pagingResponse) => {
          this.total = pagingResponse.total
          this.list = []
          pagingResponse.data.forEach((searchData: SearchData) => this.list.push(searchData))
        })
        .catch((error: Error) => {
          console.log(error)
          return showErrorToaster(this.$t('notification.search.canNotExecuted'))
        })
        .finally(() => {
          this.searching(false);
        })
    }

    enterPressed() {
      this.resetSearch()
    }

  }
</script>
