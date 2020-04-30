<template>
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
            <TopNotification v-if="getMessage" :notification-message="getMessage" :closed="clearMessage"/>
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
  import { NotificationMessage, StateNamespace } from '~/types'

  @Component({
    components: { TopNotification, TopNavbar }
  })
  export default class defaultLayout extends Vue {
    @StateNamespace.notification.Getter getMessage!: NotificationMessage;
    @StateNamespace.notification.Action clearMessage !: () => void;
  }

</script>
