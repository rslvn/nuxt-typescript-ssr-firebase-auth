<template>

  <section class="section">
    <div class="columns has-same-height is-gapless">

      <div class="column">

        <div>
          <div class="card-image is-centered has-margin-5-fullhd">
            <figure class="image is-128x128 is-active profile">
              <img class="is-rounded has-border-bottom-width-2" :src="storedUser.profilePicture.src" :alt="storedUser.profilePicture.alt">
              <!--                <a @click="info(props.index)"><img :src="props.list.image"></a>-->
            </figure>
            <SingleFileUpload class="uploadButton" :parent-folder-ref="parentFolderRef"
                              :upload-completed="updateProfilePicture"/>
          </div>
        </div>

      </div>

      <div class="column">
        <UserCard :user="storedUser"/>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { ProfilePictureStorageRef, StateNamespace, StoredUser } from "~/types";
  import UserCard from "~/components/card/UserCard.vue";
  import SingleFileUpload from "~/components/image/upload/SingleFileUpload.vue";

  @Component({
    components: { SingleFileUpload, UserCard },
  })
  export default class Account extends Vue {

    @StateNamespace.auth.Getter storedUser !: StoredUser;

    @StateNamespace.auth.Action updateProfilePicture !: (profilePictureUrl: string) => void;


    get parentFolderRef() {
      return ProfilePictureStorageRef.folderRef
        .replace(ProfilePictureStorageRef.parameters.userId, this.storedUser.userId)
    }

  }
</script>

<style scoped>
  .uploadButton {
    position: absolute;
    top: 0;
  }
</style>
