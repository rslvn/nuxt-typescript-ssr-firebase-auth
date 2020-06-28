<template>
  <b-field grouped>
    <div class="control">
      <b-taglist attached>
        <b-tag>followers</b-tag>
        <b-tag type="is-info">0</b-tag>
      </b-taglist>
    </div>

    <div class="control">
      <b-taglist attached>
        <b-tag>following</b-tag>
        <b-tag type="is-primary">
          15k
        </b-tag>
      </b-taglist>
    </div>
  </b-field>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';

  @Component({
    components: {}
  })
  export default class ProfileFollow extends Vue {
  }
</script>
