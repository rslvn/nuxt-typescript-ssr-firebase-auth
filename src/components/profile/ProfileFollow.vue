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
          <b-tag>{{$t('profile.follow.followers')}}</b-tag>
          <b-tag type="is-primary">{{followerCount}}</b-tag>
        </b-taglist>
      </div>

      <div class="control">
        <b-taglist attached>
          <b-tag>{{$t('profile.follow.following')}}</b-tag>
          <b-tag type="is-primary">{{followingCount}}</b-tag>
        </b-taglist>
      </div>
    </b-field>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { AuthUser, Following, User } from '~/types';
  import {
    deleteFollowing,
    getCountOfFollowers,
    getCountOfFollowing,
    getFollowingByFollowerAndFollowing,
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

    loading = true
    following = false
    followerCount = 0
    followingCount = 0

    async mounted() {
      await Promise.resolve()
        .then(async () => {
          const [
            existingFollowing,
            followerCount,
            followingCount
          ]: [(Following | null), number, number] = await Promise.all([
            getFollowingByFollowerAndFollowing(this.authUser.userId, this.user.id as string),
            getCountOfFollowers(this.user),
            getCountOfFollowing(this.user)
          ])
            .finally(() => this.loading = false) as [(Following | null), number, number]

          console.log('existingFollowing', existingFollowing, 'user', this.user.id, 'authUser', this.authUser.userId)

          this.following = !!existingFollowing
          this.followerCount = followerCount
          this.followingCount = followingCount

        })
        .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.follow.canNotLoadFollowing')))

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
        getFollowingByFollowerAndFollowing(this.authUser.userId, this.user.id as string)
          .then(async (existingFollowing) => {
            if (existingFollowing) {
              this.following = true
              return showInfoToaster(this.$t('notification.follow.alreadyFollowing', { username: this.user.username }))
            }

            await saveFollowing({
              follower: this.authUser.userId,
              following: this.user.id as string
            }).then(() => {
              this.following = true
              this.followerCount++
            })
          })
          .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.systemError')))
    }

    async unfollow() {
      await
        getFollowingByFollowerAndFollowing(this.authUser.userId, this.user.id as string)
          .then(async (existingFollowing) => {
            if (!existingFollowing) {
              this.following = false
              return showInfoToaster(this.$t('notification.follow.alreadyUnfollowing', { username: this.user.username }))
            }

            await deleteFollowing(existingFollowing)
              .then(() => {
                this.following = false
                this.followerCount--
              })
          })
          .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.systemError')))
    }


  }
</script>
