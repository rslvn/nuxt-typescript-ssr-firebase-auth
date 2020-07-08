<template>
  <div v-if="loading" id="wave">
    <span class="dot olive" />
    <span class="dot blue" />
    <span class="dot green" />
    <span class="dot red" />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { StateNamespace } from '~/types'

  @Component({
    components: {}
  })
export default class extends Vue {
    @StateNamespace.loading.Getter loading : boolean
    @StateNamespace.loading.Action saveLoading : (loading: boolean) => Promise<void>

    start () {
      this.saveLoading(true)
    }

    finish () {
      this.saveLoading(false)
    }

    fail (error: Error) {
      console.log('loading.error', error)
    }

    increase (num: Number) {
      console.log('loading.num: ', num)
    }
  }
</script>

<style lang="css" scoped>
  div#wave .fuchsia {
    background: rgba(255, 0, 255, 0.5);
  }

  div#wave .olive {
    background: rgba(128, 128, 0, 0.5);
  }

  div#wave .blue {
    background: rgba(0, 0, 255, 0.5);
  }

  div#wave .green {
    background: rgba(0, 128, 0, 0.5);
  }

  div#wave .red {
    background: rgba(255, 0, 0, 0.5);
  }

  div#wave {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    z-index: 10000;
  }

  div#wave .dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 3px;

    animation: wave 1.3s linear infinite;
  }

  div#wave .dot:nth-child(2) {
    animation-delay: -1.1s;
  }

  div#wave .dot:nth-child(3) {
    animation-delay: -0.9s;
  }

  div#wave .dot:nth-child(4) {
    animation-delay: -0.7s;
  }

  div#wave .dot:nth-child(5) {
    animation-delay: -0.5s;
  }

  @keyframes wave {
    0%,
    60%,
    100% {
      transform: initial;
    }

    30% {
      transform: translateY(-7px);
    }
  }
</style>
