<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns is-centered">
        <div class="column is-half">
          <h3 class="title has-text-centered has-text-dark">
            {{ $t('form.forgetPassword.title') }}
          </h3>
          <div class="box">
            <ValidationObserver v-slot="{ passes }" tag="form" slim>
              <InputWithValidation
                v-model="emailAddress"
                :label="$t('common.field.email')"
                :placeholder="$t('common.field.emailPlaceholder')"
                rules="required|email"
                vid="email"
                label-position="on-border"
                class="has-margin-5"
              />

              <div class="buttons">
                <b-button type="is-primary" icon-left="envelope" icon-pack="far" @click="passes(submit)">
                  {{ $t('form.forgetPassword.submit') }}
                </b-button>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import InputWithValidation from '~/components/ui/input/InputWithValidation.vue'

@Component({
  components: { InputWithValidation, ValidationObserver }
})
export default class ForgetPasswordForm extends Vue {
  emailAddress = ''

  @Prop({ type: Function, required: true }) sendPasswordResetEmail: (email: string) => void;

  submit () {
    this.sendPasswordResetEmail(this.emailAddress)
  }
}
</script>
