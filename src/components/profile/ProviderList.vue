<template>
  <div class="box">

    <b-field v-for="(providerLink, key) in allProviders" :key="key" :label="providerLink.providerConfig.providerType"
             custom-class="is-medium" horizontal>
      <Provider :provider-config="providerLink.providerConfig"
                :provider-data="providerLink.providerData"
                :is-linked="providerLink.linked"
                :link-function="providerLink.method"
      />
    </b-field>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import Provider from "~/components/profile/Provider.vue";
  import SetEmailPasswordModal from "~/components/modal/SetEmailPasswordModal.vue";
  import {
    LoginCredentials,
    ProviderConfig,
    ProviderData,
    ProviderLink,
    ProviderType,
    StateNamespace,
    StoredUser,
    SupportedProviders
  } from "~/types";
  import { showWarningToaster } from "~/service/notification-service";
  import { getProviderOption } from "~/service/firebase-service";

  @Component({
    components: { Provider }
  })
  export default class ProviderList extends Vue {

    @Prop({ type: Object, required: true }) user !: StoredUser;

    @StateNamespace.auth.Action linkPassword !: (credentials: LoginCredentials) => Promise<void>;
    @StateNamespace.auth.Action linkSocialProvider !: () => Promise<void>;
    @StateNamespace.auth.Action unlinkProvider !: () => Promise<void>;

    get allProviders(): ProviderLink[] {
      return SupportedProviders.map(providerConfig => {
        let providerData = this.user.providers.find((data: ProviderData) => providerConfig.providerType === data.providerType);
        let linked = !!providerData
        let method = linked ? this.getUnlinkMethod() : this.getLinkMethod(providerConfig.providerType)
        return {
          providerConfig,
          providerData,
          linked,
          method
        }
      })
    }

    get linkedProviders(): ProviderConfig[] {
      return SupportedProviders.filter(provider => this.isLinked(provider.providerType))
    }

    get unlinkedProviders(): ProviderConfig[] {
      return SupportedProviders.filter(provider => !this.isLinked(provider.providerType));
    }

    isLinked(providerType: ProviderType): boolean {
      return !!this.user.providers.find((providerData) => providerData.providerType === providerType)
    }

    getLinkMethod(providerType: ProviderType) {
      return providerType === ProviderType.password ? this.showLinkPasswordModal : this.linkSocialProvider
    }

    getUnlinkMethod() {
      if (this.linkedProviders.length <= 1) {
        return this.showWarning
      }
      return this.unlinkProvider
    }

    showWarning() {
      showWarningToaster(
        this.$i18n.t('notification.unlinkNotAllowed', getProviderOption(this.linkedProviders[0].providerType))
      )
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
