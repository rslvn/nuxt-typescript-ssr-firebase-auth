<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{ title }}</h3>
    <div class="box">
      <p><span v-html="description"></span></p>
      <br v-if="description">
      <ValidationObserver v-slot="{ passes }" tag="form">
        <BInputWithValidation
          v-model="password"
          input-type="password"
          :label="$t('common.field.password')"
          :placeholder="$t('common.field.passwordPlaceHolder')"
          rules="required|min:4|confirmed:confirmedPassword"
          vid="password"
        />

        <BInputWithValidation
          v-model="confirmedPassword"
          input-type="password"
          :label="$t('common.field.confirmPassword')"
          :placeholder="$t('common.field.confirmPasswordPlaceHolder')"
          rules="required"
          vid="confirmedPassword"
        />

        <div class="buttons">
          <b-button type="is-primary" icon-left="lock-reset" icon-pack="mdi" @click="passes(submit)">
            {{ buttonText }}
          </b-button>
        </div>
      </ValidationObserver>
    </div>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ValidationObserver } from "vee-validate";
  import BInputWithValidation from "~/components/ui/input/BInputWithValidation.vue";

  @Component({
    components: {
      ValidationObserver,
      BInputWithValidation
    }
  })
  export default class SetPasswordForm extends Vue {

    password = '';
    confirmedPassword = '';

    @Prop({ type: Function, required: true }) confirmPassword !: (password: string) => void;
    @Prop({ type: String, required: true }) title !: string;
    @Prop({ type: String, required: true }) buttonText !: string;
    @Prop({ type: String, required: false }) description !: string;

    submit() {
      this.confirmPassword(this.password);
    }
  }
</script>
