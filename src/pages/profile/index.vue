<template>
  <Profile v-if="authUser && user" :auth-user="authUser" :user="user" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthUser, Image, User } from 'types-module'
import Profile from '~/components/profile/Profile.vue'
import { StateNamespace } from '~/types'
import { coverPhotoObservable, profilePhotoObservable, reloadUserFromDatabase } from '~/service/rx-service'
import { getUser } from '~/service/firebase/firestore'
import { sendDangerNotification } from '~/service/notification-service'

@Component({
  components: { Profile }
})
export default class profile extends Vue {
  user: User|null = null

  @StateNamespace.auth.Getter readonly authUser: AuthUser;
  @StateNamespace.loading.Action saveLoading: (loading: boolean) => Promise<void>

  mounted () {
    this.$subscribeTo(profilePhotoObservable.asObservable(), (image: Image) => {
      if (this.user) {
        this.user.profilePhoto = image
      }
    })

    this.$subscribeTo(coverPhotoObservable.asObservable(), (image: Image) => {
      if (this.user) {
        this.user.coverPhoto = image
      }
    })

    this.$subscribeTo(reloadUserFromDatabase.asObservable(), () => {
      console.log('reloadUserFromDatabase called')
      this.loadUser()
    })

    this.loadUser()
  }

  loadUser () {
    this.saveLoading(true)
      .then(async () => {
        await getUser(this.authUser.userId)
          .then((user: User) => {
            this.user = user
          })
          .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.profile.canNotLoad')))
      })
      .catch((error: Error) => console.log('profile.create', error))
      .finally(() => this.saveLoading(false))
  }
}
</script>
