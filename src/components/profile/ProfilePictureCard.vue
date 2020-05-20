<template>
  <div>
    <figure class="cropped-rounded-256x256">
      <img v-lazy=" user.profilePicture.src"
           :src="placeholder"
           :alt="user.profilePicture.alt"
           @error="imageLoadError">
    </figure>


    <SingleFileUpload class="uploadButton" :parent-folder-ref="parentFolderRef"
                      :upload-completed="updateProfilePicture"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ProfileImagePlaceholder, ProfilePictureStorageRef, StateNamespace, StoredUser } from "~/types";
  import SingleFileUpload from "~/components/image/upload/SingleFileUpload.vue";

  @Component({
    components: { SingleFileUpload }
  })
  export default class ProfilePictureCard extends Vue {

    @Prop({ required: true }) user !: StoredUser

    @StateNamespace.auth.Action updateProfilePicture !: (profilePictureUrl: string) => void;

    get parentFolderRef() {
      return ProfilePictureStorageRef.folderRef
        .replace(ProfilePictureStorageRef.parameters.userId, this.user.userId)
    }

    get placeholder() {
      return ProfileImagePlaceholder
    }

    imageLoadError(event: any) {
      event.target.src = ProfileImagePlaceholder
    }
  }
</script>

<style scoped>
  .uploadButton {
    position: absolute;
    top: 0;
  }
</style>
