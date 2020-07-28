<template>
  <b-navbar-dropdown :boxed="true" :close-on-click="true" :arrowless="true" right>
    <template slot="label">
      <span>Images</span>
      <b-icon
        icon="chevron-down"
        size="is-small"
      />
    </template>

    <b-navbar-item
      :to="routes.LIGHT_BOX"
      tag="router-link"
    >
      {{ $t('topNavbar.lightbox') }}
    </b-navbar-item>

    <b-navbar-item
      :to="routes.CROP"
      tag="router-link"
    >
      {{ $t('topNavbar.crop') }}
    </b-navbar-item>

    <b-navbar-item
      :to="routes.IMAGES"
      tag="router-link"
    >
      {{ $t('topNavbar.images') }}
    </b-navbar-item>
  </b-navbar-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Routes } from '~/types'

@Component({
  components: {}
})
export default class TopImage extends Vue {
  get routes () {
    return Routes
  }
}
</script>
