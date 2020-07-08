<template>
  <b-navbar>
    <template slot="brand">
      <Logo />
    </template>
    <template slot="start">
      <b-navbar-item
        :to="routes.HOME"
        tag="router-link"
      >
        <strong>{{ $t('topNavbar.home') }}</strong>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <LanguageSwitcher />
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" :href="routes.REGISTER.path">
            <strong>{{ $t('topNavbar.register') }}</strong>
          </a>

          <a class="button is-primary" :href="routes.LOGIN.path">
            <strong>{{ $t('topNavbar.login') }}</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Routes } from '~/types'
import LanguageSwitcher from '~/components/navbar/LanguageSwitcher.vue'
import Logo from '~/components/navbar/Logo.vue'

  @Component({
    components: { Logo, LanguageSwitcher }
  })
export default class TopNavbar extends Vue {
  get routes () {
    return Routes
  }
}
</script>
