<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="routes.HOME">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        :to="routes.HOME"
        tag="router-link"
      >
        <strong>{{$t('topNavbar.home')}}</strong>
      </b-navbar-item>

      <b-navbar-item
        :to="routes.LIGHT_BOX"
        tag="router-link"
      >
        {{ $t('topNavbar.lightbox')}}
      </b-navbar-item>

      <b-navbar-item
        :to="routes.CROP"
        tag="router-link"
      >
        {{ $t('topNavbar.crop')}}
      </b-navbar-item>

      <b-navbar-item
        :to="routes.IMAGES"
        tag="router-link"
      >
        {{ $t('topNavbar.images')}}
      </b-navbar-item>

    </template>

    <template slot="end">

      <LanguageSwitcher/>

      <ProfileNavigator v-if="authUser" :auth-user="authUser" :logout="logout"/>

      <b-navbar-item v-else tag="div">
        <div class="buttons">
          <b-button tag="router-link"
                    :to="routes.REGISTER"
                    type="is-primary">
            <strong>{{$t('topNavbar.register')}}</strong>
          </b-button>

          <b-button tag="router-link"
                    :to="routes.LOGIN"
                    type="is-primary">
            <strong>{{$t('topNavbar.login')}}</strong>
          </b-button>
        </div>
      </b-navbar-item>

    </template>
  </b-navbar>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { AuthUser, Routes, StateNamespace } from "~/types";
  import LanguageSwitcher from "~/components/navbar/LanguageSwitcher.vue";
  import ProfileNavigator from "~/components/navbar/ProfileNavigator.vue";

  @Component({
    components: { ProfileNavigator, LanguageSwitcher }
  })
  export default class TopNavbar extends Vue {

    @StateNamespace.auth.Getter authUser !: AuthUser;
    @StateNamespace.auth.Action logout!: () => void;

    get routes() {
      return Routes
    }

  }
</script>
