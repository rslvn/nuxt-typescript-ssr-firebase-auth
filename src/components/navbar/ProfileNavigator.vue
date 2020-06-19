<template>
  <b-navbar-dropdown :boxed="true" :close-on-click="true">

    <template slot="label" class="is-grouped">
      <b-field>
        <BackgroundSquareImage :image-url="profilePhoto" size="28" rounded="true"/>
        <span class="has-margin-left-5"><b>{{ authUser.name || authUser.email }}</b></span>
      </b-field>
    </template>

    <b-navbar-item tag="router-link" :to="profileRoute">
      <b-icon pack="fas" icon="user" class="has-margin-right-5"/>
      <p>{{$t('topNavbar.profile')}}</p>
    </b-navbar-item>

    <hr class="dropdown-divider">

    <b-navbar-item @click="logout">
      <b-icon icon="logout" class="has-margin-right-5"/>
      <p>{{$t('topNavbar.logout')}}</p>
    </b-navbar-item>

  </b-navbar-dropdown>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { AuthUser, DefaultProfilePhoto, Routes } from "~/types";
  import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue';
  import { getUserRoute } from '~/service/global-service';

  @Component({
    components: { BackgroundSquareImage }
  })
  export default class ProfileNavigator extends Vue {

    @Prop({ required: true }) authUser !: AuthUser;
    @Prop({ type: Function, required: true }) logout !: () => void;

    get profilePhoto() {
      return this.authUser?.profilePhoto?.src || DefaultProfilePhoto.src
    }

    get profileRoute() {
      return getUserRoute(Routes.PROFILE_DYNAMIC,this.authUser.username)
    }

  }
</script>
