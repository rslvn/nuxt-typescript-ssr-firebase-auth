<template>
  <div>
    <div class="container">
      <div class="columns has-margin-bottom-50">
        <div class="column has-text-centered">
          <h1 class="title">{{ $t('page.crop.title') }}</h1>
        </div>
      </div>
    </div>
    <ProfilePhotoUpdater :image="image"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import 'cropperjs/dist/cropper.css';
  import ProfilePhotoUpdater from '~/components/image/ProfilePhotoUpdater.vue';
  import { DefaultMeta, DefaultProfilePhoto, PageMeta, RouteType } from '~/types';
  import { getHead } from '~/service/seo-service';

  @Component({
    components: { ProfilePhotoUpdater }
  })
  export default class crop extends Vue {

    image = DefaultProfilePhoto

    pageMeta: PageMeta = {
      ...DefaultMeta,
      title: `Crop Image | ${DefaultMeta.title}`,
      url: `${DefaultMeta.url}${RouteType.CORP.path}`
    }

    head() {
      return getHead(this.pageMeta)
    }
  }
</script>
