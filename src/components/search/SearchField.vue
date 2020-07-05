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
          @keyup.enter.native="resetSearch"
          rounded
          expanded
        />
        <b-button @click="resetSearch" :loading="isFetching" type="is-primary" rounded>{{$t('common.search')}}
        </b-button>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator';

  @Component({
    components: {}
  })
  export default class SearchField extends Vue {

    @PropSync('query', { type: String, required: true }) syncQuery !: string
    @Prop({ type: Function, required: true }) resetSearch !: () => void
    @Prop({ type: Boolean, required: false, default: false }) isFetching !: boolean
  }
</script>
