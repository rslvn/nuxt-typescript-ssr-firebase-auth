<template>
  <b-field expanded>
    <b-autocomplete
      :data="data"
      placeholder="e.g. rslvn"
      field="title"
      :loading="isFetching"
      :check-infinite-scroll="true"
      icon="magnify"
      icon-right="toy-brick-search-outline"
      @typing="getAsyncData"
      @select="(option) => gotoProfile(option.username)"
      @infinite-scroll="getMoreAsyncData"
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
  import { getUserRoute } from '~/service/global-service';
  import { showWarningToaster } from '~/service/notification-service';

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
        showWarningToaster(this.$t('notification.search.notAllowedToSearch'))
        return
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

          pagingResponse.data.forEach((searchData: SearchData) => this.data.push(searchData))

          this.page++
          this.totalPages = pagingResponse.totalPage
        })
        .catch((error: Error) => {
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }

    async gotoProfile(username: string) {
      await this.$router.push(getUserRoute(Routes.PROFILE_DYNAMIC, username))
    }
  }
</script>
