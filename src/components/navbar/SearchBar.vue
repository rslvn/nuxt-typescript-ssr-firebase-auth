<template>
  <b-field expanded>
    <!--    <p class="control">-->
    <!--      <b-dropdown>-->
    <!--        <button class="button" slot="trigger">-->
    <!--          <span>Search</span>-->
    <!--          <b-icon icon="menu-down"></b-icon>-->
    <!--        </button>-->

    <!--        <b-dropdown-item value="open_issues">Search</b-dropdown-item>-->
    <!--        <b-dropdown-item value="your_issues">Detail Search</b-dropdown-item>-->
    <!--      </b-dropdown>-->
    <!--    </p>-->
    <b-autocomplete
      :data="data"
      placeholder="e.g. rslvn"
      field="title"
      :loading="isFetching"
      :check-infinite-scroll="true"
      icon="magnify"
      @icon-click="searchIconClick"
      icon-right="toy-brick-search-outline"
      :icon-right-click="clearIconClick"
      @typing="getAsyncData"
      @select="option => selected = option"
      @infinite-scroll="getMoreAsyncData"
      rounded
      clearable
      expanded>

      <template slot-scope="props">
        <div class="media">
          <div class="media-left">
            <img width="32" :src="`${props.option.profilePhoto.src}`">
          </div>
          <div class="media-content">
            {{ props.option.name }}
            <br>
            <!--                    <small>-->
            <!--                      Released at {{ props.option.release_date }},-->
            <!--                      rated <b>{{ props.option.vote_average }}</b>-->
            <!--                    </small>-->
          </div>
        </div>
      </template>
      <!--      <template slot="empty">-->
      <!--        <span>Search anyway</span>-->
      <!--      </template>-->
      <template slot="footer">
        <span v-show="page > totalPages" class="has-text-grey"> Thats it! No more movies found. </span>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator'
  import _debounce from 'debounce'
  import { getUsersByUsernameAndPage } from '~/service/firebase/firestore';
  import { SearchData } from '~/types';
  import { loadMoreBySearch } from '~/service/rx-service';

  @Component({
    components: {}
  })
  export default class SearchBar extends Vue {
    data: SearchData[] = []
    selected = null
    isFetching = false
    query = ''
    page = 1
    totalPages = 1

    getAsyncData = _debounce((query: string) => {
      console.log('getAsyncData', query)
      this.searchByName(query)
    }, 500)

    getMoreAsyncData = _debounce(() => {
      console.log('getMoreAsyncData')
      loadMoreBySearch.next()
    }, 250)

    created() {
      this.$subscribeTo(loadMoreBySearch.asObservable(), () => {
        console.log('loadMoreBySearch', this.query)
        this.getAsyncData(this.query)
      })
    }

    searchByName(newQuery: string) {
      console.log('searchByName', newQuery)
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
        console.log('reset all')
        return
      }
      // Reached last page
      if (this.page > this.totalPages) {
        return
      }
      this.isFetching = true
      getUsersByUsernameAndPage(newQuery, this.page, 5)
        .then((pagingResponse) => {

          console.log('pagingResponse:', pagingResponse)
          pagingResponse.data.forEach((searchData: SearchData) => this.data.push(searchData))

          this.page++
          this.totalPages = pagingResponse.totalPage
        })
        .catch((error: Error) => {
          throw error
        })
        .finally(() => {
          console.log('DATA', this.data.length)
          this.isFetching = false
        })
    }

    searchIconClick() {
      alert('You wanna make a search?')
    }

    clearIconClick() {
      alert('Email cleared!')
    }

  }
</script>
