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
                custom-class="fa-spin">
              </b-icon>
              <span class="has-margin-left-5"> {{ $t('page.action.processing')}} </span>

            </b-loading>
          </b-notification>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import {
    FirebaseAuthAction,
    FirebaseAuthActionParams,
    NotificationMessage,
    RouteParameters,
    RouteType,
    StateNamespace
  } from "~/types";
  import { getWarningNotificationMessage } from "~/service/notification-service";
  import { Context } from "@nuxt/types";

  @Component({
    components: {},
    layout: 'action',
  })
  export default class Action extends Vue {
    action: string = '';
    actionCode: string = '';

    isLoading = true;
    isFullPage = false;

    @StateNamespace.auth.Action handleVerifyEmail !: (actionCode: string) => Promise<any>;
    @StateNamespace.auth.Action handleVerifyPasswordResetCode !: (actionCode: string) => Promise<boolean>;
    @StateNamespace.notification.Action saveNotificationMessage !: (notificationMessage: NotificationMessage) => {};

    async asyncData({ query }: Context) {
      let action = (query[FirebaseAuthActionParams.ACTION] as string)?.trim();
      let actionCode = (query[FirebaseAuthActionParams.ACTION_CODE] as string)?.trim();

      return {
        action,
        actionCode
      }
    }

    mounted() {
      if (!this.action || !this.actionCode) {
        this.isLoading = false
        this.saveNotificationMessage(getWarningNotificationMessage(this.$t('notification.missingActionCode')))
        return;
      }

      switch (this.action) {
        case FirebaseAuthAction.VERIFY_EMAIL:
          this.handleVerifyEmail(this.actionCode)
            .then(() => this.isLoading = false);
          break;

        // case FirebaseAuthAction.RECOVERY_EMAIL:
        //   break;

        case FirebaseAuthAction.RESET_PASSWORD:
          this.handleVerifyPasswordResetCode(this.actionCode)
            .then((validActionCode) => {
              this.isLoading = false;
              if (validActionCode) {
                this.$router.replace({
                  ...RouteType.RESET_PASSWORD,
                  query: {
                    [RouteParameters.ACTION_CODE]: this.actionCode
                  }
                });
              }
            });
          break;

        default:
          this.isLoading = false
          this.saveNotificationMessage(getWarningNotificationMessage(this.$t('notification.unknownAction')))
      }
    }
  }
</script>
