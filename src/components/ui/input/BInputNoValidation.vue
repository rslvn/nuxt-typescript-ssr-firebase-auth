<template>
  <b-field
    :type="type"
    :horizontal="horizontal"
    :label="$attrs.label"
    :label-position="labelPosition"
  >
    <b-input
      :type="inputType"
      :value="value"
      :placeholder="placeholder"
      :password-reveal="inputType === 'password'"
      :disabled="disabled"
      @input="input"
    />
  </b-field>

</template>

<script lang="ts">
  import { Component, Emit, Model, Prop, Vue } from 'nuxt-property-decorator';

  @Component({
    components: {}
  })
  export default class BInputWithNoValidation extends Vue {
    @Prop({ type: String, required: false, default: '' }) type !: string;
    @Prop({ type: String, required: false, default: 'text' }) inputType !: string;
    @Prop({ type: String, required: false, default: '' }) labelPosition !: string;
    @Prop({ type: String, required: false, default: 'some@domain.com' }) placeholder !: string;
    @Prop({ type: Boolean, required: false, default: false }) horizontal !: boolean;
    @Prop({ type: Boolean, required: false, default: false }) disabled !: boolean;

    @Model('input', { required: true }) readonly value!: any;

    @Emit()
    input(newValue: any) {
      return newValue
    }

  }
</script>
