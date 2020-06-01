<template>
  <div>
    <CoverPhoto :stored-user="storedUser" :cover-photo="coverPhoto"/>

    <div class="container">
      <div class="has-margin-top-10 has-margin-bottom-10">
        <article class="media has-margin-left-5">
          <div class="media-left">
            <ProfilePhoto :stored-user="storedUser"/>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>{{ storedUser.name }}</strong></p>
              <p>
                <small>{{ storedUser.email }}</small>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="columns is-centered">

      <div class="column is-half">
        <h2 class="subtitle has-text-centered">{{$t('card.user.title')}}</h2>
        <ProfileInfo :stored-user="storedUser"/>
      </div>

    </div>

    <div class="columns is-centered">
      <div class="column is-half"><h2 class="subtitle has-text-centered">{{$t('card.linkedAccounts.title')}}</h2></div>
    </div>
    <ProviderList :stored-user="storedUser"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import {
    Image,
    ProfilePhotoStorageRef,
    ProviderConfig,
    ProviderType,
    StateNamespace,
    StoredUser,
    SupportedProviders
  } from "~/types";
  import ProfileInfo from "~/components/profile/ProfileInfo.vue";
  import ProfilePhoto from "~/components/profile/ProfilePhoto.vue";
  import CoverPhoto from "~/components/profile/CoverPhoto.vue";
  import ProviderList from "~/components/profile/ProviderList.vue";

  @Component({
    components: { CoverPhoto, ProfilePhoto, ProviderList, ProfileInfo },
  })
  export default class Profile extends Vue {

    @Prop({ required: true }) storedUser !: StoredUser;

    @StateNamespace.profile.Getter coverPhoto !: Image;
    @StateNamespace.auth.Action updateProfilePhoto !: (profilePhotoUrl: string) => void;

    get parentFolderRef() {
      return ProfilePhotoStorageRef.folderRef
        .replace(ProfilePhotoStorageRef.parameters.userId, this.storedUser.userId)
    }

    get passwordProvider(): ProviderConfig | undefined {
      return this.storedUser.providers.find((providerData) => providerData.providerType === ProviderType.PASSWORD) ?
        SupportedProviders.find(provider => provider.providerType === ProviderType.PASSWORD)
        : undefined
    }

  }
</script>

