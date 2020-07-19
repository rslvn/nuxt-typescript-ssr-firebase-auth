<template>
  <article class="media is-vcentered">
    <div class="media-left">
      <ProfilePhoto :is-my-profile="isMyProfile" :auth-user="authUser" :profile-photo="user.profilePhoto" />
    </div>
    <div class="media-content has-margin-top-20-tablet">
      <div>
        <p>
          <b-tag>{{ fullName }}</b-tag>
        </p>
        <p>
          <b-tag>@{{ user.username }}</b-tag>
        </p>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser, User } from 'common-types'
import ProfilePhoto from '~/components/profile/header/ProfilePhoto.vue'

@Component({
  components: { ProfilePhoto }
})
export default class ProfileShort extends Vue {
  @Prop({ type: Boolean, required: true }) isMyProfile: boolean
  @Prop({ required: true }) authUser: AuthUser
  @Prop({ type: Object, required: true }) user: User

  get fullName () {
    return this.user.surname ? `${this.user.name} ${this.user.surname}` : this.user.name
  }
}
</script>
