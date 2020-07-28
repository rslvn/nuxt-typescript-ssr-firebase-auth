<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">
      {{ $t('provider.linkPasswordProvider.passwordForm.title') }}
    </h3>
    <p class="has-text-centered has-margin-bottom-15">
      {{ description }}
    </p>
    <div class="box">
      <ValidationObserver v-slot="{ passes }" tag="form">
        <InputWithValidation
          v-if="!email"
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
          input-type="password"
          :label="$t('common.field.password')"
          :placeholder="$t('common.field.passwordPlaceholder')"
          rules="required|min:4"
          vid="password"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="confirmedPassword"
          input-type="password"
          :label="$t('common.field.confirmPassword')"
          :placeholder="$t('common.field.confirmPasswordPlaceholder')"
          rules="required|confirmed:password"
          vid="confirmedPassword"
          label-position="on-border"
          class="has-margin-5"
        />

        <div class="buttons">
          <b-button type="is-primary" icon-left="cog-outline" @click="passes(submit)">
            {{ $t('provider.linkPasswordProvider.passwordForm.submit') }}
          </b-button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import InputWithValidation from '~/components/ui/input/InputWithValidation.vue'
import { LoginCredentials } from '~/types'

@Component({
  components: {
    ValidationObserver,
    InputWithValidation
  }
})
export default class SetPasswordForm extends Vue {
  @Prop({ type: Function, required: true }) confirmCredentials: (credentials: LoginCredentials) => void
  @Prop({ type: String, required: false }) email: string

  credentials: LoginCredentials = {
    email: this.email,
    password: '',
    rememberMe: true
  }

  confirmedPassword = '';

  get description () {
    return this.email ? this.$t('provider.linkPasswordProvider.passwordForm.description', { email: this.email })
      : this.$t('provider.linkPasswordProvider.passwordForm.descriptionNoEmail')
  }

  submit () {
    this.confirmCredentials(this.credentials)
  }
}
</script>
