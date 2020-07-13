<template>
  <div class="box">
    <ValidationObserver v-slot="{ passes }" tag="form">
      <PrivacyDropdown
        v-model="updatedUser.privacy"
        :label="$t('privacy.account.field')"
        privacy-for="account"
        rules="required"
        label-position="on-border"
        vid="privacy"
        class="has-margin-10"
      />

      <PrivacyDropdown
        v-model="updatedUser.followersPrivacy"
        :label="$t('privacy.followers.field')"
        privacy-for="followers"
        rules="required"
        label-position="on-border"
        vid="privacy"
        class="has-margin-10"
      />

      <PrivacyDropdown
        v-model="updatedUser.followingPrivacy"
        :label="$t('privacy.following.field')"
        privacy-for="following"
        rules="required"
        label-position="on-border"
        vid="privacy"
        class="has-margin-10"
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { StateNamespace, User } from '~/types'
import InputWithValidation from '~/components/ui/input/InputWithValidation.vue'
import InputNoValidation from '~/components/ui/input/InputNoValidation.vue'
import FieldWithValue from '~/components/ui/FieldWithValue.vue'
import { getDangerNotificationMessage, showSuccessToaster } from '~/service/notification-service'
import { handleError } from '~/service/error-service'
import PrivacyDropdown from '~/components/ui/dropdown/PrivacyDropdown.vue'
import { reloadUserFromDatabase } from '~/service/rx-service'

@Component({
  components: { PrivacyDropdown, FieldWithValue, InputNoValidation, ValidationObserver, InputWithValidation }
})
export default class ProfilePrivacyForm extends Vue {
  @Prop({ required: true }) user: User
  updatedUser = { ...this.user }

  @StateNamespace.profile.Action updateUser: (user: User) => Promise<User>;
  @StateNamespace.loading.Action saveLoading: (loading: boolean) => Promise<void>

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
