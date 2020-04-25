<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">

        <div class="column is-half">
          <SocialLogin :title="$t('form.social.title.register')" :providers="providers" :callback="noCallback"/>
        </div>

        <div class="column is-half">
          <client-only>
            <RegisterForm :sign-up-with-email="handleSignUpWithEmail"/>
          </client-only>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import SocialLogin from "~/components/form/SocialLogin.vue";
  import RegisterForm from "~/components/form/RegisterForm.vue";
  import { RegistrationCredentials, StateNamespace, SupportedProviders } from "~/lib/types";

  @Component({
    components: { SocialLogin, RegisterForm },
  })
  export default class register extends Vue {

    @StateNamespace.auth.Action signUpWithEmail !: (credentials: RegistrationCredentials) => void;
    @StateNamespace.notification.Action clearMessage  !: () => void;

    handleSignUpWithEmail(credentials: RegistrationCredentials) {
      this.clearMessage();
      this.signUpWithEmail(credentials);
    }

    get providers() {
      return SupportedProviders
    }

    noCallback() {
    }

  }
</script>
