<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <b-field class="is-pulled-left">
        <b-taglist attached>
          <b-tag type="is-primary">
            {{ $t('page.search.config.total') }}
          </b-tag>
          <b-tag type="is-light" class="has-background-grey-lighter">
            {{ total }}
          </b-tag>
        </b-taglist>
      </b-field>
      <b-field
        :label="$t('page.search.config.perPage')"
        label-position="on-border"
        class="is-pulled-right"
        custom-class="is-small"
      >
        <b-select v-model="syncPerPage" size="is-small">
          <option v-for="(perPageValue,index) in perPageConfig" :key="index" :value="perPageValue">
            {{ perPageValue }}
          </option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class PagingConfig extends Vue {
  @Prop({ type: Number, required: true }) total: number
  @PropSync('perPage', { type: Number, required: true }) syncPerPage: number

  perPageConfig = [
    5,
    10,
    20,
    50
  ]
}
</script>
