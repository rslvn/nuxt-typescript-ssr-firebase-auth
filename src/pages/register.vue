<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <SocialLogin
            :title="$t('form.social.title.register')"
            :remember-me="rememberMe"
            :providers="providers"
            :reauthenticate="false"
          />
        </div>

        <div class="column">
          <RegisterForm :sign-up-with-email="handleSignUpWithEmail" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ProviderType } from 'types-module'
import SocialLogin from '~/components/form/SocialLogin.vue'
import RegisterForm from '~/components/form/RegisterForm.vue'
import { RegistrationCredentials, Routes, StateNamespace, SupportedProviders } from '~/types'
import { getHeadByRouteType } from '~/service/seo-service'
import { reloadUserFromDatabase } from '~/service/rx-service'

@Component({
  components: { SocialLogin, RegisterForm }
})
export default class register extends Vue {
  @StateNamespace.auth.Getter rememberMe: boolean;
  @StateNamespace.auth.Action signUpWithEmail: (credentials: RegistrationCredentials) => Promise<void>;
  @StateNamespace.notification.Action clearNotificationMessage: () => Promise<void>;
  @StateNamespace.loading.Action saveLoading: (loading: boolean) => Promise<void>

  async handleSignUpWithEmail (credentials: RegistrationCredentials) {
    await this.saveLoading(true)
      .then(async () => {
        await this.clearNotificationMessage()
        await this.signUpWithEmail(credentials)
          .then(async () => await reloadUserFromDatabase.next())
      })
      .finally(() => this.saveLoading(false))
  }

  get providers () {
    return SupportedProviders.filter(value => value.providerType !== ProviderType.PASSWORD)
  }

  head () {
    return getHeadByRouteType(Routes.REGISTER, this)
  }
}
</script>
