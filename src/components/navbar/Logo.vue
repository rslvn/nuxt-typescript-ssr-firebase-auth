<template>
  <b-navbar-item tag="router-link" :to="home">
    <img
      src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
      alt="Lightweight UI components for Vue.js based on Bulma"
    >
  </b-navbar-item>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { HOME } from '~/types'

@Component({
  components: {}
})
export default class Logo extends Vue {
  home = HOME
}
</script>
