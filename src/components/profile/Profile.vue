<template>
  <div>
    <CoverPhoto :is-my-profile="isMyProfile" :auth-user="authUser" :cover-photo="user.coverPhoto"/>
    <ProfileBand :is-my-profile="isMyProfile" :auth-user="authUser" :user="user"/>

    <template v-if="isMyProfile">
      <div class="columns is-centered">

        <div class="column is-half">
          <h2 class="subtitle has-text-centered">{{$t('profile.card.info.title')}}</h2>
          <ProfileInfo :auth-user="authUser" :user="user"/>
        </div>

      </div>

      <div class="columns is-centered">
        <div class="column is-half"><h2 class="subtitle has-text-centered">
          {{$t('profile.card.linkedAccounts.title')}}</h2>
        </div>
      </div>

      <ProviderList :auth-user="authUser"/>
    </template>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { AuthUser, PrivacyList, PrivacyType, StateNamespace, User } from "~/types";
  import ProfileInfo from "~/components/profile/ProfileInfo.vue";
  import ProfilePhoto from "~/components/profile/ProfilePhoto.vue";
  import CoverPhoto from "~/components/profile/CoverPhoto.vue";
  import ProviderList from "~/components/profile/ProviderList.vue";
  import ProfileBand from '~/components/profile/ProfileBand.vue';

  @Component({
    components: { ProfileBand, CoverPhoto, ProfilePhoto, ProviderList, ProfileInfo },
  })
  export default class Profile extends Vue {

    @Prop({ required: true }) authUser !: AuthUser;
    @Prop({ required: true }) user !: User;

    @StateNamespace.auth.Action updateProfilePhoto !: (profilePhotoUrl: string) => void;

    get fullName() {
      return this.user.surname ? `${this.user.name} ${this.user.surname}` : this.user.name
    }

    get isMyProfile() {
      return this.authUser.userId === this.user.id
    }

    get userPrivacy() {
      return this.user.privacy || PrivacyType.PRIVATE
    }

    get userPrivacyConfig() {
      return PrivacyList.find((privacyConfig) => privacyConfig.privacyType === this.userPrivacy)
    }

  }
</script>

