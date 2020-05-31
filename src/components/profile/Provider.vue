<template>
  <div class="box">
    <div class="has-text-centered">
      <h3> {{ getProviderLabel(providerConfig.providerType) }} </h3>
      <b-tooltip
        :label="getTooltip(providerConfig.providerType)"
        :type="isLinked ? 'is-light': 'is-success'"
        class="has-margin-top-10 has-margin-bottom-15 is-fullwidth"
        multilined>

        <b-button :type="isLinked ? providerConfig.colorType: defaultType" :icon-pack="providerConfig.iconPack"
                  :class="isLinked ? '' : 'has-text-black'"
                  :icon-right="providerConfig.icon" @click="submit" outlined expanded>
        <span
          class="has-margin-right-5"> {{ isLinked ? $t('provider.submit.unlink') : $t('provider.submit.link') }}
        </span>
        </b-button>
      </b-tooltip>
    </div>
    <ProviderInfo v-if="providerData" :provider-data="providerData"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ProviderConfig, ProviderData, ProviderType } from '~/types';
  import ProviderInfo from '~/components/profile/ProviderInfo.vue';

  @Component({
    components: { ProviderInfo }
  })
  export default class Provider extends Vue {

    defaultType = 'is-light';

    @Prop({ type: Object, required: true }) providerConfig !: ProviderConfig;
    @Prop({ type: Boolean, required: true }) isLinked !: boolean;
    @Prop({ type: Function, required: true }) linkFunction !: (providerType: ProviderType) => void;
    @Prop({ type: Object, required: false }) providerData !: ProviderData;

    submit() {
      if (!this.isLinked) {
        this.linkFunction(this.providerConfig.providerType);
        return;
      }

      let provider = this.providerConfig.providerType.replace('.com', '')

      this.$buefy.dialog.confirm({
        title: this.$t('provider.dialog.delete.title', { provider }) as string,
        message: this.$t('provider.dialog.delete.message', { provider }) as string,
        confirmText: this.$t('provider.dialog.delete.confirm') as string,
        cancelText: this.$t('common.cancel') as string,
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.linkFunction(this.providerConfig.providerType)
      })
    }

    getTooltip(providerType: ProviderType) {
      let provider = providerType.replace('.com', '');
      return this.isLinked ?
        this.$t('provider.tooltip.linkedProvider', { provider }) :
        this.$t('provider.tooltip.unlinkedProvider', { provider });
    }

    getProviderLabel(providerType: ProviderType) {
      return this.$t('provider.label.' + providerType)
    }

  }
</script>
