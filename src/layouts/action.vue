<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column">
          <client-only>
            <ActionTopNavbar />
          </client-only>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <TopNotification
            v-if="notificationMessage"
            :notification-message="notificationMessage"
            :closed="clearNotificationMessage"
          />
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TopNotification from '~/components/notification/TopNotification.vue'
import { NotificationMessage, StateNamespace } from '~/types'
import ActionTopNavbar from '~/components/navbar/ActionTopNavbar.vue'

@Component({
  components: { ActionTopNavbar, TopNotification }
})
export default class defaultLayout extends Vue {
    @StateNamespace.notification.Getter notificationMessage: NotificationMessage
    @StateNamespace.notification.Action clearNotificationMessage: () => void
}
</script>
