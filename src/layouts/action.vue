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
          <TopMessage
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
import TopMessage from '~/components/notification/TopMessage.vue'
import { NotificationMessage, StateNamespace } from '~/types'
import ActionTopNavbar from '~/components/navbar/ActionTopNavbar.vue'

@Component({
  components: { ActionTopNavbar, TopMessage }
})
export default class defaultLayout extends Vue {
  @StateNamespace.notification.Getter notificationMessage: NotificationMessage
  @StateNamespace.notification.Action clearNotificationMessage: () => void
}
</script>
