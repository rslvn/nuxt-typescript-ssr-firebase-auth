<template>
  <Profile/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from "~/components/profile/Profile.vue";

  @Component({
    components: { Profile },
  })
  export default class Account extends Vue {
  }
</script>


