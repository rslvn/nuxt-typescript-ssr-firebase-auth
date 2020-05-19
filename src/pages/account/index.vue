<template>
  <Profile v-if="storedUser" :user="storedUser"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from "~/components/profile/Profile.vue";
  import { StateNamespace, StoredUser } from "~/types";

  @Component({
    components: { Profile },
  })
  export default class Account extends Vue {
    @StateNamespace.auth.Getter storedUser !: StoredUser;
  }
</script>


