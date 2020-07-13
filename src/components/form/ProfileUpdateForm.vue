<template>
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

      <InputWithValidation
        v-model="updatedUser.username"
        :label="$t('common.field.username')"
        :placeholder="$t('common.field.usernamePlaceholder')"
        :rules="`required|min:4|max:64|username:${updatedUser.id}`"
        vid="username"
        label-position="on-border"
      />

      <InputWithValidation
        v-model="updatedUser.name"
        :label="$t('common.field.name')"
        :placeholder="$t('common.field.namePlaceholder')"
        rules="required|min:2|max:64"
        vid="name"
        label-position="on-border"
        class="has-margin-5"
      />

      <InputWithValidation
        v-model="updatedUser.surname"
        :label="$t('common.field.surname')"
        :placeholder="$t('common.field.surnamePlaceholder')"
        rules="required|min:2|max:64"
        vid="surname"
        label-position="on-border"
        class="has-margin-5"
      />

      <InputWithValidation
        v-model="updatedUser.biography"
        input-type="textarea"
        :label="$t('common.field.biography')"
        :placeholder="$t('common.field.biographyPlaceholder')"
        rules=""
        label-position="on-border"
        vid="biography"
        class="has-margin-5"
      />

      <div class="buttons">
        <b-button
          type="is-primary"
          icon-pack="fas"
          icon-left="user-edit"
          @click="passes(submit)"
        >
          {{ $t('form.profileUpdate.submit') }}
        </b-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { StateNamespace, User } from '~/types'
import { slugify } from '~/service/global-service'
import { getDangerNotificationMessage, showSuccessToaster } from '~/service/notification-service'
import { handleError } from '~/service/error-service'
import { reloadUserFromDatabase } from '~/service/rx-service'
import InputWithValidation from '~/components/ui/input/InputWithValidation.vue'
import InputNoValidation from '~/components/ui/input/InputNoValidation.vue'
import FieldWithValue from '~/components/ui/FieldWithValue.vue'

@Component({
  components: { FieldWithValue, InputNoValidation, ValidationObserver, InputWithValidation }
})
export default class ProfileUpdateForm extends Vue {
  @Prop({ required: true }) user: User
  updatedUser = { ...this.user }

  @StateNamespace.profile.Action updateUser: (user: User) => Promise<User>;
  @StateNamespace.loading.Action saveLoading: (loading: boolean) => Promise<void>

  @Watch('updatedUser.username', { deep: true })
  onUsernameChange (username: string) {
    this.updatedUser.username = slugify(username)
  }

  submit () {
    this.saveLoading(true)
      .then(async () => {
        return await this.updateUser(this.updatedUser)
      })
      .then((savedUser: User) => {
        if (!savedUser) {
          return
        }
        reloadUserFromDatabase.next()
        showSuccessToaster(this.$t('notification.profile.updated'))
      })
      .catch((error: Error) =>
        handleError(this.$store.dispatch, error, getDangerNotificationMessage(this.$i18n.t('notification.profile.updateFailed')))
      )
      .finally(() => this.saveLoading(false))
  }
}
</script>
