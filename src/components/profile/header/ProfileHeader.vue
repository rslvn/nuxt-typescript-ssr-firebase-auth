<template>
  <div class="container">
    <CoverPhoto :is-my-profile="isMyProfile" :auth-user="authUser" :cover-photo="user.coverPhoto" />

    <ProfilePrivacy class="is-overlay-top-right" :user="user" />

    <ProfileShort class="is-overlay-bottom-left" :is-my-profile="isMyProfile" :auth-user="authUser" :user="user" />

    <ProfileFollow class="is-overlay-bottom-right" :is-my-profile="isMyProfile" :auth-user="authUser" :user="user" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser, User } from '~/types'
import SingleValidatedImageUpload from '~/components/image/upload/SingleValidatedImageUpload.vue'
import ProfilePhoto from '~/components/profile/header/ProfilePhoto.vue'
import ProfilePrivacy from '~/components/profile/header/ProfilePrivacy.vue'
import ProfileFollow from '~/components/profile/header/ProfileFollow.vue'
import ProfileShort from '~/components/profile/header/ProfileShort.vue'
import CoverPhoto from '~/components/profile/header/CoverPhoto.vue'

@Component({
  components: { CoverPhoto, ProfileShort, ProfileFollow, ProfilePrivacy, ProfilePhoto, SingleValidatedImageUpload }
})
export default class ProfileHeader extends Vue {
  @Prop({ type: Boolean, required: true }) isMyProfile: boolean
  @Prop({ required: true }) authUser: AuthUser
  @Prop({ type: Object, required: true }) user: User
}
</script>
