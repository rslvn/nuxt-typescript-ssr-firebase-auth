<template>
  <div>
    <div>
      <CoverPhoto :stored-user="storedUser" :cover-photo="coverPhoto"/>
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
                <b-tooltip v-if="storedUser.verified" :label="$t('card.user.mailVerified')">
                  <b-icon type="is-success"
                          class="has-margin-left-15"
                          pack="fas"
                          icon="check"/>
                </b-tooltip>

                <b-tooltip v-else :label="$t('card.user.mailNotVerified')">
                  <b-icon type="is-warning"
                          class="has-margin-left-15"
                          pack="fas"
                          icon="exclamation-triangle"/>
                </b-tooltip>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="columns">

      <div class="column">
        <h2 class="subtitle">{{$t('card.user.title')}}</h2>
        <ProfileInfo :stored-user="storedUser"/>
      </div>

      <div class="column">
        <h2 class="subtitle">{{$t('card.linkedAccounts.title')}}</h2>
        <ProviderList :stored-user="storedUser"/>
      </div>

    </div>
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
    @Prop({ required: true }) coverPhoto !: Image;

    @StateNamespace.auth.Action updateProfilePhoto !: (profilePhotoUrl: string) => void;

    get parentFolderRef() {
      return ProfilePhotoStorageRef.folderRef
        .replace(ProfilePhotoStorageRef.parameters.userId, this.storedUser.userId)
    }

    get passwordProvider(): ProviderConfig | undefined {
      return this.storedUser.providers.find((providerData) => providerData.providerType === ProviderType.password) ?
        SupportedProviders.find(provider => provider.providerType === ProviderType.password)
        : undefined
    }

  }
</script>

