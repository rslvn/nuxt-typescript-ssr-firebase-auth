<template>
  <div>
    <SingleFileUpload class="is-relative is-pulled-right" :parent-folder-ref="parentFolderRef"
                      :upload-completed="updateProfilePhoto" :get-alt-value="getProfilePhotoAltValue"/>
    <div class="cropped-rounded-128x128">
      <img v-lazy="profilePhoto.src"
           :src="placeholder"
           :alt="profilePhoto.alt"
           @error="imageLoadError">
    </div>

  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import {
    DefaultUserPhoto,
    ProfilePhotoPlaceholder,
    ProfilePhotoStorageRef,
    StateNamespace,
    StoredUser
  } from "~/types";
  import SingleFileUpload from "~/components/image/upload/SingleFileUpload.vue";

  @Component({
    components: { SingleFileUpload }
  })
  export default class ProfilePhoto extends Vue {

    @Prop({ required: true }) storedUser !: StoredUser

    @StateNamespace.auth.Action updateProfilePhoto !: (profilePhotoUrl: string) => void;

    get parentFolderRef() {
      return ProfilePhotoStorageRef.folderRef
        .replace(ProfilePhotoStorageRef.parameters.userId, this.storedUser.userId)
    }

    get profilePhoto(){
      return this.storedUser.profilePhoto || this.storedUser.profilePicture || DefaultUserPhoto
    }

    get placeholder() {
      return ProfilePhotoPlaceholder
    }

    imageLoadError(event: any) {
      event.target.src = ProfilePhotoPlaceholder
    }

    getProfilePhotoAltValue(fileName: string) {
      return fileName;
    }
  }
</script>
