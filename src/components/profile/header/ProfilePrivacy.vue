<template>
  <b-taglist attached>
    <b-tag :type="userPrivacyConfig.type">
      <b-icon
        :icon="userPrivacyConfig.icon"
        size="is-small"
      />
      {{ $t(`privacy.account.${userPrivacyConfig.privacyType}.title`) }}
    </b-tag>
    <b-tag type="is-light">
      {{ $t(`privacy.account.${userPrivacyConfig.privacyType}.subtitle`) }}
      <b-tooltip
        :label="$t(`privacy.account.${userPrivacyConfig.privacyType}.description`)"
        position="is-left"
        multilined
      >
        <b-icon
          icon="information"
          size="is-small"
        />
      </b-tooltip>
    </b-tag>
  </b-taglist>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PrivacyList, PrivacyType, User } from '../../../types'

@Component({
  components: {}
})
export default class ProfilePrivacy extends Vue {
  @Prop({ type: Object, required: true }) user: User

  get userPrivacy () {
    return this.user.privacy || PrivacyType.PRIVATE
  }

  get userPrivacyConfig () {
    return PrivacyList.find(privacyConfig => privacyConfig.privacyType === this.userPrivacy)
  }
}
</script>
