<template>

  <b-tooltip
    :label="getLabel(providerConfig.providerType)"
    :type="isLinked ? 'is-light': 'is-success'"
    multilined>

    <b-button :type="isLinked ? providerConfig.colorType: defaultType" :icon-pack="providerConfig.iconPack"
              :class="isLinked ? '': 'has-text-black'"
              :icon-left="providerConfig.icon" @click="submit" size="is-small" outlined>
    </b-button>
  </b-tooltip>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ProviderConfig, ProviderType } from "~/types";

  @Component({
    components: {}
  })
  export default class Provider extends Vue {

    defaultType = 'is-light';

    @Prop({ type: Object }) providerConfig !: ProviderConfig;
    @Prop({ type: Boolean, required: true }) isLinked !: boolean;
    @Prop({ type: Function, required: true }) linkFunction !: () => void;

    submit() {
      if (!this.isLinked) {
        this.linkFunction();
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
        onConfirm: () => this.linkFunction()
      })
    }

    getLabel(providerType: ProviderType) {
      let provider = providerType.replace('.com', '');
      return this.isLinked ?
        this.$t('provider.tooltip.linkedProvider', { provider }) :
        this.$t('provider.tooltip.unlinkedProvider', { provider });
    }

  }
</script>
