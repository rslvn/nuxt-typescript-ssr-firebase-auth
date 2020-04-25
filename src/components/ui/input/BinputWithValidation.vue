<template>
  <ValidationProvider
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
    v-slot="{ errors, valid }"
    validate="blur"
  >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
      :horizontal="horizontal"
      :label="$attrs.label"
    >
      <b-input
        :type="inputType"
        :value="value"
        v-bind="$attrs"
        :placeholder="placeholder"
        @input="input"
        :password-reveal="inputType === 'password'"
      />
    </b-field>

  </ValidationProvider>
</template>

<script lang="ts">
  import { Component, Emit, Model, Prop, Vue } from 'nuxt-property-decorator';
  import { ValidationProvider } from "vee-validate";

  @Component({
    components: { ValidationProvider }
  })
  export default class BInputWithValidation extends Vue {
    @Prop({ type: String, required: true }) vid !: string;
    @Prop({ type: String, required: true }) rules !: string;
    @Prop({ type: String, required: false, default: 'text' }) inputType !: string;
    @Prop({ type: String, required: false, default: 'some@domain.com' }) placeholder !: string;
    @Prop({ type: Boolean, required: false, default: false }) horizontal !: boolean;

    @Model('input', { required: true }) readonly value!: any;

    @Emit()
    input(newValue: any) {
      return newValue
    }

  }
</script>
