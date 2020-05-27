<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{title}}</h3>
    <div class="box">

      <RememberMe v-if="showRememberMe" :value="rememberMe"/>

      <div class="buttons">
        <b-button v-for="provider in providers" :key="provider.providerType" :type="provider.colorType"
                  :icon-left="provider.icon"
                  expanded outlined
                  @click="submit(provider.providerType)">
          {{ $t('form.social.loginWith',getLangProviderOption(provider.providerType)) }}
        </b-button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ProviderConfig, ProviderType, SocialLoginCredentials, StateNamespace } from "~/types";
  import { getProviderOption } from "~/service/firebase/firebase-service";
  import RememberMe from "~/components/ui/RememberMe.vue";

  @Component({
    components: { RememberMe }
  })
  export default class SocialLogin extends Vue {

    @Prop({ type: String, required: true }) title !: string
    @Prop({ type: Boolean, required: true }) rememberMe !: boolean
    @Prop({ type: Array, required: true }) providers !: ProviderConfig[]
    @Prop({ type: Function, required: true }) callback !: () => void
    @Prop({ type: Boolean, required: true }) reauthenticate !: boolean
    @Prop({ type: Boolean, default: true }) showRememberMe !: boolean

    @StateNamespace.auth.Action signInWithSocialProvider !: (credentials: SocialLoginCredentials) => void;
    @StateNamespace.auth.Action reauthenticateWithSocialProvider !: (credentials: SocialLoginCredentials) => void;

    get providerType() {
      return ProviderType
    }

    isProviderExist(providerType: ProviderType) {
      return this.providers.find(value => value.providerType === providerType)
    }

    getLangProviderOption(providerType: ProviderType) {
      return getProviderOption(providerType)
    }

    getSocialLoginCredentials(providerType: ProviderType): SocialLoginCredentials {
      return {
        providerType,
        rememberMe: this.rememberMe,
        callback: this.callback
      }
    }

    submit(providerType: ProviderType) {
      return this.reauthenticate ?
        this.reauthenticateWithSocialProvider(this.getSocialLoginCredentials(providerType)) :
        this.signInWithSocialProvider(this.getSocialLoginCredentials(providerType));
    }

  }
</script>
