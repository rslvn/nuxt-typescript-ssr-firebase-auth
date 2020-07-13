<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <b-field :label="$t('common.field.search')" label-position="on-border" position="is-centered" grouped>
        <b-input
          v-model="syncQuery"
          :loading="isFetching"
          :placeholder="$t('common.field.searchPlaceholder')"
          type="search"
          icon="magnify"
          rounded
          expanded
          @keyup.enter.native="resetSearch"
        />
        <b-button :loading="isFetching" type="is-primary" rounded @click="resetSearch">
          {{ $t('common.search') }}
        </b-button>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class SearchField extends Vue {
  @PropSync('query', { type: String, required: true }) syncQuery: string
  @Prop({ type: Function, required: true }) resetSearch: () => void
  @Prop({ type: Boolean, required: false, default: false }) isFetching: boolean
}
</script>
