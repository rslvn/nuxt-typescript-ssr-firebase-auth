<template>
  <div class="container">
    <div class="card-image has-cursor-pointer has-max-height-500 crop-to-fit" @click="showLightbox">
      <img v-lazy="coverPhoto.src"
           :src="placeholder"
           :alt="coverPhoto.alt"
           @error="imageLoadError">
    </div>

    <SingleValidatedImageUpload v-if="isMyProfile"
                                class="is-overlay-left"
                                rules="size:2048"
                                :label="$t('common.field.coverPhoto')"
                                :parent-folder-ref="parentFolderRef"
                                :upload-completed="uploadCompleted"
                                :get-alt-value="getCoverImageAltName"/>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { AuthUser, CoverPhotoPlaceholder, CoverPhotoStorageRef, Image, StateNamespace } from '~/types';
  import Lightbox from '~/components/image/lightbox/Lightbox.vue';
  import { coverPhotoObservable } from '~/service/rx-service';
  import SingleValidatedImageUpload from '~/components/image/upload/SingleValidatedImageUpload.vue';

  @Component({
    components: { SingleValidatedImageUpload }
  })
  export default class ProfileCover extends Vue {

    @Prop({ type: Boolean, required: true }) isMyProfile !: boolean
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
        .then(() => coverPhotoObservable.next(image))
    }

  }
</script>
