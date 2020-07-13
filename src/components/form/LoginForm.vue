<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">
      {{ $t('form.loginForm.title') }}
    </h3>
    <div class="box">
      <ValidationObserver v-slot="{ passes }" tag="form">
        <InputWithValidation
          v-model="credentials.email"
          :label="$t('common.field.email')"
          :placeholder="$t('common.field.emailPlaceholder')"
          rules="required|email"
          vid="email"
          :disabled="!!email"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="credentials.password"
          input-type="password"
          :label="$t('common.field.password')"
          :placeholder="$t('common.field.passwordPlaceholder')"
          rules="required"
          vid="password"
          label-position="on-border"
          class="has-margin-5"
        />

        <RememberMe v-if="showRememberMe" :value="rememberMe" />

        <b-button
          v-if="showForgetPassword"
          tag="router-link"
          :to="routes.FORGET_PASSWORD"
          type="is-text"
          class="has-text-primary is-pulled-right"
        >
          {{ $t('form.loginForm.forgetPassword') }}
        </b-button>

        <div class="buttons">
          <b-button type="is-primary" icon-pack="fa" icon-left="sign-in-alt" @click="passes(submit)">
            {{ $t('form.loginForm.submit') }}
          </b-button>
        </div>
      </ValidationObserver>
    </div>
    <div v-if="showRegisterLink" class="has-text-centered">
      <nuxt-link
        tag="a"
        class="button-outline"
        :to="routes.REGISTER"
      >
        {{ $t('form.loginForm.noAccount') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { LoginCredentials, Routes } from '~/types'
import InputWithValidation from '~/components/ui/input/InputWithValidation.vue'
import RememberMe from '~/components/ui/RememberMe.vue'

@Component({
  components: {
    RememberMe,
    ValidationObserver,
    InputWithValidation
  }
})
export default class LoginForm extends Vue {
  @Prop({ type: Function, required: true }) signInWithEmail: (credentials: LoginCredentials) => void
  @Prop({ type: String, default: '' }) email: string
  @Prop({ type: Boolean, required: true }) rememberMe: boolean
  @Prop({ type: Boolean, default: true }) showForgetPassword: boolean
  @Prop({ type: Boolean, default: true }) showRegisterLink: boolean
  @Prop({ type: Boolean, default: true }) showRememberMe: boolean

  credentials: LoginCredentials = {
    email: this.email || '',
    password: '',
    rememberMe: this.rememberMe
  }

  get routes () {
    return Routes
  }

  submit () {
    this.signInWithEmail(this.credentials)
  }
}
</script>
