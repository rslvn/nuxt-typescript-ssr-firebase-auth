<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
    validate="input"
  >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
      :horizontal="horizontal"
      :label="$attrs.label"
      :label-position="labelPosition"
    >
      <b-dropdown :value="value" aria-role="list" class="has-margin-top-10" @input="input">
        <b-button v-if="selectedPrivacyType" slot="trigger" :class="selectedPrivacyType.type" :outlined="!value">
          <b-icon :icon="selectedPrivacyType.icon" class="has-margin-left-5" />
          <span
            class="has-margin-left-5"
          >{{ $t(`privacy.${privacyFor}.${selectedPrivacyType.privacyType}.title`) }}</span>
          <b-icon icon="menu-down" />
        </b-button>

        <b-button v-else slot="trigger" class="is-primary" :outlined="!value">
          <b-icon icon="account-lock-outline" class="has-margin-left-5" />
          <span class="has-margin-left-5">{{ $t(`privacy.${privacyFor}.notSelected`) }}</span>
          <b-icon icon="menu-down" />
        </b-button>

        <b-dropdown-item v-for="(privacy, index) in privacyList"
                         :key="index"
                         :value="privacy.privacyType"
                         aria-role="listitem"
        >
          <div class="media" :class="privacy.type">
            <b-icon class="media-left" :icon="privacy.icon" />
            <div class="media-content">
              <h3>{{ $t(`privacy.${privacyFor}.${privacy.privacyType}.title`) }}</h3>
              <h4>{{ $t(`privacy.${privacyFor}.${privacy.privacyType}.subtitle`) }}</h4>
              <small>{{ $t(`privacy.${privacyFor}.${privacy.privacyType}.description`) }}</small>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
      <small v-if="value" class="has-margin-top-5 has-margin-left-5">
        {{ $t(`privacy.${privacyFor}.${value}.description`) }}
      </small>
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { PrivacyType } from 'common-types'
import { PrivacyConfigList } from '~/types'

@Component({
  components: { ValidationProvider }
})
export default class PrivacyDropdown extends Vue {
  @Model('input', { required: true }) readonly value: PrivacyType;

  @Prop({ type: String, required: true }) vid: string;
  @Prop({ type: String, required: true }) rules: string;
  @Prop({ type: String, required: true }) privacyFor: string;
  @Prop({ type: Boolean, required: false, default: false }) horizontal: boolean;
  @Prop({ type: Boolean, required: false, default: false }) disabled: boolean;
  @Prop({ type: String, required: false, default: '' }) labelPosition: string;

  @Emit()
  input (newValue: PrivacyType) {
    return newValue
  }

  get selectedPrivacyType () {
    return PrivacyConfigList.find(value => value.privacyType === this.value)
  }

  get privacyList () {
    return PrivacyConfigList
  }

  get label () {
    return this.$t(`privacy.${this.privacyFor}.field`)
  }
}

</script>
