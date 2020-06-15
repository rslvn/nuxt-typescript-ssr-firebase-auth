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

    head() {
      let pageMeta: PageMeta = {
        title: `${this.$t('page.crop.title')} | ${DefaultMeta.title}`,
        url: `${DefaultMeta.url}${RouteType.CROP.path}`,
        description: this.$t('page.crop.description') as string,
        image: DefaultMeta.image
      }
      return getHead(pageMeta)
    }
  }
</script>
