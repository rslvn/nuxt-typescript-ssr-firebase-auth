<template>
  <b-navbar-dropdown :boxed="true">

    <template slot="label" class="is-grouped">
      <b-field>
        <img class="image-fit-cover rounded-50 square-28" :src="profilePhoto.src" :alt="profilePhoto.alt"
             @error="imageLoadError">
        <span class="has-margin-left-5"><b>{{ storedUser.name || storedUser.email }}</b></span>
      </b-field>
    </template>

    <b-navbar-item tag="router-link" :to="profileRoute" active>
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
  import { DefaultProfilePhoto, Image, ProfilePhotoPlaceholder, RouteType, StoredUser } from "~/types";

  @Component({
    components: {}
  })
  export default class ProfileNavigator extends Vue {

    profileRoute = RouteType.PROFILE;

    @Prop({ required: true }) storedUser !: StoredUser;
    @Prop({ type: Function, required: true }) logout !: () => void;

    get profilePhoto(): Image {
      return this.storedUser.profilePhoto || DefaultProfilePhoto
    }

    imageLoadError(event: any) {
      event.target.src = ProfilePhotoPlaceholder
    }

  }
</script>
