<template>

  <dic v-if="storedUser">
    <div class="columns is-mobile">

      <div class="column">
        <b-field position="is-centered" grouped>
          <ProfilePictureCard :user="storedUser"/>
        </b-field>
      </div>

    </div>

    <div class="columns is-mobile is-centered">

      <div class="column">
        <h2 class="subtitle">{{$t('card.user.title')}}</h2>
        <ProfileInfo :user="storedUser"/>
      </div>

    </div>

    <div class="columns is-mobile is-centered">

      <div class="column">
        <h2 class="subtitle">{{$t('card.linkedAccounts.title')}}</h2>
        <ProviderList :user="storedUser"/>
      </div>

    </div>

  </dic>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { ProfileImagePlaceholder, ProfilePictureStorageRef, StateNamespace, StoredUser } from "~/types";
  import ProfileInfo from "~/components/profile/ProfileInfo.vue";
  import ProfilePictureCard from "~/components/profile/ProfilePictureCard.vue";
  import ProviderList from "~/components/profile/ProviderList.vue";

  @Component({
    components: { ProviderList, ProfilePictureCard, ProfileInfo },
  })
  export default class Account extends Vue {

    @StateNamespace.auth.Getter storedUser !: StoredUser;

    @StateNamespace.auth.Action updateProfilePicture !: (profilePictureUrl: string) => void;

    get parentFolderRef() {
      return ProfilePictureStorageRef.folderRef
        .replace(ProfilePictureStorageRef.parameters.userId, this.storedUser.userId)
    }

    get placeholder() {
      return ProfileImagePlaceholder
    }

  }
</script>


