<template>
  <section class="section">
    <div class="container is-fullhd">
      <b-notification :type="notificationMessage.type"
                      :has-icon="notificationMessage.hasIcon"
                      aria-close-label="Close message"
                      role="alert"
      >
        {{notificationMessage.message}}
      </b-notification>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { NotificationMessage } from "~/lib/types";

  @Component({
    components: {}
  })
  export default class TopNotification extends Vue {

    @Prop({ required: true }) notificationMessage !: NotificationMessage;

  }
</script>
