<template>
  <div class="field">
    <b-checkbox :value="value" @input="inputChanged">
      {{ $t('common.field.rememberMe') }}
    </b-checkbox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { StateNamespace } from '~/types'

@Component({
  components: {}
})
export default class RememberMe extends Vue {
  @Prop({ type: Boolean, required: true }) value: boolean

  @StateNamespace.auth.Action saveRememberMe: (rememberMe: boolean) => void;

  inputChanged () {
    this.saveRememberMe(!this.value)
  }
}
</script>
