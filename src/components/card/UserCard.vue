<template>

  <div>
    <table class="table">
      <thead>
      <tr>
        <th colspan="1"></th>
        <th colspan="2"></th>
      </tr>
      <tr>
        <td>{{ $t('card.user.userId')}}</td>
        <td>{{user.userId }}</td>
      </tr>
      <tr>
        <td>{{ $t('card.user.name')}}</td>
        <td>{{user.name}}</td>
      </tr>
      <tr>
        <td>{{ $t('card.user.providers')}}</td>
        <td>
          <ProviderList :user="user"/>
        </td>
      </tr>

      <tr v-if="user.email">
        <td>{{ $t('card.user.email')}}</td>
        <td>{{ user.email }}
          <b-icon
            v-if="user.verified"
            type="is-success"
            class="has-margin-left-10"
            pack="fas"
            icon="check"
            size="is-small">
          </b-icon>

          <b-icon
            v-else
            type="'is-warning"
            class="ml2"
            pack="fas"
            icon="exclamation-triangle"
            size="is-small">
          </b-icon>
        </td>
      </tr>
      </thead>
    </table>
    <br>
    <div v-if="user.email && !user.verified" class="buttons">
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
    <div v-if="!!passwordProvider" class="buttons">
      <b-button
        type="is-primary"
        @click="showSetPasswordModal"
      >
        {{ $t('card.user.updatePasswordButton') }}
      </b-button>

    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import {
    LoginCredentials,
    ProviderConfig,
    ProviderType,
    StateNamespace,
    StoredUser,
    SupportedProviders
  } from "~/types";
  import ProviderList from "~/components/profile/ProviderList.vue";
  import SetEmailPasswordModal from "~/components/modal/SetEmailPasswordModal.vue";

  @Component({
    components: { ProviderList }
  })
  export default class UserCard extends Vue {

    loading = false;

    @Prop({ required: true }) user !: StoredUser

    @StateNamespace.auth.Action handleSendingEmailVerificationCode !: () => Promise<void>
    @StateNamespace.auth.Action updatePassword !: (password: string) => void;

    get passwordProvider(): ProviderConfig | undefined {
      return this.user.providers.includes(ProviderType.password) ?
        SupportedProviders.find(provider => provider.providerType === ProviderType.password)
        : undefined
    }

    submit() {
      this.loading = true;
      this.handleSendingEmailVerificationCode()
        .then(() => this.loading = false)
    }

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
        props: {
          user: this.user,
          linkedProviders: [this.passwordProvider],
          confirmCredentials: this.confirmCredentials
        }
      })
    }

  }
</script>
