<template>
  <div class="container">
    <div class="card-image has-cursor-pointer has-max-height-500 crop-to-fit" @click="showLightbox">
      <img v-lazy="coverPhoto.src"
           :src="placeholder"
           :alt="coverPhoto.alt"
           @error="imageLoadError">
    </div>

    <SingleFileUpload class="is-overlay-left" :parent-folder-ref="parentFolderRef"
                      :upload-completed="uploadCompleted"
                      :get-alt-value="getCoverImageAltName"/>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { CoverPhotoPlaceholder, CoverPhotoStorageRef, Image, StateNamespace, AuthUser } from '~/types';
  import SingleFileUpload from '~/components/image/upload/SingleFileUpload.vue';
  import Lightbox from '~/components/image/lightbox/Lightbox.vue';
  import { profilePhotoObservable } from '~/service/rx-service';

  @Component({
    components: { SingleFileUpload }
  })
  export default class ProfileCover extends Vue {

    @Prop({ required: true }) authUser !: AuthUser
    @Prop({ required: true }) coverPhoto !: Image

    @StateNamespace.profile.Action updateCoverPhoto !: (coverPhoto: Image) => Promise<void>;

    get parentFolderRef() {
      return CoverPhotoStorageRef.folderRef
        .replace(CoverPhotoStorageRef.parameters.userId, this.authUser.userId)
    }

    get placeholder() {
      return CoverPhotoPlaceholder
    }

    imageLoadError(event: any) {
      event.target.src = CoverPhotoPlaceholder
    }

    getCoverImageAltName(fileName: string) {
      return `Cover photo of ${this.authUser.name}`
    }

    showLightbox() {
      this.$buefy.modal.open({
        parent: this,
        component: Lightbox,
        hasModalCard: false,
        trapFocus: true,
        canCancel: true,
        props: {
          images: [this.coverPhoto],
          initialIndex: 20,
        }
      })
    }

    uploadCompleted(image: Image) {
      this.updateCoverPhoto(image)
        .then(() => profilePhotoObservable.next(image))
    }

  }
</script>
