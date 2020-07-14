<template>
  <b-navbar-dropdown :arrowless="true" :close-on-click="true" :boxed="true">
    <template slot="label">
      <b-icon
        v-if="hasNewNotification"
        icon="bell-ring"
        class="has-badge-rounded has-badge-danger has-badge-small has-cursor-pointer"
        :data-badge="countOfNewNotifications"
      />

      <b-icon
        v-else
        icon="bell-ring"
      />
    </template>

    <b-navbar-item
      v-for="(pushNotificationEnriched,index) in pushNotificationEnrichedList"
      :key="index"
      class="has-margin-bottom-5"
      :class="{'has-background-success': isNew(pushNotificationEnriched)}"
    >
      <component :is="getComponent(pushNotificationEnriched)"
                 v-bind="getComponentProperties(pushNotificationEnriched)"
      />
    </b-navbar-item>

    <b-navbar-item :key="'seeAll'" tag="router-link" :to="profileNotification">
      {{ $t('pushNotification.seeAll') }}
    </b-navbar-item>
  </b-navbar-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import {
  AuthUser,
  PushNotificationEnriched,
  PushNotificationStatus,
  PushNotificationType,
  Routes,
  UpdatePushNotificationStatus
} from '~/types'
import FollowingNotification from '~/components/notification/FollowingNotification.vue'
import { getUserRoute } from '~/service/global-service'
import { loadNotificationObservable, updateNotificationStatusObservable } from '~/service/rx-service';
import { loadLatestNotifications } from '~/service/firebase/firestore';

@Component({
  components: {}
})
export default class TopPushNotification extends Vue {
  @Prop({ required: true }) readonly authUser: AuthUser
  pushNotificationEnrichedList: PushNotificationEnriched[] = []

  created () {
    this.$subscribeTo(loadNotificationObservable.asObservable(), () => {
      loadLatestNotifications(this.authUser.userId, 5)
        .then((list) => {
          this.pushNotificationEnrichedList = list
        })
    })

    this.$subscribeTo(updateNotificationStatusObservable.asObservable(),
      (updatePushNotificationStatus: UpdatePushNotificationStatus) => {

        const index = this.pushNotificationEnrichedList
          .findIndex(notification => notification.pushNotification.id === updatePushNotificationStatus.id)

        if (index > -1) {
          switch (updatePushNotificationStatus.status) {
            case PushNotificationStatus.READ:
              this.pushNotificationEnrichedList[index].pushNotification.status = updatePushNotificationStatus.status
              break

            case PushNotificationStatus.DELETED:
              this.pushNotificationEnrichedList.splice(index, 1)
              break
          }
        }
      })
  }

  get countOfNewNotifications () {
    return this.pushNotificationEnrichedList
      .filter(pushNotificationEnriched => this.isNew(pushNotificationEnriched))
      .length
  }

  get hasNewNotification () {
    return this.countOfNewNotifications > 0
  }

  get profileNotification () {
    return getUserRoute(Routes.PROFILE_NOTIFICATION, this.authUser.username)
  }

  isNew (pushNotificationEnriched: PushNotificationEnriched) {
    return pushNotificationEnriched.pushNotification.status === PushNotificationStatus.NEW
  }

  getComponent (pushNotificationEnriched: PushNotificationEnriched) {
    switch (pushNotificationEnriched.pushNotification.notificationType) {
      case PushNotificationType.FOLLOW:
        return FollowingNotification
    }
  }

  getComponentProperties (pushNotificationEnriched: PushNotificationEnriched) {
    return { pushNotificationEnriched }
  }
}
</script>
