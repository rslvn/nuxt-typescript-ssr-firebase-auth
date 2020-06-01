<template>
  <Profile v-if="storedUser" :stored-user="storedUser"/>
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
    @StateNamespace.auth.Getter storedUser !: StoredUser;
    @StateNamespace.profile.Action saveCoverPhoto !: (coverPhoto: Image) => {};

    async created() {
      await getUser(this.storedUser.userId)
        .then((user: User) => {
          if (user?.coverPhoto) {
            this.saveCoverPhoto(user.coverPhoto as Image)
          }
        })
    }

    // async asyncData({}: Context) {
    //   getUser(this.storedUser.userId)
    //     .then((user: User) => {
    //       return {
    //         coverPhoto: user.coverPhoto
    //       }
    //     })
    // }

  }
</script>


