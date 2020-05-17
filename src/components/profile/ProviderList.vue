<template>
  <div class="box">

    <b-field v-for="(providerLink, key) in allProviders" :key="key" custom-class="is-medium" horizontal>
      <template slot="label">
        {{providerLink.providerConfig.providerType}}
      </template>
      <Provider :provider-config="providerLink.providerConfig"
                :is-linked="providerLink.linked"
                :link-function="providerLink.method" />
    </b-field>

<!--    <Provider v-for="(providerLink, key) in allProviders" :key="key" :provider-config="providerLink.providerConfig"-->
<!--              :is-linked="providerLink.linked"-->
<!--              :link-function="providerLink.method"-->
<!--              class="has-margin-right-10"-->
<!--    />-->
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import Provider from "~/components/profile/Provider.vue";
  import SetEmailPasswordModal from "~/components/modal/SetEmailPasswordModal.vue";
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
        let linked = this.user.providers.includes(providerConfig.providerType)
        let method = linked ? this.getUnlinkMethod() : this.getLinkMethod(providerConfig.providerType)
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
