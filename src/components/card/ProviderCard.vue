<template>
  <div class="box has-text-centered">
    <b-field :label="getProviderLabel(providerConfig.providerType)" horizontal>
      <b-tooltip
        :label="getTooltip(providerConfig.providerType)"
        :type="isLinked ? 'is-light': 'is-success'"
        class="has-margin-top-10 has-margin-bottom-15 is-fullwidth"
        multilined
      >
        <b-button
          :type="isLinked ? providerConfig.colorType: defaultType"
          :icon-pack="providerConfig.iconPack"
          :class="isLinked ? '' : 'has-text-black'"
          :icon-right="providerConfig.icon"
          outlined
          expanded
          @click="submit"
        >
          <span
            class="has-margin-right-5"
          > {{ isLinked ? $t('provider.submit.unlink') : $t('provider.submit.link') }}
          </span>
        </b-button>
      </b-tooltip>
    </b-field>

    <template v-if="providerData">
      <b-field :label="$t('common.field.id')" horizontal>
        <span> <small> {{ providerData.uid }} </small> </span>
      </b-field>

      <b-field :label="$t('common.field.photo')" horizontal>
        <BackgroundSquareImage :image-url="imageUrl" size="64" auto-margin="true" />
      </b-field>

      <b-field :label="$t('common.field.name')" horizontal>
        <span>{{ providerData.displayName }}</span>
      </b-field>

      <b-field :label="$t('common.field.email')" horizontal>
        <span>{{ providerData.email }}</span>
      </b-field>

      <b-field v-if="providerData.phoneNumber" :label="$t('common.field.phone')" horizontal>
        <span>{{ providerData.phoneNumber }}</span>
      </b-field>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { DefaultProfilePhoto, ProviderConfig, ProviderData, ProviderType } from '~/types'
import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue'

@Component({
  components: { BackgroundSquareImage }
})
export default class ProviderCard extends Vue {
  defaultType = 'is-light';

  @Prop({ type: Object, required: true }) providerConfig: ProviderConfig;
  @Prop({ type: Boolean, required: true }) isLinked: boolean;
  @Prop({ type: Function, required: true }) linkFunction: (providerType: ProviderType) => void;
  @Prop({ type: Object, required: false }) providerData: ProviderData;

  submit () {
    if (!this.isLinked) {
      this.linkFunction(this.providerConfig.providerType)
      return
    }

    const provider = this.providerConfig.providerType.replace('.com', '')

    this.$buefy.dialog.confirm({
      title: this.$t('provider.dialog.delete.title', { provider }) + '',
      message: this.$t('provider.dialog.delete.message', { provider }) + '',
      confirmText: this.$t('provider.dialog.delete.confirm') + '',
      cancelText: this.$t('common.cancel') + '',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => this.linkFunction(this.providerConfig.providerType)
    })
  }

  getTooltip (providerType: ProviderType) {
    const provider = providerType.replace('.com', '')
    return this.isLinked
      ? this.$t('provider.tooltip.linkedProvider', { provider })
      : this.$t('provider.tooltip.unlinkedProvider', { provider })
  }

  getProviderLabel (providerType: ProviderType) {
    return this.$t('provider.label.' + providerType)
  }

  get imageUrl () {
    return this.providerData.photoURL || DefaultProfilePhoto.src
  }
}
</script>
