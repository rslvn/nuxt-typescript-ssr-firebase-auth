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
  import { DefaultProfilePhoto, Routes } from '~/types';
  import { getHeadByRouteType } from '~/service/seo-service';
  import PageTitle from '~/components/ui/PageTitle.vue';

  @Component({
    components: { PageTitle, ProfilePhotoUpdater }
  })
  export default class crop extends Vue {

    image = DefaultProfilePhoto

    head() {
      return getHeadByRouteType(Routes.CROP, this)
    }
  }
</script>
