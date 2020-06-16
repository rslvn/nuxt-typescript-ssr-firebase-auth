<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{ $t('form.profileUpdate.title')}}</h3>
    <div class="box">

      <ValidationObserver v-slot="{ passes }" tag="form">

        <InputNoValidation
          v-model="updatedUser.id"
          :label="$t('common.field.id')"
          :disabled="true"
          label-position="on-border"
          class="has-margin-bottom-15"
        />

        <InputNoValidation
          v-model="updatedUser.email"
          :label="$t('common.field.email')"
          :disabled="true"
          label-position="on-border"
          class="has-margin-bottom-5"
        />

        <InputWithValidation
          v-model="updatedUser.username"
          :label="$t('common.field.username')"
          :placeholder="$t('common.field.usernamePlaceHolder')"
          :rules="`required|min:4|username:${updatedUser.id}`"
          vid="username"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="updatedUser.name"
          :label="$t('common.field.name')"
          :placeholder="$t('common.field.namePlaceHolder')"
          rules="required|min:4"
          vid="name"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="updatedUser.surname"
          :label="$t('common.field.surname')"
          :placeholder="$t('common.field.surnamePlaceHolder')"
          rules="required|min:4"
          vid="surname"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="updatedUser.biography"
          inputType="textarea"
          :label="$t('common.field.biography')"
          :placeholder="$t('common.field.biographyPlaceHolder')"
          rules=""
          label-position="on-border"
          vid="biography"
          class="has-margin-5"
        />

        <div class="buttons">
          <b-button type="is-primary" icon-pack="fas"
                    icon-left="user-edit"
                    @click="passes(submit)">
            {{ $t('form.profileUpdate.submit')}}
          </b-button>

          <b-button type="is-primary" icon-pack="fas"
                    icon-left="arrow-left"
                    @click="gotoProfile" outlined>
            {{ $t('common.back')}}
          </b-button>
        </div>

      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ValidationObserver } from "vee-validate";
  import { Routes, StateNamespace, User } from '~/types';
  import InputWithValidation from "~/components/ui/input/InputWithValidation.vue";
  import InputNoValidation from '~/components/ui/input/InputNoValidation.vue';

  @Component({
    components: { InputNoValidation, ValidationObserver, InputWithValidation }
  })
  export default class ProfileUpdateForm extends Vue {

    @Prop({ required: true }) user !: User
    updatedUser = this.user

    @StateNamespace.profile.Action updateUser !: (user: User) => Promise<void>;

    submit() {
      this.updateUser(this.updatedUser)
        .then(() => {
          this.gotoProfile()
        })
    }

    gotoProfile() {
      this.$router.replace(Routes.PROFILE)
    }

  }
</script>
