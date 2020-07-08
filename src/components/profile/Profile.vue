<template>
  <div>
    <ProfileHeader class="has-margin-bottom-15" :is-my-profile="isMyProfile" :auth-user="authUser" :user="user" />
    <ProfileModule :is-my-profile="isMyProfile" :auth-user="authUser" :user="user" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser, User } from '~/types'
import ProfileHeader from '~/components/profile/header/ProfileHeader.vue'
import ProfileModule from '~/components/profile/module/ProfileModule.vue'

  @Component({
    components: { ProfileModule, ProfileHeader }
  })
export default class Profile extends Vue {
    @Prop({ required: true }) authUser : AuthUser;
    @Prop({ required: true }) user : User;

    get isMyProfile () {
      return this.authUser.userId === this.user.id
    }
}
</script>
