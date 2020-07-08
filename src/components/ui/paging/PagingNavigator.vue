<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <b-pagination
        :total="total"
        :current.sync="syncCurrent"
        :per-page="perPage"
        :rounded="pagingConfig.rounded"
        :simple="pagingConfig.simple"
        :range-before="pagingConfig.rangeBefore"
        :range-after="pagingConfig.rangeAfter"
        :order="pagingConfig.order"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'

  @Component({
    components: {}
  })
export default class PagingNavigator extends Vue {
    @PropSync('current', { type: Number, required: true }) syncCurrent : number
    @Prop({ type: Number, required: true }) total : number
    @Prop({ type: Number, required: true }) perPage : number
    @Prop({ type: Function, required: true }) onPageChange : (page: number) => void

    pagingConfig = {
      rangeBefore: 1,
      rangeAfter: 2,
      simple: false,
      rounded: true,
      order: 'is-centered'
    }
  }
</script>
