<template>
  <div>
    <b-button
      v-if="!isMyProfile"
      class="follow-me"
      :loading="loading"
      :type="buttonType"
      :icon-left="icon"
      size="is-small"
      @click="followCalled">
      {{ buttonText }}
    </b-button>

    <b-field grouped>
      <div class="control">
        <b-taglist attached>
          <b-tag>followers</b-tag>
          <b-tag type="is-info">0</b-tag>
        </b-taglist>
      </div>

      <div class="control">
        <b-taglist attached>
          <b-tag>following</b-tag>
          <b-tag type="is-primary">
            15k
          </b-tag>
        </b-taglist>
      </div>
    </b-field>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { AuthUser, User } from '~/types';
  import {
    deleteFollowing,
    getFollowingByFollowingAndFollower,
    saveFollowing
  } from '~/service/firebase/firestore/following-service';
  import { sendDangerNotification, showInfoToaster } from '~/service/notification-service';

  @Component({
    components: {}
  })
  export default class ProfileFollow extends Vue {

    @Prop({ type: Boolean, required: true }) isMyProfile !: boolean
    @Prop({ required: true }) authUser !: AuthUser
    @Prop({ type: Object, required: true }) user !: User


    following = false

    loading = true

    async mounted() {
      await getFollowingByFollowingAndFollower(this.authUser.userId, this.user.id as string)
        .then((existingFollowing) => this.following = !!existingFollowing)
        .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.follow.canNotLoadFollowing')))
        .finally(() => this.loading = false)
    }

    get icon() {
      return this.following ? 'account-check-outline' : 'account-check'
    }

    get buttonText() {
      return this.following ? this.$t('common.unfollow') : this.$t('common.follow')
    }

    get buttonType() {
      return this.following ? 'is-light' : 'is-primary'
    }

    async followCalled() {
      return this.following ? this.unfollow() : this.follow()
    }

    async follow() {
      await
        getFollowingByFollowingAndFollower(this.authUser.userId, this.user.id as string)
          .then(async (existingFollowing) => {
            if (existingFollowing) {
              this.following = true
              return showInfoToaster(this.$t('notification.follow.alreadyFollowing', { username: this.user.username }))
            }

            await saveFollowing({
              follower: this.authUser.userId,
              following: this.user.id as string
            }).then(() => this.following = true)
          })
          .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.systemError')))
    }

    async unfollow() {
      await
        getFollowingByFollowingAndFollower(this.authUser.userId, this.user.id as string)
          .then(async (existingFollowing) => {
            if (!existingFollowing) {
              this.following = false
              return showInfoToaster(this.$t('notification.follow.alreadyUnfollowing', { username: this.user.username }))
            }

            await deleteFollowing(existingFollowing).then(() => this.following = false)
          })
          .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.systemError')))
    }


  }
</script>
