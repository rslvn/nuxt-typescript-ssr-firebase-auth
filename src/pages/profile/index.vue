<template>
  <Profile v-if="storedUser && user" :stored-user="storedUser" :user="user"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from '~/components/profile/Profile.vue';
  import { Image, StateNamespace, StoredUser, User } from '~/types';
  import { getUser } from '~/service/firebase/firestore-service';

  @Component({
    components: { Profile },
  })
  export default class profile extends Vue {

    user: User | null = null

    @StateNamespace.auth.Getter storedUser !: StoredUser;
    @StateNamespace.profile.Action saveCoverPhoto !: (coverPhoto: Image) => {};

    async created() {
      await getUser(this.storedUser.userId)
        .then((user: User) => {
          this.user = user;
          // if (user?.coverPhoto) {
          //   this.saveCoverPhoto(user.coverPhoto as Image)
          // }
        })
    }
  }
</script>


