<template>
  <div class="container">
    <PageTitle :title="$t('page.search.title')" />

    <SearchField :query.sync="query" :is-fetching="isFetching" :reset-search="resetSearch" />

    <Paging v-if="hasResult" :total="total" :per-page.sync="perPage" :current.sync="current" :is-fetching="isFetching"
            :on-page-change="onPageChange"
    >
      <template slot="searchResult">
        <SearchResultCard v-for="(item, index) in list" :key="index" :search-result="item" />
      </template>
    </Paging>

    <div v-if="!hasResult && searched" class="columns is-centered">
      <div class="column has-text-centered">
        <span> {{ $t('page.search.noResult') }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { AuthUser, QueryParameters, Routes, SearchData, StateNamespace } from '~/types'
import { getHeadByRouteType } from '~/service/seo-service'
import { sendWarningNotification, showErrorToaster } from '~/service/notification-service'
import { searchUsers } from '~/service/firebase/firestore'
import PageTitle from '~/components/ui/PageTitle.vue'
import SearchResultCard from '~/components/search/SearchResultCard.vue'
import Paging from '~/components/ui/paging/Paging.vue'
import SearchField from '~/components/search/SearchField.vue'

@Component({
  components: { SearchField, Paging, SearchResultCard, PageTitle }
})
export default class search extends Vue {
  // paging dynamic config
  total = 1
  current = 1
  perPage = 5

  // search page data
  query = '';
  list: SearchData[] = []
  isFetching = false
  searched = false

  @StateNamespace.auth.Getter authUser: AuthUser;

  @Watch('perPage')
  onPerPageChanged () {
    this.resetSearch()
  }

  head () {
    return getHeadByRouteType(Routes.SEARCH, this)
  }

  mounted () {
    if (this.query) {
      this.resetSearch()
    }
  }

  asyncData ({ query }: Context) {
    const queryText = (query[QueryParameters.QUERY]) || ''

    return {
      query: queryText
    }
  }

  get hasResult () {
    return !!this.list.length
  }

  watchQuery (newQuery: any) {
    this.query = newQuery[QueryParameters.QUERY]
    this.resetSearch()
  }

  resetSearch () {
    this.searchByPage(1)
  }

  onPageChange (page: number) {
    this.searchByPage(page)
  }

  searching (isSearching: boolean) {
    this.searched = !isSearching
    this.isFetching = isSearching
  }

  searchByPage (page: number) {
    if (!this.authUser) {
      return sendWarningNotification(this.$store.dispatch, this.$t('notification.search.notAllowedToSearch'))
    }

    this.searching(true)
    if (!this.query) {
      this.list = []
      return this.searching(false)
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
        this.searching(false)
      })
  }
}
</script>
