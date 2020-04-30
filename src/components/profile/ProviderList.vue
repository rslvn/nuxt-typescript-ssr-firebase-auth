<template>
  <div>
    <Provider v-for="(providerLink, key) in allProviders" :key="key" :provider-config="providerLink.providerConfig"
              :is-linked="providerLink.linked"
              :link-function="providerLink.method"
              class="has-margin-right-10"
    />

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import Provider from "~/components/profile/Provider.vue";
  import {
    LoginCredentials,
    ProviderConfig,
    ProviderLink,
    ProviderType,
    StateNamespace,
    StoredUser,
    SupportedProviders
  } from "~/types";
  import { showWarningToaster } from "~/service/notification-service";
  import SetPasswordForm from "~/components/form/SetPasswordForm.vue";
  import SocialLogin from "~/components/form/SocialLogin.vue";
  import SetEmailPasswordModal from "~/components/modal/SetEmailPasswordModal.vue";

  @Component({
    components: { SocialLogin, SetPasswordForm, Provider }
  })
  export default class ProviderList extends Vue {

    @Prop({ type: Object, required: true }) user !: StoredUser;

    @StateNamespace.auth.Action linkPassword !: (credentials: LoginCredentials) => Promise<void>;
    @StateNamespace.auth.Action linkGoogle !: () => Promise<void>;
    @StateNamespace.auth.Action linkTwitter !: () => Promise<void>;
    @StateNamespace.auth.Action linkFacebook !: () => Promise<void>;

    @StateNamespace.auth.Action unlinkPassword !: () => Promise<void>;
    @StateNamespace.auth.Action unlinkGoogle !: () => Promise<void>;
    @StateNamespace.auth.Action unlinkTwitter !: () => Promise<void>;
    @StateNamespace.auth.Action unlinkFacebook !: () => Promise<void>;

    get allProviders(): ProviderLink[] {
      return SupportedProviders.map(providerConfig => {
        let linked = this.user.providers.includes(providerConfig.providerType)
        let method = linked ? this.getUnlinkMethod(providerConfig.providerType) : this.getLinkMethod(providerConfig.providerType)
        return {
          providerConfig,
          linked,
          method
        }
      })
    }

    get linkedProviders(): ProviderConfig[] {
      return SupportedProviders.filter(provider => this.user.providers.includes(provider.providerType))
    }

    get unlinkedProviders(): ProviderConfig[] {
      return SupportedProviders.filter(provider => !this.user.providers.includes(provider.providerType));
    }

    isLinked(providerType: ProviderType): boolean {
      return this.user.providers.includes(providerType)
    }

    getLinkMethod(providerType: ProviderType) {
      switch (providerType) {
        case ProviderType.password:
          return this.showLinkPasswordModal;
        case ProviderType.google:
          return this.linkGoogle;
        case ProviderType.twitter:
          return this.linkTwitter;
        case ProviderType.facebook:
          return this.linkFacebook;
      }
    }

    getUnlinkMethod(providerType: ProviderType) {
      if (this.linkedProviders.length <= 1) {
        return this.showWarning
      }

      switch (providerType) {
        case ProviderType.password:
          return this.unlinkPassword;
        case ProviderType.google:
          return this.unlinkGoogle;
        case ProviderType.twitter:
          return this.unlinkTwitter;
        case ProviderType.facebook:
          return this.unlinkFacebook;
      }
    }

    showWarning() {
      showWarningToaster(this.$i18n.t('notification.unlinkNotAllowed', {
          provider: this.linkedProviders[0].providerType.replace('.com', '')
        }
      ))
    }

    confirmCredentials(credentials: LoginCredentials) {
      this.linkPassword(credentials)
    }

    showLinkPasswordModal() {
      this.$buefy.modal.open({
        parent: this,
        component: SetEmailPasswordModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          user: this.user,
          linkedProviders: this.linkedProviders,
          confirmCredentials: this.confirmCredentials
        }
      })
    }

  }
</script>
