<template>
  <div class="container">
    <div>
      <b-button type="is-primary" class="is-pulled-right" size="is-small" outlined rounded
                @click="refreshNotifications"
      >
        {{ $t('common.refresh') }}
      </b-button>
      <PageTitle :title="$t('page.profileNotification.title')" />
    </div>

    <div class="columns is-centered">
      <div class="column is-6">
        <div v-for="(pushNotificationEnriched,index) in pushNotificationEnrichedList"
             :key="index"
        >
          <div class="box has-margin-bottom-10 has-cursor-pointer">
            <nav class="level">
              <div class="level-left">
                <FollowingNotification :push-notification-enriched="pushNotificationEnriched" />
              </div>
              <div class="level-right">
                <div class="buttons">
                  <b-button v-if="isNew(pushNotificationEnriched)" type="is-link" size="is-small" outlined rounded
                            @click="markAsRead(pushNotificationEnriched)"
                  >
                    {{ $t('pushNotification.markAsRead') }}
                  </b-button>
                  <span v-if="!isNew(pushNotificationEnriched)" @click="markAsDeleted(pushNotificationEnriched, index)">
                    <b-tooltip :label="$t('common.delete')"
                               type="is-light"
                               position="is-bottom"
                    >
                      <b-icon icon="trash-can-outline" type="is-danger"> delete</b-icon>
                    </b-tooltip>
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <client-only>
          <infinite-loading :spinner="spinner" @infinite="infiniteHandler">
            <div slot="no-more">
              {{ $t('page.profileNotification.noMoreNotification') }}
            </div>
            <div slot="no-results">
              {{ $t('page.profileNotification.noMoreNotification') }}
            </div>
          </infinite-loading>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InfiniteLoading, { SpinnerType, StateChanger } from 'vue-infinite-loading'
import { AuthUser, PushNotificationEnriched, PushNotificationStatus, StateNamespace } from '~/types'
import userPrivateMiddleware from '~/middleware/user-private'
import PageTitle from '~/components/ui/PageTitle.vue'
import {
  getPushNotifications,
  markPushNotificationAsDeleted,
  markPushNotificationAsRead
} from '~/service/firebase/firestore'
import { toPushNotificationEnrichedList } from '~/plugins/notification-plugin'
import FollowingNotification from '~/components/notification/FollowingNotification.vue'

@Component({
  components: { FollowingNotification, PageTitle, InfiniteLoading },
  middleware: userPrivateMiddleware
})
export default class notification extends Vue {
  pushNotificationEnrichedList: PushNotificationEnriched[] = []
  lastVisible: PushNotificationEnriched|null = null
  stateChanger: StateChanger|null = null

  @StateNamespace.auth.Getter readonly authUser: AuthUser

  get spinner (): SpinnerType {
    return 'bubbles'
  }

  infiniteHandler ($state: StateChanger) {
    this.stateChanger = $state
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

  isNew (pushNotificationEnriched: PushNotificationEnriched) {
    return pushNotificationEnriched?.pushNotification?.status === PushNotificationStatus.NEW
  }

  markAsRead (pushNotificationEnriched: PushNotificationEnriched) {
    if (pushNotificationEnriched?.pushNotification?.status !== PushNotificationStatus.READ) {
      markPushNotificationAsRead(pushNotificationEnriched.pushNotification)
    }
  }

  markAsDeleted (pushNotificationEnriched: PushNotificationEnriched, index: number) {
    if (pushNotificationEnriched?.pushNotification?.status === PushNotificationStatus.DELETED) {
      return
    }

    this.$buefy.dialog.confirm({
      title: this.$t('pushNotification.dialog.delete.title') + '',
      message: this.$t('pushNotification.dialog.delete.message') + '',
      confirmText: this.$t('common.delete') + '',
      cancelText: this.$t('common.cancel') + '',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        this.pushNotificationEnrichedList.splice(index, 1)
        markPushNotificationAsDeleted(pushNotificationEnriched.pushNotification)
      }
    })
  }

  refreshNotifications () {
    this.lastVisible = null
    this.pushNotificationEnrichedList = []
    this.stateChanger?.reset()
  }
}
</script>
