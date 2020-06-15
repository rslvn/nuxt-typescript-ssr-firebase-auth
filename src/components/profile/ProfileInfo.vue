<template>
  <div class="box">

    <b-field :label="$t('common.field.id')" horizontal>
      <span> <small> {{ authUser.userId }} </small></span>
    </b-field>

    <b-field :label="$t('common.field.name')" horizontal>
      <span>{{ authUser.name }}</span>
    </b-field>

    <b-field :label="$t('common.field.surname')" horizontal>
      <span>{{ user.surname }}</span>
    </b-field>

    <b-field :label="$t('common.field.biography')" horizontal>
      <span>{{ user.biography }}</span>
    </b-field>

    <b-field v-if="authUser.email" :label="$t('common.field.email')" horizontal>
      <b-field grouped>
        <span>{{ authUser.email }}</span>
        <b-tooltip v-if="authUser.verified" :label="$t('card.user.mailVerified')">
          <b-icon type="is-success"
                  class="has-margin-left-15"
                  pack="fas"
                  icon="check"/>
        </b-tooltip>

        <b-tooltip v-else :label="$t('card.user.mailNotVerified')">
          <b-icon type="is-warning"
                  class="has-margin-left-15"
                  pack="fas"
                  icon="exclamation-triangle"/>
        </b-tooltip>

      </b-field>
    </b-field>

    <b-field v-if="passwordProvider && !authUser.verified" horizontal>
      <div class="buttons">
        <b-button
          type="is-primary"
          @click="submit"
          :disabled="loading"
        >
          {{ $t('card.user.verifyButton') }}
        </b-button>

        <b-button
          v-if="loading"
          type="is-light"
          disabled="true"
          :loading="loading"
        >
        </b-button>
      </div>
    </b-field>


    <b-field v-if="passwordProvider && authUser.verified" horizontal>
      <div class="buttons">
        <b-button
          type="is-primary"
          @click="showSetPasswordModal"
        >
          {{ $t('card.user.updatePasswordButton') }}
        </b-button>

      </div>
    </b-field>

    <b-field horizontal>
      <div class="buttons">
        <b-button tag="router-link"
                  :to="profileSettingsRoute"
                  type="is-primary"
                  icon-pack="fas"
                  icon-left="user-edit"
                  outlined>
          {{ $t('common.settings') }}
        </b-button>
      </div>
    </b-field>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import {
    LoginCredentials,
    ProviderConfig,
    ProviderType,
    Routes,
    StateNamespace,
    AuthUser,
    SupportedProviders,
    User
  } from '~/types';
  import SetEmailPasswordModal from '~/components/modal/SetEmailPasswordModal.vue';

  @Component({
    components: {}
  })
  export default class ProfileInfo extends Vue {

    @Prop({ required: true }) authUser !: AuthUser
    @Prop({ required: true }) user !: User;

    loading = false;
    profileSettingsRoute = Routes.PROFILE_SETTINGS

    @StateNamespace.notification.Action clearNotificationMessage !: () => void;
    @StateNamespace.auth.Action handleSendingEmailVerificationCode !: () => Promise<void>

    get passwordProvider(): ProviderConfig | undefined {
      return this.authUser.providers.find((providerData) => providerData.providerType === ProviderType.PASSWORD) ?
        SupportedProviders.find(provider => provider.providerType === ProviderType.PASSWORD)
        : undefined
    }

    @StateNamespace.auth.Action updatePassword !: (password: string) => void;

    confirmCredentials(credentials: LoginCredentials) {
      this.updatePassword(credentials.password)
    }

    showSetPasswordModal() {
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

    submit() {
      this.loading = true;
      this.handleSendingEmailVerificationCode()
        .then(() => this.loading = false)
    }

  }
</script>
