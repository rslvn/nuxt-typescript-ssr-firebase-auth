<template>
  <div class="container">

    <SearchField :query.sync="query" :is-fetching="isFetching" :reset-search="resetSearch"/>

    <Paging v-if="hasResult" :total="total" :per-page.sync="perPage" :current.sync="current" :is-fetching="isFetching"
            :on-page-change="onPageChange">
      <template slot="searchResult">

        <ProfileCard v-for="(user, index) in list" :key="index" :name="user.name" :username="user.username"
                     :profile-photo="user.profilePhoto" :privacy-type="user.privacy"/>

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
  import { Component, Watch } from 'nuxt-property-decorator';
  import ProfileCard from '~/components/card/ProfileCard.vue';
  import { SearchData, User } from '~/types';
  import PageTitle from '~/components/ui/PageTitle.vue';
  import SearchField from '~/components/search/SearchField.vue';
  import Paging from '~/components/ui/paging/Paging.vue';
  import { searchFollowers } from '~/service/firebase/firestore';
  import BaseModule from '~/mixin/BaseModule';
  import { showErrorToaster } from '~/service/notification-service';
  import { reloadFollowing } from '~/service/rx-service';

  @Component({
    components: { Paging, SearchField, PageTitle, ProfileCard }
  })
  export default class ProfileFollowers extends BaseModule {
    // paging dynamic config
    total = 1
    current = 1
    perPage = 5

    // search page data
    query = '';
    list: User[] = []
    isFetching = false
    searched = false

    @Watch('perPage')
    onPerPageChanged(value: number) {
      this.resetSearch();
    }

    mounted() {
      this.$subscribeTo(reloadFollowing.asObservable(), () => {
        this.resetSearch();
      })
      this.resetSearch()
    }

    get hasResult() {
      return !!this.list.length
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
      this.searching(true)

      searchFollowers(this.user, this.query, page, this.perPage)
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

  }
</script>
