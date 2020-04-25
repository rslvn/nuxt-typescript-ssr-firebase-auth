<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <SocialLogin :providers="linkedProviders" title="Login again" :callback="openLinkPasswordModal"/>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import SocialLogin from "~/components/form/SocialLogin.vue";

  @Component({
    components: { SocialLogin }
  })
  export default class ReloginModal extends Vue {
  }
</script>
