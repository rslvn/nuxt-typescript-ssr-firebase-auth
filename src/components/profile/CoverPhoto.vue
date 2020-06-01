<template>
  <div class="card-image">
    <figure class="has-max-height-500 crop-to-fit">
      <img v-lazy="coverPhoto.src"
           :src="placeholder"
           :alt="coverPhoto.alt"
           @error="imageLoadError">
    </figure>
    <div class="is-overlay is-pulled-right has-margin-5">
      <SingleFileUpload :parent-folder-ref="parentFolderRef"
                        :upload-completed="updateCoverPhoto"
                        :get-alt-value="getCoverImageAltName"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { CoverPhotoPlaceholder, CoverPhotoStorageRef, Image, StateNamespace, StoredUser } from "~/types";
  import SingleFileUpload from '~/components/image/upload/SingleFileUpload.vue';

  @Component({
    components: { SingleFileUpload }
  })
  export default class ProfileCover extends Vue {

    @Prop({ required: true }) storedUser !: StoredUser
    @Prop({ required: true }) coverPhoto !: Image

    @StateNamespace.profile.Action updateCoverPhoto !: (coverPhoto: Image) => void;

    get parentFolderRef() {
      return CoverPhotoStorageRef.folderRef
        .replace(CoverPhotoStorageRef.parameters.userId, this.storedUser.userId)
    }

    get placeholder() {
      return CoverPhotoPlaceholder
    }

    imageLoadError(event: any) {
      event.target.src = CoverPhotoPlaceholder
    }

    getCoverImageAltName(fileName: string) {
      return `Cover photo of ${this.storedUser.name}`
    }
  }
</script>
