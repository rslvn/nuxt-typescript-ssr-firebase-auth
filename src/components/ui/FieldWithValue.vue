<template>
  <nav class="level is-mobile">
    <div class="level-left has-margin-left-5">
      <p class="level-item">
        <strong>{{ label }}:</strong>
      </p>
    </div>

    <div class="level-right">
      <p class="level-item">
        {{ value }}
      </p>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class FieldWithValue extends Vue {
  @Prop({ type: String, required: true, default: '' }) readonly label: string;
  @Prop({ required: false, default: '' }) readonly value: any;
}
</script>
