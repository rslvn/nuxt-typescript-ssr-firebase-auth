<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">
      {{ $t('form.registerForm.title') }}
    </h3>
    <div class="box">
      <ValidationObserver v-slot="{ passes }" tag="form">
        <InputWithValidation
          v-model="credentials.name"
          :label="$t('common.field.name')"
          :placeholder="$t('common.field.namePlaceholder')"
          rules="required|min:4"
          vid="name"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="credentials.email"
          :label="$t('common.field.email')"
          :placeholder="$t('common.field.emailPlaceholder')"
          input-type="email"
          rules="required|email"
          vid="email"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="credentials.password"
          :label="$t('common.field.password')"
          :placeholder="$t('common.field.passwordPlaceholder')"
          input-type="password"
          rules="required|min:4|confirmed:confirmPassword"
          vid="password"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="confirmPassword"
          :label="$t('common.field.confirmPassword')"
          :placeholder="$t('common.field.confirmPasswordPlaceholder')"
          input-type="password"
          rules="required"
          vid="confirmPassword"
          label-position="on-border"
          class="has-margin-5"
        />

        <div class="buttons">
          <b-button type="is-primary" icon-pack="fa" icon-left="user-plus" @click="passes(submit)">
            {{ $t('form.registerForm.submit') }}
          </b-button>
        </div>
      </ValidationObserver>
    </div>
    <div class="has-text-centered">
      <nuxt-link
        tag="a"
        class="button-outline"
        :to="routes.LOGIN"
      >
        {{ $t('form.registerForm.hasAccount') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { RegistrationCredentials, Routes } from '~/types'
import InputWithValidation from '~/components/ui/input/InputWithValidation.vue'

  @Component({
    components: {
      ValidationObserver,
      InputWithValidation
    }
  })
export default class RegisterForm extends Vue {
    credentials: RegistrationCredentials = {
      name: '',
      email: '',
      password: ''
    };

    confirmPassword = '';

    @Prop({ type: Function, required: true }) signUpWithEmail : (credentials: RegistrationCredentials) => void;

    get routes () {
      return Routes
    }

    submit () {
      this.signUpWithEmail(this.credentials)
    }
}
</script>
