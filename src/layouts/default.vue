<template>
  <div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column">
          <client-only>
            <TopNavbar/>
          </client-only>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column">
          <TopNotification v-if="getMessage" :notification-message="getMessage" :closed="clearMessage"/>
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator'
  import TopNavbar from '../components/navbar/TopNavbar.vue'
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
