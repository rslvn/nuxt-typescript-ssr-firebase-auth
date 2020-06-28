<template>
  <div>
    <ProfileHeader class="has-margin-bottom-15" :is-my-profile="isMyProfile" :auth-user="authUser" :user="user"/>

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
  import { AuthUser, User } from "~/types";
  import ProfileInfo from "~/components/profile/ProfileInfo.vue";
  import ProviderList from "~/components/profile/ProviderList.vue";
  import ProfileHeader from '~/components/profile/ProfileHeader.vue';

  @Component({
    components: { ProfileHeader, ProviderList, ProfileInfo },
  })
  export default class Profile extends Vue {

    @Prop({ required: true }) authUser !: AuthUser;
    @Prop({ required: true }) user !: User;

    get isMyProfile() {
      return this.authUser.userId === this.user.id
    }

  }
</script>

