<template>
  <div class="modal-card">
    <section class="modal-card-body">

      <TopNotification v-if="getMessage" :notification-message="getMessage" :closed="clearMessage"/>

      <LoginForm v-if="showLogin && !!passwordProvider" :show-forget-password="false" :show-register-link="false"
                 :sign-in-with-email="reauthenticateWithCredential"
                 :email="storedUser.email" :remember-me="rememberMe" :show-remember-me="false"
                 :callback="loginSuccessCallback" class="has-margin-bottom-15"/>

      <SocialLogin v-if="showLogin && socialProviders.length > 0" :providers="linkedProviders"
                   :title="$t('provider.linkPasswordProvider.socialLogin.title')"
                   :remember-me="rememberMe"
                   :show-remember-me="false"
                   :callback="loginSuccessCallback" :reauthenticate="true"/>

      <SetEmailPasswordForm v-if="!showLogin" :title="$t('provider.linkPasswordProvider.passwordForm.title')"
                            :description="$t('provider.linkPasswordProvider.passwordForm.description',{email: storedUser.email})"
                            :button-text="$t('provider.linkPasswordProvider.passwordForm.submit')"
                            :confirm-credentials="handleConfirmCredentials"/>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import {
    LoginCredentials,
    NotificationMessage,
    ProviderConfig,
    ProviderType,
    StateNamespace,
    StoredUser
  } from "../../types";
  import SocialLogin from "~/components/form/SocialLogin.vue";
  import SetEmailPasswordForm from "~/components/form/SetEmailPasswordForm.vue";
  import LoginForm from "~/components/form/LoginForm.vue";
  import TopNotification from "~/components/notification/TopNotification.vue";

  @Component({
    components: { TopNotification, LoginForm, SetEmailPasswordForm, SocialLogin }
  })
  export default class SetPasswordModal extends Vue {

    showLogin = true

    @StateNamespace.notification.Getter getMessage!: NotificationMessage;
    @StateNamespace.notification.Action clearMessage !: () => void;
    @StateNamespace.auth.Getter rememberMe !: boolean;
    @StateNamespace.auth.Action reauthenticateWithCredential !: (credentials: LoginCredentials) => void;

    @Prop({ type: Object, required: true }) storedUser !: StoredUser;
    @Prop({ type: Array, required: true }) linkedProviders !: ProviderConfig[];
    @Prop({ type: Function, required: true }) confirmCredentials !: (credentials: LoginCredentials) => void;

    get socialProviders() {
      return this.linkedProviders.filter(provider => provider.providerType !== ProviderType.PASSWORD)
    }

    get passwordProvider() {
      return this.linkedProviders.find(provider => provider.providerType === ProviderType.PASSWORD)
    }

    loginSuccessCallback() {
      this.clearMessage();
      this.showLogin = false;
    }

    handleConfirmCredentials(credentials: LoginCredentials) {
      // @ts-ignore
      this.$parent.close()
      this.confirmCredentials(credentials)
    }
  }
</script>
