<template>
  <ProfilePictureCard />
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import ProfilePictureCard from "~/components/profile/ProfilePictureCard.vue";

  @Component({
    components: { ProfilePictureCard }
  })
  export default class Profile extends Vue {
  }
</script>
