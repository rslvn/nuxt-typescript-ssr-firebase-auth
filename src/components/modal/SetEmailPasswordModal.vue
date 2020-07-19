<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <TopMessage
        v-if="notificationMessage"
        :notification-message="notificationMessage"
        :closed="clearNotificationMessage"
      />

      <LoginForm
        v-if="showLogin && !!passwordProvider"
        :show-forget-password="false"
        :show-register-link="false"
        :sign-in-with-email="reauthenticateWithCredential"
        :email="authUser.email"
        :remember-me="rememberMe"
        :show-remember-me="false"
        class="has-margin-bottom-15"
      />

      <SocialLogin
        v-if="showLogin && socialProviders.length > 0"
        :providers="linkedProviders"
        :title="$t('provider.linkPasswordProvider.socialLogin.title')"
        :remember-me="rememberMe"
        :show-remember-me="false"
        :reauthenticate="true"
      />

      <SetEmailPasswordForm
        v-if="!showLogin"
        :title="$t('provider.linkPasswordProvider.passwordForm.title')"
        :description="$t('provider.linkPasswordProvider.passwordForm.description',{email: authUser.email})"
        :button-text="$t('provider.linkPasswordProvider.passwordForm.submit')"
        :confirm-credentials="handleConfirmCredentials"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser, ProviderType } from 'common-types'
import {
  LoginCredentials,
  NotificationMessage,
  ProviderConfig,
  StateNamespace
} from '../../types'
import SocialLogin from '~/components/form/SocialLogin.vue'
import SetEmailPasswordForm from '~/components/form/SetEmailPasswordForm.vue'
import LoginForm from '~/components/form/LoginForm.vue'
import TopMessage from '~/components/notification/TopMessage.vue'
import { reauthenticateObservable } from '~/service/rx-service'

@Component({
  components: { TopMessage, LoginForm, SetEmailPasswordForm, SocialLogin }
})
export default class SetPasswordModal extends Vue {
  @Prop({ type: Object, required: true }) authUser: AuthUser
  @Prop({ type: Array, required: true }) linkedProviders: ProviderConfig[]
  @Prop({ type: Function, required: true }) confirmCredentials: (
    credentials: LoginCredentials
  ) => void

  showLogin = true

  @StateNamespace.notification.Getter notificationMessage: NotificationMessage
  @StateNamespace.notification.Action clearNotificationMessage: () => void
  @StateNamespace.auth.Getter rememberMe: boolean
  @StateNamespace.auth.Action reauthenticateWithCredential: (
    credentials: LoginCredentials
  ) => void

  created () {
    this.$subscribeTo(reauthenticateObservable.asObservable(), () => {
      this.clearNotificationMessage()
      this.showLogin = false
    })
  }

  get socialProviders () {
    return this.linkedProviders.filter(
      provider => provider.providerType !== ProviderType.PASSWORD
    )
  }

  get passwordProvider () {
    return this.linkedProviders.find(
      provider => provider.providerType === ProviderType.PASSWORD
    )
  }

  handleConfirmCredentials (credentials: LoginCredentials) {
    // @ts-ignore
    // eslint-disable-next-line no-unused-expressions
    this.$parent?.close()
    this.confirmCredentials(credentials)
  }
}
</script>
