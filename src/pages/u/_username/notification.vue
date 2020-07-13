<template>
  <div class="container">
    <PageTitle :title="$t('page.profileNotification.title')" />
    <div class="columns is-centered">
      <div class="column is-6">
        <div v-for="(pushNotificationEnriched,index) in pushNotificationEnrichedList"
             :key="index"
        >
          <div class="box has-margin-bottom-10 has-cursor-pointer" @click="gotoProfile(pushNotificationEnriched)">
            <FollowingNotification :push-notification-enriched="pushNotificationEnriched" />
          </div>
        </div>

        <client-only>
          <infinite-loading @infinite="infiniteHandler" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InfiniteLoading, { StateChanger } from 'vue-infinite-loading'
import { AuthUser, PrivacyType, PushNotificationEnriched, Routes, StateNamespace } from '~/types'
import userPrivateMiddleware from '~/middleware/user-private'
import PageTitle from '~/components/ui/PageTitle.vue'
import { getPushNotifications } from '~/service/firebase/firestore';
import { toPushNotificationEnrichedList } from '~/plugins/notification-plugin';
import FollowingNotification from '~/components/notification/FollowingNotification.vue';
import { getUserRoute } from '~/service/global-service';

@Component({
  components: { FollowingNotification, PageTitle, InfiniteLoading },
  middleware: userPrivateMiddleware
})
export default class notification extends Vue {
  pushNotificationEnrichedList: PushNotificationEnriched[] = []
  lastVisible: PushNotificationEnriched|null = null

  @StateNamespace.auth.Getter authUser: AuthUser

  infiniteHandler ($state: StateChanger) {
    console.log('infiniteHandler called', this.lastVisible?.pushNotification.id)

    getPushNotifications(this.authUser.userId, 3, this.lastVisible?.pushNotification)
      .then(async (pushNotications) => {
        console.log(`infiniteHandler pushNotications for ${this.authUser.userId}`, pushNotications)
        if (pushNotications?.length > 0) {
          const list = await toPushNotificationEnrichedList(pushNotications)
          list.forEach(pushNotificationEnriched => this.pushNotificationEnrichedList.push(pushNotificationEnriched))
          this.lastVisible = list[list.length - 1]
          $state.loaded()
          console.log('infiniteHandler $state.loaded()')
        } else {
          $state.complete()
          console.log('infiniteHandler $state.complete()')
        }
      })
      .catch((error: Error) => {
        console.log(error)
        $state.complete()
        console.log('infiniteHandler $state.complete()')
      })
  }

  // updatePushNotificationStatus (pushNotificationEnriched: PushNotificationEnriched) {
  //   console.log('notification updatePushNotificationStatus')
  //   if (pushNotificationEnriched.pushNotification.status === PushNotificationStatus.NEW) {
  //     markAsRead({ ...pushNotificationEnriched.pushNotification })
  //       .then(() => loadNotificationObservable.next())
  //   }
  //
  //   this.gotoProfile(pushNotificationEnriched)
  // }

  gotoProfile (pushNotificationEnriched: PushNotificationEnriched) {
    if (pushNotificationEnriched.fromUser.privacy === PrivacyType.PRIVATE) {
      return '/'
    }
    return getUserRoute(Routes.PROFILE_DYNAMIC, pushNotificationEnriched.fromUser.username)
  }
}
</script>
