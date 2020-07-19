<template>
  <div class="media" @click="onPushNotificationClicked">
    <div class="media-left">
      <BackgroundSquareImage
        :image-url="pushNotificationEnriched.fromUser.profilePhoto.src"
        :size="40"
        border-inside="true"
        border="1"
      />
    </div>
    <div class="">
      <p>{{ $t('pushNotification.type.follow') }}</p>
      <p>@{{ pushNotificationEnriched.fromUser.username }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PrivacyType, PushNotificationStatus } from 'common-types'
import { PushNotificationEnriched, Routes } from '~/types'
import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue'
import { markPushNotificationAsRead } from '~/service/firebase/firestore'
import { updateNotificationStatusObservable } from '~/service/rx-service'
import { getUserRoute } from '~/service/global-service'

@Component({
  components: { BackgroundSquareImage }
})
export default class FollowingNotification extends Vue {
  @Prop({ type: Object, required: true }) pushNotificationEnriched: PushNotificationEnriched

  onPushNotificationClicked () {
    this.updatePushNotificationStatus()
    this.gotoProfile()
  }

  gotoProfile () {
    if (this.pushNotificationEnriched.fromUser.privacy === PrivacyType.PRIVATE) {
      return
    }
    return this.$router.push(getUserRoute(Routes.PROFILE_DYNAMIC, this.pushNotificationEnriched.fromUser.username))
  }

  updatePushNotificationStatus () {
    console.log('FollowingNotification updatePushNotificationStatus')
    if (this.pushNotificationEnriched.pushNotification.status === PushNotificationStatus.NEW) {
      markPushNotificationAsRead(this.pushNotificationEnriched.pushNotification)
        .then(() => updateNotificationStatusObservable.next({
          id: this.pushNotificationEnriched.pushNotification.id,
          status: PushNotificationStatus.READ
        }))
    }
  }
}
</script>
