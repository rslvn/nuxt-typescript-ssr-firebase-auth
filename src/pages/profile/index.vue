<template>
  <Profile v-if="storedUser" :stored-user="storedUser" :cover-photo="coverPhoto"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from "~/components/profile/Profile.vue";
  import { Image, StateNamespace, StoredUser, User } from "~/types";
  import { getUser } from "~/service/firebase/firestore-service";

  @Component({
    components: { Profile },
  })
  export default class Account extends Vue {
    coverPhoto: Image | null = null;
    @StateNamespace.auth.Getter storedUser !: StoredUser;

    async created() {
      await getUser(this.storedUser.userId)
        .then((user: User) => {
          console.log('created ', user)
          this.coverPhoto = user.coverPhoto as Image
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


