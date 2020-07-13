<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <div class="box">
        <b-field :label="$t('common.field.name')" horizontal>
          <span>{{ user.name }}</span>
        </b-field>

        <b-field :label="$t('common.field.surname')" horizontal>
          <span>{{ user.surname }}</span>
        </b-field>

        <b-field :label="$t('common.field.biography')" horizontal>
          <span>{{ user.biography }}</span>
        </b-field>

        <template v-if="isMyProfile">
          <b-field v-if="authUser.email" :label="$t('common.field.email')" horizontal>
            <b-field grouped>
              <span>{{ authUser.email }}</span>
              <b-tooltip v-if="authUser.verified" :label="$t('profile.card.info.mailVerified')">
                <b-icon
                  type="is-success"
                  class="has-margin-left-15"
                  pack="fas"
                  icon="check"
                />
              </b-tooltip>

              <b-tooltip v-else :label="$t('profile.card.info.mailNotVerified')">
                <b-icon
                  type="is-warning"
                  class="has-margin-left-15"
                  pack="fas"
                  icon="exclamation-triangle"
                />
              </b-tooltip>
            </b-field>
          </b-field>

          <b-field v-if=" passwordProvider && !authUser.verified" horizontal>
            <div class="buttons">
              <b-button
                type="is-primary"
                :disabled="loading"
                @click="submit"
              >
                {{ $t('profile.card.info.verifyButton') }}
              </b-button>

              <b-button
                v-if="loading"
                type="is-light"
                disabled="true"
                :loading="loading"
              />
            </div>
          </b-field>

          <b-field v-if="passwordProvider && authUser.verified" horizontal>
            <div class="buttons">
              <b-button
                type="is-primary"
                @click="showSetPasswordModal"
              >
                {{ $t('profile.card.info.updatePasswordButton') }}
              </b-button>
            </div>
          </b-field>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { LoginCredentials, ProviderConfig, ProviderType, StateNamespace, SupportedProviders } from '~/types'
import SetEmailPasswordModal from '~/components/modal/SetEmailPasswordModal.vue'
import BaseModule from '~/mixin/BaseModule'

@Component({
  components: {}
})
export default class ProfileAboutMe extends BaseModule {
  loading = false;

  @StateNamespace.notification.Action clearNotificationMessage: () => void;
  @StateNamespace.auth.Action handleSendingEmailVerificationCode: () => Promise<void>
  @StateNamespace.auth.Action updatePassword: (password: string) => void;

  get passwordProvider (): ProviderConfig|undefined {
    return this.authUser.providers.find(providerData => providerData.providerType === ProviderType.PASSWORD)
      ? SupportedProviders.find(provider => provider.providerType === ProviderType.PASSWORD)
      : undefined
  }

  confirmCredentials (credentials: LoginCredentials) {
    this.updatePassword(credentials.password)
  }

  showSetPasswordModal () {
    this.$buefy.modal.open({
      parent: this,
      component: SetEmailPasswordModal,
      hasModalCard: true,
      customClass: 'custom-class custom-class-2',
      trapFocus: true,
      canCancel: true,
      onCancel: this.clearNotificationMessage,
      props: {
        authUser: this.authUser,
        linkedProviders: [this.passwordProvider],
        confirmCredentials: this.confirmCredentials
      }
    })
  }

  submit () {
    this.loading = true
    this.handleSendingEmailVerificationCode()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>
