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

    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <LanguageSwitcher/>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <ProfileNavigator v-if="storedUser" :stored-user="storedUser" :logout="logout"/>
        <div v-else class="buttons">
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
  import { RouteType, StateNamespace, StoredUser } from "~/types";
  import LanguageSwitcher from "~/components/shared/LanguageSwitcher.vue";
  import ProfileNavigator from "~/components/shared/ProfileNavigator.vue";

  @Component({
    components: { ProfileNavigator, LanguageSwitcher }
  })
  export default class TopNavbar extends Vue {

    @StateNamespace.auth.Getter storedUser !: StoredUser;
    @StateNamespace.auth.Action logout!: () => void;

    get routeType() {
      return RouteType
    }

  }
</script>
