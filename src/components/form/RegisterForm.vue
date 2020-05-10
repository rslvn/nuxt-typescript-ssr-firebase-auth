<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{ $t('form.registerForm.title')}}</h3>
    <div class="box">

      <ValidationObserver v-slot="{ passes }" tag="form">

        <BInputWithValidation
          v-model="credentials.name"
          :label="$t('common.field.name')"
          :placeholder="$t('common.field.namePlaceHolder')"
          rules="required|min:4"
          vid="name"
        />

        <BInputWithValidation
          v-model="credentials.email"
          :label="$t('common.field.email')"
          :placeholder="$t('common.field.emailPlaceHolder')"
          input-type="email"
          rules="required|email"
          vid="email"
        />

        <BInputWithValidation
          v-model="credentials.password"
          :label="$t('common.field.password')"
          :placeholder="$t('common.field.passwordPlaceHolder')"
          input-type="password"
          rules="required|min:4|confirmed:confirmPassword"
          vid="password"
        />

        <BInputWithValidation
          v-model="confirmPassword"
          :label="$t('common.field.confirmPassword')"
          :placeholder="$t('common.field.confirmPasswordPlaceHolder')"
          input-type="password"
          rules="required"
          vid="confirmPassword"
        />

        <div class="buttons">
          <b-button type="is-primary" icon-pack="fa" icon-left="user-plus" @click="passes(submit)">
            {{ $t('form.registerForm.submit')}}
          </b-button>
        </div>

      </ValidationObserver>
    </div>
    <div class="has-text-centered">
      <nuxt-link
        tag="a"
        class="button-outline"
        :to="routeType.LOGIN"
      >
        {{ $t('form.registerForm.hasAccount')}}
      </nuxt-link>

    </div>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { RegistrationCredentials, RouteType } from "~/types";
  import { ValidationObserver } from "vee-validate";
  import BInputWithValidation from "~/components/ui/input/BInputWithValidation.vue";

  @Component({
    components: {
      ValidationObserver,
      BInputWithValidation
    }
  })
  export default class RegisterForm extends Vue {
    credentials: RegistrationCredentials = {
      name: '',
      email: '',
      password: ''
    };
    confirmPassword = '';

    @Prop({ type: Function, required: true }) signUpWithEmail !: (credentials: RegistrationCredentials) => void;

    get routeType() {
      return RouteType
    }

    submit() {
      this.signUpWithEmail(this.credentials);
    }
  }
</script>
