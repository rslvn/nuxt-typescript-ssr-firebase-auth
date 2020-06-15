<template>
  <section class="section">
    <div class="container">
      <div class="columns">

        <div class="column">
          <SocialLogin :title="$t('form.social.title.login')" :remember-me="rememberMe" :providers="providers"
                       :callback="noCallback"
                       :reauthenticate="false"/>
        </div>

        <div class="column">
          <LoginForm :remember-me="rememberMe" :sign-in-with-email="handleSignInWithEmail" :callback="noCallback"/>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import SocialLogin from "~/components/form/SocialLogin.vue";
  import LoginForm from "~/components/form/LoginForm.vue";
  import {
    DefaultMeta,
    LoginCredentials,
    PageMeta,
    ProviderType,
    RouteType,
    StateNamespace,
    SupportedProviders
  } from "~/types";
  import { getHead } from "~/service/seo-service";

  @Component({
    components: { SocialLogin, LoginForm },
  })
  export default class login extends Vue {

    @StateNamespace.auth.Getter rememberMe !: boolean;
    @StateNamespace.auth.Action signInWithEmail !: (credentials: LoginCredentials) => void;
    @StateNamespace.notification.Action clearNotificationMessage !: () => void;

    handleSignInWithEmail(credentials: LoginCredentials) {
      this.clearNotificationMessage();
      this.signInWithEmail(credentials);
    }

    get providers() {
      return SupportedProviders.filter(value => value.providerType !== ProviderType.PASSWORD)
    }

    noCallback() {
    }

    head() {
      let pageMeta: PageMeta = {
        title: `${this.$t('page.login.title')} | ${DefaultMeta.title}`,
        url: `${DefaultMeta.url}${RouteType.LOGIN.path}`,
        description: this.$t('page.login.description') as string,
        image: DefaultMeta.image
      }
      return getHead(pageMeta)
    }

  }
</script>
