<template>
  <div>
    <PageTitle :title="$t('page.crop.title')"></PageTitle>
    <ProfilePhotoUpdater :image="image"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import 'cropperjs/dist/cropper.css';
  import ProfilePhotoUpdater from '~/components/image/ProfilePhotoUpdater.vue';
  import { DefaultProfilePhoto, Image, Routes } from '~/types';
  import { getHeadByRouteType } from '~/service/seo-service';
  import PageTitle from '~/components/ui/PageTitle.vue';

  @Component({
    components: { PageTitle, ProfilePhotoUpdater }
  })
  export default class crop extends Vue {

    image: Image = {
      src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fforest-5239560_1280.jpg?alt=media&token=5aabfe73-aa42-4aac-966a-4c4fdacdfbfd',
      alt: 'image to crop 1'
    }

    head() {
      return getHeadByRouteType(Routes.CROP, this)
    }
  }
</script>
