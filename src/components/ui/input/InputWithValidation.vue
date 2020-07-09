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
      <b-input
        v-bind="$attrs"
        :type="inputType"
        :value="value"
        :placeholder="placeholder"
        :password-reveal="inputType === 'password'"
        :disabled="disabled"
        @input="input"
      />
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'

@Component({
  components: { ValidationProvider }
})
export default class InputWithValidation extends Vue {
  @Prop({ type: String, required: true }) vid: string;
  @Prop({ type: String, required: true }) rules: string;
  @Prop({ type: String, required: false, default: 'text' }) inputType: string;
  @Prop({ type: String, required: false, default: '' }) labelPosition: string;
  @Prop({ type: String, required: false, default: 'some@domain.com' }) placeholder: string;
  @Prop({ type: Boolean, required: false, default: false }) horizontal: boolean;
  @Prop({ type: Boolean, required: false, default: false }) disabled: boolean;

  @Model('input', { required: true }) readonly value: any;

  @Emit()
  input (newValue: any) {
    return newValue
  }
}
</script>
