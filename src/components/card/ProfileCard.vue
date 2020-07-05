<template>
  <div class="card has-cursor-pointer has-margin-bottom-25"
       @click="gotoProfile(username)">

    <BackgroundImage v-if="!!coverPhoto" :image-url="coverPhoto.src" :height="coverPhotoHeight"/>

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <BackgroundSquareImage :image-url="profilePhoto.src" :size="profilePhotoSize" rounded="true"
                                 border-inside="true"
                                 border="3"/>
        </div>
        <div class="media-content">
          <p class="title is-4">{{name}}</p>
          <p class="subtitle is-6">@{{username}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { Image, Routes } from '../../types';
  import { getUserRoute } from '~/service/global-service';
  import BackgroundSquareImage from '../image/BackgroundSquareImage.vue';
  import BackgroundImage from '~/components/image/BackgroundImage.vue';

  @Component({
    components: { BackgroundImage, BackgroundSquareImage }
  })
  export default class ProfileCard extends Vue {

    @Prop({ type: String, required: true }) name !: string
    @Prop({ type: String, required: true }) username !: string
    @Prop({ type: Object, required: true }) profilePhoto !: Image
    @Prop({ type: Object, required: false }) coverPhoto !: Image
    @Prop({ type: Number, required: false, default: 250 }) coverPhotoHeight !: number
    @Prop({ type: Number, required: false, default: 64 }) profilePhotoSize !: number

    async gotoProfile(username: string) {
      await this.$router.push(getUserRoute(Routes.PROFILE_DYNAMIC, username))
    }

  }
</script>
