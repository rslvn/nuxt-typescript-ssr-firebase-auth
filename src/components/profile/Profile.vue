<template>
  <div>
    <CoverPhoto :auth-user="authUser" :cover-photo="user.coverPhoto"/>

    <div class="container">
      <div class="has-margin-top-10 has-margin-bottom-10">
        <article class="media has-margin-left-5">
          <div class="media-left">
            <ProfilePhoto :auth-user="authUser"/>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>{{ fullName }}</strong></p>
              <p v-if="user.username">
                <small>@{{ user.username }}</small>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="columns is-centered">

      <div class="column is-half">
        <h2 class="subtitle has-text-centered">{{$t('card.user.title')}}</h2>
        <ProfileInfo :auth-user="authUser" :user="user"/>
      </div>

    </div>

    <div class="columns is-centered">
      <div class="column is-half"><h2 class="subtitle has-text-centered">{{$t('card.linkedAccounts.title')}}</h2></div>
    </div>
    <ProviderList :auth-user="authUser"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import {
    AuthUser,
    ProfilePhotoStorageRef,
    ProviderConfig,
    ProviderType,
    StateNamespace,
    SupportedProviders,
    User
  } from "~/types";
  import ProfileInfo from "~/components/profile/ProfileInfo.vue";
  import ProfilePhoto from "~/components/profile/ProfilePhoto.vue";
  import CoverPhoto from "~/components/profile/CoverPhoto.vue";
  import ProviderList from "~/components/profile/ProviderList.vue";

  @Component({
    components: { CoverPhoto, ProfilePhoto, ProviderList, ProfileInfo },
  })
  export default class Profile extends Vue {

    @Prop({ required: true }) authUser !: AuthUser;
    @Prop({ required: true }) user !: User;

    @StateNamespace.auth.Action updateProfilePhoto !: (profilePhotoUrl: string) => void;

    get fullName() {
      return this.user.surname ? `${this.user.name} ${this.user.surname}` : this.user.name
    }

    get parentFolderRef() {
      return ProfilePhotoStorageRef.folderRef
        .replace(ProfilePhotoStorageRef.parameters.userId, this.authUser.userId)
    }

    get passwordProvider(): ProviderConfig | undefined {
      return this.authUser.providers.find((providerData) => providerData.providerType === ProviderType.PASSWORD) ?
        SupportedProviders.find(provider => provider.providerType === ProviderType.PASSWORD)
        : undefined
    }

  }
</script>

