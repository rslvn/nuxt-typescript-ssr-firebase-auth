<template>
  <!--  <div v-if="loading" class="has-text-centered">-->
  <!--    LOADING... please wait-->
  <!--  </div>-->

  <!--  <div v-else>-->

  <div>
    <section class="section">
      <div class="container is-fullhd">
        <div class="columns is-centered">
          <div class="column is-three-quarters">
            <client-only>
              <TopNavbar/>
            </client-only>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-fullhd">
        <div class="columns is-centered">
          <div class="column is-three-quarters">
            <TopNotification v-if="getMessage" :notification-message="getMessage"/>
            <nuxt/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator'
  import TopNavbar from '../components/shared/TopNavbar.vue'
  import TopNotification from '~/components/notification/TopNotification.vue'
  import { NotificationMessage, StateNamespace } from '~/lib/types'

  @Component({
    components: { TopNotification, TopNavbar }
  })
  export default class defaultLayout extends Vue {
    loading = true;

    @StateNamespace.notification.Getter getMessage!: NotificationMessage;

    created() {
      this.$nextTick(() => this.loading = false)
    }
  }

</script>
