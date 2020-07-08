<template>
  <ForgetPasswordForm :send-password-reset-email="handleSendPasswordResetEmail" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ForgetPasswordForm from '~/components/form/ForgetPasswordForm.vue'
import { StateNamespace } from '~/types'

  @Component({
    components: { ForgetPasswordForm },
    layout: 'action'
  })
export default class ForgetPassword extends Vue {
    @StateNamespace.auth.Action sendPasswordResetEmail : (code: any) => Promise<boolean>;
    @StateNamespace.notification.Action clearNotificationMessage : () => void;

    handleSendPasswordResetEmail (emailAddress: string) {
      this.clearNotificationMessage()
      this.sendPasswordResetEmail(emailAddress)
    }
  }
</script>
