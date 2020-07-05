<template>
  <div class="columns is-centered is-multiline">
    <div class="column is-full">
      <PagingConfig :total="total" :per-page.sync="syncPerPage"/>
    </div>

    <div class="column is-full">
      <PagingNavigator :current.sync="syncCurrent" :total="total" :per-page="syncPerPage"
                       :on-page-change="onPageChange"/>
    </div>

    <div class="column is-half">
      <slot name="searchResult"/>
    </div>

    <div class="column is-full">
      <PagingNavigator :current.sync="syncCurrent" :total="total" :per-page="syncPerPage"
                       :on-page-change="onPageChange"/>
    </div>

    <b-loading :is-full-page="false" :active.sync="isFetching" :can-cancel="false"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator';
  import PagingConfig from './PagingConfig.vue';
  import PagingNavigator from './PagingNavigator.vue';

  @Component({
    components: { PagingNavigator, PagingConfig }
  })
  export default class Paging extends Vue {

    @Prop({ type: Number, required: true }) total !: number
    @Prop({ type: Function, required: true }) onPageChange !: (page: number) => void
    @PropSync('perPage', { type: Number, required: true }) syncPerPage !: number
    @PropSync('current', { type: Number, required: true }) syncCurrent !: number
    @Prop({ type: Boolean, required: false, default: false }) isFetching !: boolean

  }
</script>
