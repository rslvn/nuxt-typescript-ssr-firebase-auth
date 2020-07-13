<template>
  <section class="section">
    <div v-if="isLoading" class="container is-fullhd">
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <b-notification type="is-success" :closable="false">
            <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false">
              <b-icon
                pack="fas"
                icon="sync-alt"
                custom-class="fa-spin"
              />
              <span class="has-margin-left-5"> {{ $t('page.action.processing') }} </span>
            </b-loading>
          </b-notification>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import {
  FirebaseAuthAction,
  FirebaseAuthActionParams,
  NotificationMessage,
  RouteParameters,
  Routes,
  StateNamespace
} from '~/types'
import { getWarningNotificationMessage } from '~/service/notification-service'

@Component({
  components: {},
  layout: 'action'
})
export default class Action extends Vue {
  action: string = '';
  actionCode: string = '';

  isLoading = true;
  isFullPage = false;

  @StateNamespace.auth.Action handleVerifyEmail: (actionCode: string) => Promise<void>;
  @StateNamespace.auth.Action handleVerifyPasswordResetCode: (actionCode: string) => Promise<boolean>;
  @StateNamespace.notification.Action saveNotificationMessage: (notificationMessage: NotificationMessage) => {};

  asyncData ({ query }: Context) {
    const action = (query[FirebaseAuthActionParams.ACTION])
    const actionCode = (query[FirebaseAuthActionParams.ACTION_CODE])

    return {
      action,
      actionCode
    }
  }

  mounted () {
    if (!this.action || !this.actionCode) {
      this.isLoading = false
      this.saveNotificationMessage(getWarningNotificationMessage(this.$t('notification.missingActionCode')))
      return
    }

    switch (this.action) {
      case FirebaseAuthAction.VERIFY_EMAIL:
        this.handleVerifyEmail(this.actionCode)
          .finally(() => {
            this.isLoading = false
          })
        break

      case FirebaseAuthAction.RESET_PASSWORD:
        this.handleVerifyPasswordResetCode(this.actionCode)
          .then((validActionCode) => {
            this.isLoading = false
            if (validActionCode) {
              this.$router.push({
                ...Routes.RESET_PASSWORD,
                query: {
                  [RouteParameters.ACTION_CODE]: this.actionCode
                }
              })
            }
          })
        break

      default:
        this.isLoading = false
        this.saveNotificationMessage(getWarningNotificationMessage(this.$t('notification.unknownAction')))
    }
  }
}
</script>
