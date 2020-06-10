<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column">
          <TopNavbar/>
          <TopNotification v-if="getMessage" :notification-message="getMessage" :closed="clearMessage"/>
        </div>
      </div>
    </div>
    <div class="container ">
      <div class="columns">
        <div class="column">
          <nuxt
            class="has-margin-left-5-mobile has-margin-right-5-mobile has-margin-left-5-tablet has-margin-right-5-tablet"/>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <AppFooter/>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator'
  import TopNavbar from '../components/navbar/TopNavbar.vue'
  import TopNotification from '~/components/notification/TopNotification.vue'
  import { NotificationMessage, StateNamespace } from '~/types'
  import AppFooter from '~/components/footer/AppFooter.vue';

  @Component({
    components: { AppFooter, TopNotification, TopNavbar }
  })
  export default class defaultLayout extends Vue {
    @StateNamespace.notification.Getter getMessage!: NotificationMessage;
    @StateNamespace.notification.Action clearMessage !: () => void;
  }

</script>
