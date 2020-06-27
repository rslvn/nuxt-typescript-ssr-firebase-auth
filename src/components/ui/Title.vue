<template>
  <div class="columns has-margin-bottom-25 has-margin-top-25">
    <div class="column has-text-centered">
      <h1 class="title">{{ title }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';

  @Component({
    components: {}
  })
  export default class Title extends Vue {
    @Prop({type: String, required: true}) title !: string
  }
</script>
