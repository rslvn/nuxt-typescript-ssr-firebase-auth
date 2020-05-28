<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">
        <div class="column is-half">
          <SetPasswordForm v-if="!!actionCode"
                           :title="$t('form.resetPassword.title')"
                           :button-text="$t('form.resetPassword.submit')"
                           :confirm-password="handleConfirmPasswordReset"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { Context } from "@nuxt/types";
  import SetPasswordForm from "~/components/form/SetPasswordForm.vue";
  import { NotificationMessage, RouteParameters, StateNamespace } from "~/types";
  import { getWarningNotificationMessage } from "~/service/notification-service";

  @Component({
    components: { SetPasswordForm },
    layout: 'action'
  })
  export default class ResetPassword extends Vue {

    actionCode: string = '';

    @StateNamespace.auth.Action confirmPasswordReset !: (code: any) => {};
    @StateNamespace.notification.Action clearMessage !: () => void;
    @StateNamespace.notification.Action saveMessage !: (notificationMessage: NotificationMessage) => {};

    handleConfirmPasswordReset(password: string) {
      this.clearMessage();
      this.confirmPasswordReset({ password, actionCode: this.actionCode })
    }

    async asyncData({ query }: Context) {
      let actionCode = (query[RouteParameters.actionCode] as string)?.trim();

      return {
        actionCode
      }
    }

    mounted() {
      if (!this.actionCode) {
        this.saveMessage(getWarningNotificationMessage(this.$t('notification.missingActionCode')))
      }
    }

  }
</script>
