<template>
  <div class="modal-card">
    <section class="modal-card-body">

      <LoginForm v-if="showLogin && !!passwordProvider" :show-forget-password="false" :show-register-link="false"
                 :sign-in-with-email="reauthenticateWithCredential"
                 :email="user.email" :callback="loginSuccessCallback" class="has-margin-bottom-15"/>

      <SocialLogin v-if="showLogin && socialProviders.length > 0" :providers="linkedProviders"
                   :title="$t('provider.linkPasswordProvider.socialLogin.title')"
                   :callback="loginSuccessCallback"/>

      <SetPasswordForm v-if="!showLogin" :title="$t('provider.linkPasswordProvider.passwordForm.title')"
                       :description="$t('provider.linkPasswordProvider.passwordForm.description',{email: user.email})"
                       :button-text="$t('provider.linkPasswordProvider.passwordForm.submit')"
                       :confirm-password="handleConfirmPassword"/>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { LoginCredentials, ProviderConfig, ProviderType, StateNamespace, StoredUser } from "../../types";
  import SocialLogin from "~/components/form/SocialLogin.vue";
  import SetPasswordForm from "~/components/form/SetPasswordForm.vue";
  import LoginForm from "~/components/form/LoginForm.vue";

  @Component({
    components: { LoginForm, SetPasswordForm, SocialLogin }
  })
  export default class SetPasswordModal extends Vue {

    showLogin = true

    @StateNamespace.auth.Action reauthenticateWithCredential !: (credentials: LoginCredentials) => void;

    @Prop({ type: Object, required: true }) user !: StoredUser;
    @Prop({ type: Array, required: true }) linkedProviders !: ProviderConfig[];
    @Prop({ type: Function, required: true }) confirmPassword !: (newPassword: string) => void;

    get socialProviders() {
      return this.linkedProviders.filter(provider => provider.providerType !== ProviderType.password)
    }

    get passwordProvider() {
      return this.linkedProviders.find(provider => provider.providerType === ProviderType.password)
    }

    loginSuccessCallback() {
      this.showLogin = false;
    }

    handleConfirmPassword(password: string) {
      // @ts-ignore
      this.$parent.close()
      this.confirmPassword(password)
    }
  }
</script>
