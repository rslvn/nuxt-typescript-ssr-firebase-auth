<template>
  <div>
    <section class="section">
      <div class="container is-fullhd">
        <div class="columns is-centered">
          <div class="column is-three-quarters">
            <ActionTopNavbar/>
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
  import TopNotification from '~/components/notification/TopNotification.vue'
  import { NotificationMessage, StateNamespace } from '~/types'
  import ActionTopNavbar from "~/components/navbar/ActionTopNavbar.vue";

  @Component({
    components: { ActionTopNavbar, TopNotification }
  })
  export default class defaultLayout extends Vue {
    @StateNamespace.notification.Getter getMessage!: NotificationMessage;
    @StateNamespace.notification.Action clearMessage !: () => void;
  }

</script>
