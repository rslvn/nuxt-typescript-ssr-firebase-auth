<template>
  <b-navbar-dropdown :boxed="true" :close-on-click="true" :arrowless="true">
    <template slot="label">
      <b-icon
        icon="chevron-down"
        size="is-small"
      />
    </template>

    <b-navbar-item tag="router-link" :to="dynamicProfileRoute">
      <b-icon pack="fas" icon="user" class="has-margin-right-5" />
      <p>{{ $t('topNavbar.profileDynamic') }}</p>
    </b-navbar-item>

    <b-navbar-item tag="router-link" :to="profileRoute">
      <b-icon pack="fas" icon="user" class="has-margin-right-5" />
      <p>{{ $t('topNavbar.profile') }}</p>
    </b-navbar-item>

    <hr class="dropdown-divider">

    <b-navbar-item @click="logout">
      <b-icon icon="logout" class="has-margin-right-5" />
      <p>{{ $t('topNavbar.logout') }}</p>
    </b-navbar-item>
  </b-navbar-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser } from 'common-types'
import { Routes } from '~/types'
import { getUserRoute } from '~/service/global-service'

@Component({
  components: {}
})
export default class ProfileNavigator extends Vue {
  @Prop({ required: true }) authUser: AuthUser;
  @Prop({ type: Function, required: true }) logout: () => void;

  get profileRoute () {
    return Routes.PROFILE
  }

  get dynamicProfileRoute () {
    return getUserRoute(Routes.PROFILE_DYNAMIC, this.authUser.username)
  }
}
</script>
