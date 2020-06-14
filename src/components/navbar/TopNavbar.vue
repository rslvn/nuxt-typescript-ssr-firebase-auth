<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="routeType.HOME">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        :to="routeType.HOME"
        tag="router-link"
      >
        <strong>{{$t('topNavbar.home')}}</strong>
      </b-navbar-item>

      <b-navbar-item
        :to="routeType.LIGHT_BOX"
        tag="router-link"
      >
        {{ $t('topNavbar.lightbox')}}
      </b-navbar-item>

      <b-navbar-item
        :to="routeType.CORP"
        tag="router-link"
      >
        {{ $t('topNavbar.crop')}}
      </b-navbar-item>

      <b-navbar-item
        :to="routeType.IMAGES"
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
                    :to="routeType.REGISTER"
                    type="is-primary">
            <strong>{{$t('topNavbar.register')}}</strong>
          </b-button>

          <b-button tag="router-link"
                    :to="routeType.LOGIN"
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
  import { AuthUser, RouteType, StateNamespace } from "~/types";
  import LanguageSwitcher from "~/components/navbar/LanguageSwitcher.vue";
  import ProfileNavigator from "~/components/navbar/ProfileNavigator.vue";

  @Component({
    components: { ProfileNavigator, LanguageSwitcher }
  })
  export default class TopNavbar extends Vue {

    @StateNamespace.auth.Getter authUser !: AuthUser;
    @StateNamespace.auth.Action logout!: () => void;

    get routeType() {
      return RouteType
    }

  }
</script>
