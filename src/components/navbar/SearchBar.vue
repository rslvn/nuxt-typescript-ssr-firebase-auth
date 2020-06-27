<template>
  <b-field label-position="on-border" expanded>
    <b-autocomplete
      v-model="query"
      :data="data"
      :placeholder="$t('common.field.searchPlaceholder')"
      field="title"
      :loading="isFetching"
      :check-infinite-scroll="true"
      icon="magnify"
      @typing="getAsyncData"
      @select="(option) => gotoProfile(option.username)"
      @infinite-scroll="getMoreAsyncData"
      @keyup.enter.native="gotoSearchPage()"
      rounded
      clearable
      expanded>

      <template slot-scope="props">
        <div class="media">
          <div class="media-left">
            <img width="32" :src="props.option.profilePhoto.src">
          </div>
          <div class="media-content truncate-long-text">
            {{ props.option.name }}
            <br>
            <small>@{{props.option.username}}</small>
          </div>
        </div>
      </template>

      <!--      <template slot="empty">-->
      <!--                    <span v-show="data.length === 0"-->
      <!--                          class="has-text-grey has-text-centered"> {{$t('topNavbar.search.footer')}} </span>-->
      <!--      </template>-->

      <template slot="header">
        <div>
          <b-button type="is-text" icon-left="toy-brick-search-outline" @click="gotoSearchPage">
            {{$t('topNavbar.search.detailedSearch')}}
          </b-button>
        </div>
      </template>

      <template slot="footer">
        <span v-show="page > totalPages"
              class="has-text-grey has-text-centered"> {{$t('topNavbar.search.footer')}} </span>
      </template>

    </b-autocomplete>
  </b-field>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import _debounce from 'debounce'
  import { searchUsers } from '~/service/firebase/firestore';
  import { AuthUser, Routes, SearchData } from '~/types';
  import { loadMoreSearchResult } from '~/service/rx-service';
  import { getPageRouteWithQuery, getUserRoute } from '~/service/global-service';
  import { showErrorToaster, showWarningToaster } from '~/service/notification-service';

  @Component({
    components: {}
  })
  export default class SearchBar extends Vue {
    @Prop({ required: true }) authUser !: AuthUser;

    data: SearchData[] = []
    isFetching = false
    query = ''
    page = 1
    totalPages = 1

    getAsyncData = _debounce((query: string) => {
      this.searchByName(query)
    }, 500)

    getMoreAsyncData = _debounce(() => {
      loadMoreSearchResult.next()
    }, 250)

    created() {
      this.$subscribeTo(loadMoreSearchResult.asObservable(), () => {
        this.getAsyncData(this.query)
      })
    }

    searchByName(newQuery: string) {
      if (!this.authUser) {
        return showWarningToaster(this.$t('notification.search.notAllowedToSearch'))
      }
      // String update
      if (this.query !== newQuery) {
        this.query = newQuery
        this.data = []
        this.page = 1
        this.totalPages = 1
      }
      // String cleared
      if (!newQuery.length) {
        this.data = []
        this.page = 1
        this.totalPages = 1
        return
      }
      // Reached last page
      if (this.page > this.totalPages) {
        return
      }
      this.isFetching = true
      searchUsers(newQuery, this.page, 5)
        .then((pagingResponse) => {
          this.page++
          pagingResponse.data.forEach((searchData: SearchData) => this.data.push(searchData))
          this.totalPages = pagingResponse.totalPages
        })
        .catch((error: Error) => {
          console.log(error)
          return showErrorToaster(this.$t('notification.search.canNotExecuted'))
        })
        .finally(() => {
          this.isFetching = false
        })
    }

    async gotoSearchPage() {
      const query = this.query
      this.query = ''
      query ?
        await this.$router.push(getPageRouteWithQuery(Routes.SEARCH, query)) :
        await this.$router.push(Routes.SEARCH)
      console.log('gotoSearchPage', this.query)
    }

    async gotoProfile(username: string) {
      await this.$router.push(getUserRoute(Routes.PROFILE_DYNAMIC, username))
    }
  }
</script>
