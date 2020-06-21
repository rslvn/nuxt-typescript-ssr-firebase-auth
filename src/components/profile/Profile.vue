<template>
  <div>
    <CoverPhoto :is-my-profile="isMyProfile" :auth-user="authUser" :cover-photo="user.coverPhoto"/>

    <div class="container">
      <div class="has-margin-top-10 has-margin-bottom-10">
        <article class="media has-margin-left-5">
          <div class="media-left">
            <ProfilePhoto :is-my-profile="isMyProfile" :auth-user="authUser" :profile-photo="user.profilePhoto"/>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>{{ fullName }}</strong></p>
              <p><small>@{{ user.username }}</small></p>
              <p>
                <b-tooltip :label="$t(`privacy.${userPrivacyConfig.privacyType}.description`)">
                <b-taglist attached>
                  <b-tag :type="userPrivacyConfig.type">{{$t(`privacy.${userPrivacyConfig.privacyType}.title`)}}</b-tag>
                  <b-tag type="is-light">{{$t(`privacy.${userPrivacyConfig.privacyType}.subtitle`)}}</b-tag>
                </b-taglist>
                </b-tooltip>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
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

