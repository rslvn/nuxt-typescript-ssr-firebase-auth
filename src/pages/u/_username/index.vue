<template>
  <Profile v-if="authUser && user" :auth-user="authUser" :user="user"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from '~/components/profile/Profile.vue';
  import { AuthUser, Image, PrivacyType, RouteParameters, StateNamespace, User } from '~/types';
  import { coverPhotoObservable, profilePhotoObservable } from '~/service/rx-service';
  import { getUserByUsername } from '~/service/firebase/firestore';
  import { Context } from '@nuxt/types';

  @Component({
    components: { Profile },
  })
  export default class profile extends Vue {

    username = '';
    user: User | null = null

    @StateNamespace.auth.Getter authUser !: AuthUser;

    async asyncData({ params, error, route, app, store }: Context) {
      const username = params[RouteParameters.USERNAME]
      if (!username) {
        error({
          message: app.i18n.t('page.notFound') as string,
          path: route.fullPath,
          statusCode: 404
        })
        return
      }

      return {
        username
      }
    }

    async created() {
      this.$subscribeTo(profilePhotoObservable.asObservable(), (image: Image) => {
        console.log('profilePhotoObservable called by ', image)
        if (this.user) {
          this.user.profilePhoto = image;
        }
      })

      this.$subscribeTo(coverPhotoObservable.asObservable(), (image: Image) => {
        console.log('coverPhotoObservable called by ', image)
        if (this.user) {
          this.user.coverPhoto = image;
        }
      })

      if (this.username) {
        getUserByUsername(this.username).then((user) => this.user = user)
      }

      const user = await getUserByUsername(this.username)
      if (!user) {
        this.$nuxt.error({
          message: this.$t('page.notFound') as string,
          path: this.$route.fullPath,
          statusCode: 404
        })
      }

      if (this.authUser.username !== this.username
        && ((!user?.privacy || user.privacy === PrivacyType.PRIVATE))) {
        console.log('PRIVATE user')
        this.$nuxt.error({
          message: this.$t('page.notFound') as string,
          path: this.$route.fullPath,
          statusCode: 404
        })
      }
    }
  }
</script>


