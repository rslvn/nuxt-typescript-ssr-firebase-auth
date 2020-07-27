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

      <TopImage />
    </template>

    <template slot="end">
      <SearchBar :auth-user="authUser" class="has-margin-top-10" />

      <LanguageSwitcher />

      <TopShare />

      <TopPushNotification v-if="authUser" :auth-user="authUser" />

      <b-navbar-item v-if="authUser" tag="router-link" :to="dynamicProfileRoute">
        <b-field>
          <BackgroundSquareImage :image-url="profilePhoto" size="28" rounded="true" />
          <span class="has-margin-left-5"><b>{{ authUser.name || authUser.email }}</b></span>
        </b-field>
      </b-navbar-item>

      <ProfileNavigator v-if="authUser" :auth-user="authUser" :logout="logout" />

      <b-navbar-item v-else tag="div">
        <div class="buttons">
          <b-button
            tag="router-link"
            :to="routes.REGISTER"
            type="is-primary"
          >
            <strong>{{ $t('topNavbar.register') }}</strong>
          </b-button>

          <b-button
            tag="router-link"
            :to="routes.LOGIN"
            type="is-primary"
          >
            <strong>{{ $t('topNavbar.login') }}</strong>
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthUser } from 'types-module'
import { DefaultProfilePhoto, Routes, StateNamespace } from '~/types'
import LanguageSwitcher from '~/components/navbar/LanguageSwitcher.vue'
import ProfileNavigator from '~/components/navbar/ProfileNavigator.vue'
import Logo from '~/components/navbar/Logo.vue'
import SearchBar from '~/components/navbar/SearchBar.vue'
import { getUserRoute } from '~/service/global-service'
import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue'
import TopPushNotification from '~/components/navbar/TopPushNotification.vue'
import TopShare from '~/components/navbar/TopShare.vue'
import TopImage from '~/components/navbar/TopImage.vue'

@Component({
  components: {
    TopImage,
    TopShare,
    TopPushNotification,
    BackgroundSquareImage,
    SearchBar,
    Logo,
    ProfileNavigator,
    LanguageSwitcher
  }
})
export default class TopNavbar extends Vue {
  @StateNamespace.auth.Getter readonly authUser: AuthUser
  @StateNamespace.auth.Action logout: () => void

  get routes () {
    return Routes
  }

  get dynamicProfileRoute () {
    return getUserRoute(Routes.PROFILE_DYNAMIC, this.authUser.username)
  }

  get profilePhoto () {
    return this.authUser?.profilePhoto?.src || DefaultProfilePhoto.src
  }
}
</script>
