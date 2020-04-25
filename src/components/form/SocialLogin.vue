<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{title}}</h3>
    <div class="box">

      <client-only>
        <div class="buttons">
          <b-button v-if="isProviderExist(providerType.google)" type="is-danger" icon-left="google" outlined
                    @click="signInWithGoogle(callback)" expanded>
            {{ $t('form.social.google') }}
          </b-button>
          <b-button v-if="isProviderExist(providerType.twitter)" type="is-info" icon-left="twitter" outlined
                    @click="signInWithTwitter(callback)" expanded>
            {{ $t('form.social.twitter') }}
          </b-button>
          <b-button v-if="isProviderExist(providerType.facebook)" type="is-link" icon-left="facebook" outlined
                    @click="signInWithFacebook(callback)" expanded>
            {{ $t('form.social.facebook') }}
          </b-button>
        </div>
      </client-only>

    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ProviderConfig, ProviderType, StateNamespace } from "~/lib/types";

  @Component({
    components: {}
  })
  export default class SocialLogin extends Vue {

    @Prop({ type: String, required: true }) title !: string
    @Prop({ type: Array, required: true }) providers !: ProviderConfig[]
    @Prop({ type: Function, required: true }) callback !: () => void

    @StateNamespace.auth.Action signInWithGoogle !: () => void;
    @StateNamespace.auth.Action signInWithTwitter !: () => void;
    @StateNamespace.auth.Action signInWithFacebook !: () => void;

    get providerType() {
      return ProviderType
    }

    isProviderExist(providerType: ProviderType) {
      return this.providers.find(value => value.providerType === providerType)
    }

  }
</script>
