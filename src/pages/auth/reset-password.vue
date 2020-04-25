<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">
        <div class="column is-half">
          <SetPasswordForm :title="$t('form.resetPassword.title')" :button-text="$t('form.resetPassword.submit')"
                           :confirm-password="handleConfirmPasswordReset"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import SetPasswordForm from "~/components/form/SetPasswordForm.vue";
  import { RouteParameters, RouteType, StateNamespace } from "~/types";
  import { Context } from "@nuxt/types";

  @Component({
    components: { SetPasswordForm },
    // middleware: 'logged-in-not-allowed'
  })
  export default class ResetPassword extends Vue {

    actionCode: string = '';

    @StateNamespace.auth.Action confirmPasswordReset !: (code: any) => Promise<boolean>;
    @StateNamespace.notification.Action clearMessage !: () => void;

    handleConfirmPasswordReset(password: string) {
      this.clearMessage();
      this.confirmPasswordReset({ password, actionCode: this.actionCode })
        .then(() => {
          console.log('password updated successfully');
          this.$router.replace(RouteType.LOGIN)
        });
    }

    async asyncData({ query, error, route }: Context) {

      let actionCode = (query[RouteParameters.actionCode] as string)?.trim();

      if (!actionCode) {
        throw error({
          statusCode: 403,
          message: 'Not found',
          path: route.path
        });
      }

      console.log("ResetPassword ACTION asyncData called");

      return {
        actionCode
      }
    }
  }
</script>
