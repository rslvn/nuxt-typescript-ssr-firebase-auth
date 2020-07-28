<template>
  <div class="columns is-multiline is-centered">
    <div class="column is-half">
      <ProviderCard
        v-for="(providerLink, key) in allProviders"
        :key="key"
        :provider-config="providerLink.providerConfig"
        :provider-data="providerLink.providerData"
        :is-linked="providerLink.linked"
        :link-function="providerLink.linkMethod"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { ProviderData, ProviderType } from 'types-module'
import ProviderCard from '~/components/card/ProviderCard.vue'
import SetEmailPasswordModal from '~/components/modal/SetEmailPasswordModal.vue'
import { LoginCredentials, ProviderConfig, ProviderLink, StateNamespace, SupportedProviders } from '~/types'
import { showWarningToaster } from '~/service/notification-service'
import { getProviderOption } from '~/service/firebase/firebase-service'
import BaseModule from '~/mixin/BaseModule'

@Component({
  components: { ProviderCard }
})
export default class LinkedAccounts extends BaseModule {
  @StateNamespace.auth.Action linkPassword: (credentials: LoginCredentials) => Promise<void>;
  @StateNamespace.auth.Action linkSocialProvider: () => Promise<void>;
  @StateNamespace.auth.Action unlinkProvider: () => Promise<void>;

  get allProviders (): ProviderLink[] {
    return SupportedProviders.map((providerConfig) => {
      const providerData = this.authUser.providers.find((data: ProviderData) => providerConfig.providerType === data.providerType)
      const linked = !!providerData
      const linkMethod = linked ? this.getUnlinkMethod() : this.getLinkMethod(providerConfig.providerType)
      return {
        providerConfig,
        providerData,
        linked,
        linkMethod
      }
    })
  }

  get linkedProviders (): ProviderConfig[] {
    return SupportedProviders.filter(provider => this.isLinked(provider.providerType))
  }

  get unlinkedProviders (): ProviderConfig[] {
    return SupportedProviders.filter(provider => !this.isLinked(provider.providerType))
  }

  isLinked (providerType: ProviderType): boolean {
    return !!this.authUser.providers.find((providerData: ProviderData) => providerData.providerType === providerType)
  }

  getProviderLabel (providerType: ProviderType) {
    return this.$t(`provider.label.${providerType}`)
  }

  getLinkMethod (providerType: ProviderType) {
    return providerType === ProviderType.PASSWORD ? this.showLinkPasswordModal : this.linkSocialProvider
  }

  getUnlinkMethod () {
    if (this.linkedProviders.length <= 1) {
      return this.showWarning
    }
    return this.unlinkProvider
  }

  showWarning () {
    showWarningToaster(
      this.$i18n.t('notification.unlinkNotAllowed', getProviderOption(this.linkedProviders[0].providerType))
    )
  }

  confirmCredentials (credentials: LoginCredentials) {
    this.linkPassword(credentials)
  }

  showLinkPasswordModal () {
    this.$buefy.modal.open({
      parent: this,
      component: SetEmailPasswordModal,
      hasModalCard: true,
      customClass: 'custom-class custom-class-2',
      trapFocus: true,
      props: {
        authUser: this.authUser,
        linkedProviders: this.linkedProviders,
        confirmCredentials: this.confirmCredentials
      }
    })
  }
}
</script>
