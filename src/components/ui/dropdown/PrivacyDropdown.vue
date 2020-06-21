<template>
  <ValidationProvider
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
    v-slot="{ errors, valid }"
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
      <b-dropdown :value="value" @input="input" aria-role="list" class="has-margin-top-10">
        <b-button v-if="selectedPrivacyType" slot="trigger" :class="selectedPrivacyType.type" :outlined="!value">
          <b-icon :icon="selectedPrivacyType.icon" class="has-margin-left-5"/>
          <span class="has-margin-left-5">{{$t(`privacy.${selectedPrivacyType.privacyType}.title`)}}</span>
          <b-icon icon="menu-down"></b-icon>
        </b-button>

        <b-button v-else slot="trigger" class="is-primary" :outlined="!value">
          <b-icon icon="account-remove-outline" class="has-margin-left-5"/>
          <span class="has-margin-left-5">{{$t(`privacy.notSelected`)}}</span>
          <b-icon icon="menu-down"></b-icon>
        </b-button>

        <b-dropdown-item v-for="(privacy, index) in privacyList"
                         :key="index"
                         :value="privacy.privacyType"
                         aria-role="listitem">
          <div class="media" :class="privacy.type">
            <b-icon class="media-left" :icon="privacy.icon"></b-icon>
            <div class="media-content">
              <h3>{{$t(`privacy.${privacy.privacyType}.title`)}}</h3>
              <h4>{{$t(`privacy.${privacy.privacyType}.subtitle`)}}</h4>
              <small>{{$t(`privacy.${privacy.privacyType}.description`)}}</small>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
      <small v-if="value" class="has-margin-top-5 has-margin-left-5">{{$t(`privacy.${value}.description`)}}</small>
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
  import { Component, Emit, Model, Prop, Vue } from 'nuxt-property-decorator';
  import { PrivacyList, PrivacyType } from '~/types';
  import { ValidationProvider } from 'vee-validate';

  @Component({
    components: { ValidationProvider }
  })
  export default class PrivacyDropdown extends Vue {

    @Model('input', { required: true }) readonly value!: PrivacyType;

    @Prop({ type: String, required: true }) vid !: string;
    @Prop({ type: String, required: true }) rules !: string;
    @Prop({ type: Boolean, required: false, default: false }) horizontal !: boolean;
    @Prop({ type: Boolean, required: false, default: false }) disabled !: boolean;
    @Prop({ type: String, required: false, default: '' }) labelPosition !: string;

    @Emit()
    input(newValue: PrivacyType) {
      return newValue
    }

    get selectedPrivacyType() {
      return PrivacyList.find(value => value.privacyType === this.value)
    }

    get privacyList() {
      return PrivacyList
    }

  }

</script>