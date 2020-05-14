<template>
  <section v-if="loading">
    <div class="container is-fullhd">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <b-skeleton active></b-skeleton>
                  <b-skeleton height="80px"></b-skeleton>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { StateNamespace } from "~/types";

  @Component({
    components: {}
  })
  export default class extends Vue {
    @StateNamespace.loading.Getter loading !: boolean
    @StateNamespace.loading.Action saveLoading !: (loading: boolean) => Promise<void>

    start() {
      console.log('loading.start')
      this.saveLoading(true)
    }

    finish() {
      console.log('loading.finish')
      this.saveLoading(false)
    }

    fail(error: Error) {
      console.log('loading.error', error)
    }

    increase(num: Number) {
      console.log('loading.num: ', num)
    }
  }
</script>

