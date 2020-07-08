<template>
  <Profile v-if="authUser && user" :auth-user="authUser" :user="user"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from '~/components/profile/Profile.vue';
  import { AuthUser, Image, PrivacyType, RouteParameters, StateNamespace, User } from '~/types';
  import { coverPhotoObservable, profilePhotoObservable, reloadUserFromDatabase } from '~/service/rx-service';
  import { getUserByUsername } from '~/service/firebase/firestore';
  import { Context } from '@nuxt/types';
  import { sendDangerNotification } from '~/service/notification-service';

  @Component({
    components: { Profile },
  })
  export default class profile extends Vue {

    username = '';
    user: User | null = null

    @StateNamespace.auth.Getter authUser : AuthUser

    async asyncData({ params }: Context) {
      const username = params[RouteParameters.USERNAME]

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

      this.$subscribeTo(reloadUserFromDatabase.asObservable(), async () => {
        console.log('reloadUserFromDatabase called')
        this.user = await this.loadUser()
      })

      if (!this.username) {
        return this.$nuxt.error({
          message: this.$t('page.notFound') as string,
          path: this.$route.fullPath,
          statusCode: 404
        })
      }

      const user = await this.loadUser()
        .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.profile.canNotLoad'))) as User
      if (!user) {
        return this.$nuxt.error({
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
      this.user = user
    }

    async loadUser(): Promise<User> {
      return await getUserByUsername(this.username)
        .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.profile.canNotLoad'))) as User
    }
  }
</script>


