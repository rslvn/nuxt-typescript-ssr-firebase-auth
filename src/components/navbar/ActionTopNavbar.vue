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
        <div class="buttons">

          <a class="button is-primary" :href="routeType.REGISTER.path">
            <strong>{{$t('topNavbar.register')}}</strong>
          </a>

          <a class="button is-primary" :href="routeType.LOGIN.path">
            <strong>{{$t('topNavbar.login')}}</strong>
          </a>
        </div>
      </b-navbar-item>

    </template>
  </b-navbar>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { RouteType } from "~/types";
  import LanguageSwitcher from "~/components/navbar/LanguageSwitcher.vue";

  @Component({
    components: { LanguageSwitcher }
  })
  export default class TopNavbar extends Vue {
    get routeType() {
      return RouteType
    }

  }
</script>
