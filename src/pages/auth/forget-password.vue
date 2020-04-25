<template>
  <ForgetPasswordForm :send-password-reset-email="handleSendPasswordResetEmail"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import ForgetPasswordForm from "~/components/form/ForgetPasswordForm.vue";
  import { StateNamespace } from "~/lib/types";

  @Component({
    components: { ForgetPasswordForm },
    // middleware: 'logged-in-not-allowed'
  })
  export default class ForgetPassword extends Vue {

    @StateNamespace.auth.Action sendPasswordResetEmail !: (code: any) => Promise<boolean>;
    @StateNamespace.notification.Action clearMessage !: () => void;

    handleSendPasswordResetEmail(emailAddress: string) {
      this.clearMessage();
      this.sendPasswordResetEmail(emailAddress);
    }
  }
</script>
