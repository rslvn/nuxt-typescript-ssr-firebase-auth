<template>
  <div class="card has-cursor-pointer has-margin-bottom-25"
       @click="gotoProfile(searchResult.username)">
    <div class="card-image has-height-300 crop-to-fit">
      <img :src="searchResult.coverPhoto.src" :alt="searchResult.coverPhoto.alt">
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <BackgroundSquareImage :image-url="searchResult.profilePhoto.src" size="64" rounded="true"
                                 border-inside="true"
                                 border="3"/>
        </div>
        <div class="media-content">
          <p class="title is-4">{{searchResult.name}}</p>
          <p class="subtitle is-6">@{{searchResult.username}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { Routes, SearchData } from '../../types';
  import BackgroundSquareImage from '../image/BackgroundSquareImage.vue';
  import { getUserRoute } from '~/service/global-service';

  @Component({
    components: { BackgroundSquareImage }
  })
  export default class SearchResultCard extends Vue {

    @Prop({ type: Object, required: true }) searchResult !: SearchData

    async gotoProfile(username: string) {
      await this.$router.push(getUserRoute(Routes.PROFILE_DYNAMIC, username))
    }

  }
</script>
