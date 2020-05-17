<template>
  <div class="card-image">

    <figure class="image is-128x128 is-active profile">
      <img class="is-rounded has-border-bottom-width-2" v-lazy="user.profilePicture.src"
           :src="placeholder"
           :alt="user.profilePicture.alt">
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
  }
</script>

<style scoped>
  .uploadButton {
    position: absolute;
    top: 0;
  }
</style>
