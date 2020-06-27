<template>
  <div class="container">
    <Title :title="$t('page.search.title')"></Title>
    <div class="columns is-centered">
      <div class="column is-half">
        <b-field :label="$t('common.field.search')" label-position="on-border" position="is-centered" grouped>
          <b-input
            v-model="query"
            :current.sync="current"
            :loading="isFetching"
            :range-before="2"
            :range-after="2"
            @keyup.enter.native="searchByPage"
            :placeholder="$t('common.field.searchPlaceholder')"
            type="search"
            icon="magnify"
            rounded expanded>
          </b-input>
          <b-button @click="searchByPage()" :loading="isFetching" type="is-primary" rounded>{{$t('common.search')}}
          </b-button>
        </b-field>
      </div>
    </div>

    <div v-if="hasResult" class="columns is-centered is-multiline">
      <div class="column is-half">
        <div v-for="(item, index) in list" :key="index" class="card has-cursor-pointer has-margin-bottom-25"
             @click="gotoProfile(item.username)">
          <div class="card-image has-height-300 crop-to-fit">
            <img :src="item.coverPhoto.src" :alt="item.coverPhoto.alt">
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <BackgroundSquareImage :image-url="item.profilePhoto.src" size="64" rounded="true" border-inside="true"
                                       border="3"/>
              </div>
              <div class="media-content">
                <p class="title is-4">{{item.name}}</p>
                <p class="subtitle is-6">@{{item.username}}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="column is-full">
        <hr>
        <b-pagination
          :total="totalPages"
          :current.sync="current"
          order="is-centered"
          :rounded="true"
          :per-page="perPage"
          @change="onPageChange"
        />
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
  import { Component, Vue } from 'nuxt-property-decorator';
  import { Context } from '@nuxt/types';
  import { AuthUser, QueryParameters, Routes, SearchData, StateNamespace } from '~/types';
  import { getHeadByRouteType } from '~/service/seo-service';
  import { getUserRoute } from '~/service/global-service';
  import Title from '~/components/ui/Title.vue';
  import { searchUsers } from '~/service/firebase/firestore';
  import { showErrorToaster } from '~/service/notification-service';
  import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue';

  @Component({
    components: { BackgroundSquareImage, Title }
  })
  export default class search extends Vue {

    @StateNamespace.auth.Getter authUser !: AuthUser;

    query = '';
    list: SearchData[] = []
    isFetching = false
    searched = false
    page = 1
    perPage = 5
    current = this.perPage
    totalPages = 1

    head() {
      return getHeadByRouteType(Routes.SEARCH, this)
    }

    created() {
      if (this.query) {
        this.searchByPage(this.page)
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

    watchQuery(newQuery: any, oldQuery: any) {
      this.query = newQuery[QueryParameters.QUERY];
      this.searchByPage(this.page)
    }

    onPageChange(page: number) {
      this.searchByPage(page)
    }

    searching(isSearching: boolean) {
      this.searched = !isSearching
      this.isFetching = isSearching
    }

    async searchByPage(page: number) {
      this.searching(true);
      if (!this.query) {
        this.list = []
        this.searching(false);
        return;
      }
      await searchUsers(this.query, page, this.perPage)
        .then((pagingResponse) => {
          this.list = []
          pagingResponse.data.forEach((searchData: SearchData) => this.list.push(searchData))
          this.page = page
          this.totalPages = pagingResponse.totalPage
        })
        .catch((error: Error) => {
          console.log(error)
          return showErrorToaster(this.$t('notification.search.canNotExecuted'))
        }).finally(() => {
          this.searching(false);
        })
    }

    enterPressed() {
      this.searchByPage(this.page)
    }

    async gotoProfile(username: string) {
      await this.$router.push(getUserRoute(Routes.PROFILE_DYNAMIC, username))
    }

  }
</script>
