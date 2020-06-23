<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{ $t('form.profileUpdate.title')}}</h3>
    <div class="box">

      <ValidationObserver v-slot="{ passes }" tag="form">

        <FieldWithValue
          :value="updatedUser.id"
          :label="$t('common.field.id')"
          :disabled="true"
          label-position="on-border"
          class="has-margin-bottom-15"
        />

        <FieldWithValue
          :value="updatedUser.email"
          :label="$t('common.field.email')"
          :disabled="true"
          label-position="on-border"
          class="has-margin-bottom-15"
        />

        <PrivacyDropdown v-model="updatedUser.privacy"
                         :label="$t('common.field.privacy')"
                         rules="required"
                         label-position="on-border"
                         vid="privacy"
                         class="has-margin-5"/>

        <InputWithValidation
          v-model="updatedUser.username"
          :label="$t('common.field.username')"
          :placeholder="$t('common.field.usernamePlaceHolder')"
          :rules="`required|min:2|username:${updatedUser.id}`"
          vid="username"
          label-position="on-border"
          class="has-margin-5"
        />

        <InputWithValidation
          v-model="updatedUser.name"
          :label="$t('common.field.name')"
          :placeholder="$t('common.field.namePlaceHolder')"
          rules="required|min:2"
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
                    @click="gotoProfile(user.username)" outlined>
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
  import FieldWithValue from '~/components/ui/FieldWithValue.vue';
  import { getUserRoute } from '~/service/global-service';
  import {
    getDangerNotificationMessage,
    getSuccessNotificationMessage,
    sendNotification
  } from '~/service/notification-service';
  import { handleError } from '~/service/error-service';
  import PrivacyDropdown from '~/components/ui/dropdown/PrivacyDropdown.vue';

  @Component({
    components: { PrivacyDropdown, FieldWithValue, InputNoValidation, ValidationObserver, InputWithValidation }
  })
  export default class ProfileUpdateForm extends Vue {

    @Prop({ required: true }) user !: User
    updatedUser = this.user

    @StateNamespace.profile.Action updateUser !: (user: User) => Promise<User>;
    @StateNamespace.loading.Action saveLoading !: (loading: boolean) => Promise<void>

    submit() {
      this.saveLoading(true)
        .then(async () => {
          return await this.updateUser(this.updatedUser)
        })
        .then(async (savedUser: User) => {
          if (!savedUser) {
            return
          }
          await this.$router.replace(getUserRoute(Routes.PROFILE_SETTINGS, savedUser.username as string)).catch(() => {
          })
          await sendNotification(this.$store.dispatch, getSuccessNotificationMessage(this.$t('notification.profile.updated')))
        })
        .catch((error: Error) =>
          handleError(this.$store.dispatch, error, getDangerNotificationMessage(this.$i18n.t('notification.profile.updateFailed')))
        )
        .then(() => this.saveLoading(false))
    }

    gotoProfile(username: string) {
      this.$router.replace(getUserRoute(Routes.PROFILE_DYNAMIC, username))
    }

  }
</script>
