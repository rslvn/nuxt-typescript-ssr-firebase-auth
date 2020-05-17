<template>
  <b-navbar-dropdown :boxed="true">

    <template slot="label" class="is-grouped">
      <b-field grouped>
        <figure class="image is-32x32 has-margin-right-5">
          <img class="is-rounded" :src="userPicture.src" :alt="userPicture.alt" @error="imageLoadError">
        </figure>
        <span><b>{{ storedUser.name || storedUser.email }}</b></span>
      </b-field>
    </template>

    <b-navbar-item tag="router-link" :to="accountRoute" active>
      <b-icon pack="fas" icon="user"/>
      <span>{{$t('topNavbar.profile')}}</span>
    </b-navbar-item>

    <hr class="dropdown-divider">

    <b-navbar-item @click="logout">
      <b-icon icon="logout"></b-icon>
      <span>{{$t('topNavbar.logout')}}</span>
    </b-navbar-item>
  </b-navbar-dropdown>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { AnonymousUserImage, Image, ProfileImagePlaceholder, RouteType, StoredUser } from "~/types";

  @Component({
    components: {}
  })
  export default class ProfileNavigator extends Vue {

    accountRoute = RouteType.ACCOUNT;

    @Prop({ required: true }) storedUser !: StoredUser;
    @Prop({ type: Function, required: true }) logout !: () => void;

    get userPicture(): Image {
      return this.storedUser.profilePicture || AnonymousUserImage
    }

    imageLoadError(event: any) {
      event.target.src = ProfileImagePlaceholder
    }

  }
</script>
