<template>
  <div class="columns is-centered">
    <div class="column">
      <b-field class="is-pulled-left">
        <b-taglist attached>
          <b-tag type="is-primary" size="is-medium">{{$t('page.search.config.total')}}</b-tag>
          <b-tag type="is-light" size="is-medium" class="has-background-grey-lighter">{{total}}</b-tag>
        </b-taglist>
      </b-field>
      <b-field :label="$t('page.search.config.perPage')" label-position="on-border" class="is-pulled-right">
        <b-select v-model="syncPerPage">
          <option v-for="(pp,index) in perPageConfig" :key="index" :value="pp">{{pp}}</option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator';

  @Component({
    components: {}
  })
  export default class SearchConfig extends Vue {
    @Prop({ type: Number, required: true }) total !: number
    @PropSync('perPage', { type: Number, required: true }) syncPerPage !: number

    perPageConfig = [
      5,
      10,
      20,
      50
    ]

  }
</script>
