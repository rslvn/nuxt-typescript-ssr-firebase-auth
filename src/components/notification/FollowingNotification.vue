<template>
  <div class="media" @click="updatePushNotificationStatus">
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
import { PushNotificationEnriched, PushNotificationStatus } from '~/types'
import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue'
import { markAsRead } from '~/service/firebase/firestore'
import { loadNotificationObservable } from '~/service/rx-service'

@Component({
  components: { BackgroundSquareImage }
})
export default class FollowingNotification extends Vue {
  @Prop({ type: Object, required: true }) pushNotificationEnriched: PushNotificationEnriched

  updatePushNotificationStatus () {
    console.log('FollowingNotification updatePushNotificationStatus')
    if (this.pushNotificationEnriched.pushNotification.status === PushNotificationStatus.NEW) {
      markAsRead({ ...this.pushNotificationEnriched.pushNotification })
        .then(() => loadNotificationObservable.next())
    }
  }
}
</script>
