<template>
  <section class="section">
    <div class="container">
      <div class="columns">

        <div class="column">
          <SocialLogin :title="$t('form.social.title.register')" :remember-me="rememberMe" :providers="providers"
                       :callback="noCallback"
                       :reauthenticate="false"/>
        </div>

        <div class="column">
          <RegisterForm :sign-up-with-email="handleSignUpWithEmail"/>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import SocialLogin from "~/components/form/SocialLogin.vue";
  import RegisterForm from "~/components/form/RegisterForm.vue";
  import {
    DefaultMeta,
    PageMeta,
    ProviderType,
    RegistrationCredentials,
    StateNamespace,
    SupportedProviders
  } from "~/types";
  import { getHead } from "~/service/seo-service";

  @Component({
    components: { SocialLogin, RegisterForm },
  })
  export default class register extends Vue {

    pageMeta: PageMeta = {
      ...DefaultMeta,
      title: 'Register | ' + DefaultMeta.title,
      url: DefaultMeta.url + '/register'
    }

    @StateNamespace.auth.Getter rememberMe !: boolean;
    @StateNamespace.auth.Action signUpWithEmail !: (credentials: RegistrationCredentials) => void;
    @StateNamespace.notification.Action clearMessage  !: () => void;

    handleSignUpWithEmail(credentials: RegistrationCredentials) {
      this.clearMessage();
      this.signUpWithEmail(credentials);
    }

    get providers() {
      return SupportedProviders.filter(value => value.providerType !== ProviderType.PASSWORD)
    }

    noCallback() {
    }

    head() {
      return getHead(this.pageMeta)
    }

  }
</script>
