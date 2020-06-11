<template>
  <Profile v-if="authUser && user" :auth-user="authUser" :user="user"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from '~/components/profile/Profile.vue';
  import { Image, StateNamespace, AuthUser, User } from '~/types';
  import { getUser } from '~/service/firebase/firestore-service';
  import { profilePhotoObservable } from '~/service/rx-service';

  @Component({
    components: { Profile },
  })
  export default class profile extends Vue {

    user: User | null = null

    @StateNamespace.auth.Getter authUser !: AuthUser;

    created() {
      this.$subscribeTo(profilePhotoObservable.asObservable(), (image: Image) => {
        if (this.user) {
          this.user.coverPhoto = image;
        }
      })

      getUser(this.authUser.userId)
        .then((user: User) => {
          this.user = user;
        })
    }
  }
</script>


