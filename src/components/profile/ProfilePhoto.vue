<template>
  <div class="is-overlay-hover">
    <div class="has-cursor-pointer" @click="showLightbox">
      <img class="image-fit-cover profile-128-round" v-lazy="profilePhoto.src"
           :src="placeholder"
           :alt="profilePhoto.alt"
           @error="imageLoadError">

    </div>

    <SingleFileUpload class="is-overlay-left is-disabled-till-hover" :parent-folder-ref="parentFolderRef"
                      :upload-completed="updateProfilePhoto" :get-alt-value="getProfilePhotoAltValue"/>

  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import {
    DefaultProfilePhoto,
    Image,
    ProfilePhotoPlaceholder,
    ProfilePhotoStorageRef,
    StateNamespace,
    AuthUser
  } from "~/types";
  import SingleFileUpload from "~/components/image/upload/SingleFileUpload.vue";
  import Lightbox from '~/components/image/lightbox/Lightbox.vue';

  @Component({
    components: { SingleFileUpload }
  })
  export default class ProfilePhoto extends Vue {

    @Prop({ required: true }) authUser !: AuthUser
    @StateNamespace.auth.Action updateProfilePhoto !: (profilePhoto: Image) => void;

    get parentFolderRef() {
      return ProfilePhotoStorageRef.folderRef
        .replace(ProfilePhotoStorageRef.parameters.userId, this.authUser.userId)
    }

    get profilePhoto() {
      return this.authUser.profilePhoto || DefaultProfilePhoto
    }

    get placeholder() {
      return ProfilePhotoPlaceholder
    }

    imageLoadError(event: any) {
      event.target.src = ProfilePhotoPlaceholder
    }

    getProfilePhotoAltValue(fileName: string) {
      return `Profile photo of ${this.authUser.name} as ${fileName}`
    }

    showLightbox() {
      this.$buefy.modal.open({
        parent: this,
        component: Lightbox,
        hasModalCard: false,
        trapFocus: true,
        canCancel: true,
        props: {
          images: [this.profilePhoto],
          initialIndex: 20,
        }
      })
    }

  }
</script>
