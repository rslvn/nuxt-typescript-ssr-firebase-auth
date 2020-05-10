<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{$t('form.loginForm.title')}}</h3>
    <div class="box">

      <ValidationObserver v-slot="{ passes }" tag="form">

        <BInputWithValidation
          v-model="credentials.email"
          :label="$t('common.field.email')"
          :placeholder="$t('common.field.emailPlaceHolder')"
          rules="required|email"
          vid="email"
          :disabled="!!email"
        />

        <BInputWithValidation
          v-model="credentials.password"
          input-type="password"
          :label="$t('common.field.password')"
          :placeholder="$t('common.field.passwordPlaceHolder')"
          rules="required"
          vid="password"
        />

        <div class="field">
          <b-checkbox v-model="credentials.rememberMe">
            Remember me
          </b-checkbox>
        </div>

        <b-button v-if="showForgetPassword" tag="router-link"
                  :to="routeType.FORGET_PASSWORD"
                  type="is-text"
                  class="has-text-primary is-pulled-right">
          {{ $t('form.loginForm.forgetPassword')}}
        </b-button>

        <div class="buttons">
          <b-button type="is-primary" icon-pack="fa" icon-left="sign-in-alt" @click="passes(submit)">
            {{ $t('form.loginForm.submit')}}
          </b-button>
        </div>
      </ValidationObserver>
    </div>
    <div v-if="showRegisterLink" class="has-text-centered">
      <nuxt-link
        tag="a"
        class="button-outline"
        :to="routeType.REGISTER"
      >
        {{ $t('form.loginForm.noAccount')}}
      </nuxt-link>

    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
  import { AppCookie, LoginCredentials, RouteType } from "~/types";
  import { ValidationObserver } from "vee-validate";
  import BInputWithValidation from "~/components/ui/input/BInputWithValidation.vue";

  @Component({
    components: {
      ValidationObserver,
      BInputWithValidation
    }
  })
  export default class LoginForm extends Vue {

    @Prop({ type: Function, required: true }) signInWithEmail !: (credentials: LoginCredentials) => void
    @Prop({ type: Function, required: true }) callback !: () => void
    @Prop({ type: String, default: '' }) email !: string
    @Prop({ type: Boolean, default: true }) showForgetPassword !: boolean
    @Prop({ type: Boolean, default: true }) showRegisterLink !: boolean
    @Prop({ type: Boolean, default: true }) showRememberMe !: boolean

    credentials: LoginCredentials = {
      email: this.email || '',
      password: '',
      rememberMe: false,
      callback: this.callback
    }

    @Watch('credentials.rememberMe')
    onRememberMeChanged(value: boolean, oldValue: boolean) {
      this.$cookies.set(AppCookie.rememberMe, value, { sameSite: 'lax' })
    }

    created() {
      let rememberMe = this.$cookies.get(AppCookie.rememberMe);
      this.credentials.rememberMe = rememberMe != undefined || typeof rememberMe == "boolean" ? rememberMe : true;
    }

    get routeType() {
      return RouteType
    }

    submit() {
      this.signInWithEmail(this.credentials)
    }

  }
</script>
