<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">

        <div class="column is-half">
          <SocialLogin :title="$t('form.social.title.register')" :remember-me="rememberMe" :providers="providers"
                       :callback="noCallback"
                       :reauthenticate="false"/>
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
  import {
    PageMeta,
    DefaultMeta,
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
      title: 'Register |' + DefaultMeta.title,
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
      return SupportedProviders.filter(value => value.providerType !== ProviderType.password)
    }

    noCallback() {
    }

    head() {
      return getHead(this.pageMeta)
    }

  }
</script>
