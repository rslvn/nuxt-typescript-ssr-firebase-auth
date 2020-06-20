<template>
  <b-field
    :type="type"
    :horizontal="horizontal"
    :label="$attrs.label"
    :label-position="labelPosition"
  >
    <b-input
      :disabled="disabled"
      :value="value"
      type="text"
    />
  </b-field>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';

  @Component({
    components: {}
  })
  export default class FieldWithValue extends Vue {
    @Prop({ type: String, required: true, default: '' }) value !: any;
    @Prop({ type: String, required: false, default: 'text' }) type !: string;
    @Prop({ type: String, required: false, default: '' }) labelPosition !: string;
    @Prop({ type: Boolean, required: false, default: false }) horizontal !: boolean;
    @Prop({ type: Boolean, required: false, default: false }) disabled !: boolean;

  }
</script>
