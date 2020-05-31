<template>
  <div>
    <ProfilePhotoUpdater :image="image"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import 'cropperjs/dist/cropper.css';
  import ProfilePhotoUpdater from '~/components/image/ProfilePhotoUpdater.vue';
  import { DefaultProfilePhoto } from '~/types';

  @Component({
    components: { ProfilePhotoUpdater }
  })
  export default class crop extends Vue {
    image = DefaultProfilePhoto
  }
</script>
