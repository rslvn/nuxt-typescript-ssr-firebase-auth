<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{$t('form.loginForm.title')}}</h3>
    <div class="box">

      <ValidationObserver v-slot="{ passes }" tag="form">

        <BinputWithValidation
          v-model="credentials.email"
          :label="$t('common.field.email')"
          :placeholder="$t('common.field.emailPlaceHolder')"
          rules="required|email"
          vid="email"
        />

        <BinputWithValidation
          v-model="credentials.password"
          input-type="password"
          :label="$t('common.field.password')"
          :placeholder="$t('common.field.passwordPlaceHolder')"
          rules="required"
          vid="password"
        />

        <b-button tag="router-link"
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
    <div class="has-text-centered">
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
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { LoginCredentials, RouteType } from "~/types";
  import { ValidationObserver } from "vee-validate";
  import BinputWithValidation from "~/components/ui/input/BinputWithValidation.vue";

  @Component({
    components: {
      ValidationObserver,
      BinputWithValidation
    }
  })
  export default class LoginForm extends Vue {
    credentials: LoginCredentials = {
      email: '',
      password: ''
    }

    @Prop({ type: Function, required: true }) signInWithEmail !: (credentials: LoginCredentials) => void;

    get routeType() {
      return RouteType
    }

    submit() {
      this.signInWithEmail(this.credentials)
    }
  }
</script>
