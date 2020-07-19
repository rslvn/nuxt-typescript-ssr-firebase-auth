<template>
  <div>
    <b-button
      v-if="!isMyProfile"
      class="follow-me"
      :loading="loading"
      :type="buttonType"
      :icon-left="icon"
      size="is-small"
      :expanded="!isMobile" @click="followCalled"
    >
      {{ buttonText }}
    </b-button>

    <b-field grouped>
      <div class="control">
        <b-taglist attached>
          <b-tag v-if="followersLocked">
            <b-icon
              class="has-margin-right-5"
              icon="account-arrow-left"
              size="is-small"
            />

            {{ $t('profile.follow.followers') }}
          </b-tag>

          <a v-else class="tag" @click="showFollowers">
            <b-icon
              class="has-margin-right-5"
              icon="account-arrow-left"
              size="is-small"
            />

            {{ $t('profile.follow.followers') }}
          </a>
          <b-tag v-if="followersLocked" class="tag is-primary">
            <b-icon
              icon="lock"
              size="is-small"
            />
          </b-tag>
          <a v-else class="tag is-primary" @click="showFollowers">{{ followerCount }}</a>
        </b-taglist>
      </div>

      <div class="control">
        <b-taglist attached>
          <b-tag v-if="followingLocked">
            <b-icon
              class="has-margin-right-5"
              icon="account-arrow-right"
              size="is-small"
            />
            {{ $t('profile.follow.following') }}
          </b-tag>

          <a v-else class="tag" @click="showFollowings">
            <b-icon
              class="has-margin-right-5"
              icon="account-arrow-right"
              size="is-small"
            />
            {{ $t('profile.follow.following') }}
          </a>
          <b-tag v-if="followingLocked" class="tag is-primary">
            <b-icon
              icon="lock"
              size="is-small"
            />
          </b-tag>
          <a v-else class="tag is-primary" @click="showFollowings">
            {{ followingCount }}
          </a>
        </b-taglist>
      </div>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser, PrivacyType, PushNotificationStatus, PushNotificationType, User } from 'common-types'
import { ModuleType } from '~/types'
import {
  deleteFollowing,
  getCountOfFollowers,
  getCountOfFollowing,
  getFollowingByFollowerAndFollowing,
  saveFollowing
} from '~/service/firebase/firestore'
import { sendDangerNotification, showErrorToaster, showInfoToaster } from '~/service/notification-service'
import { reloadFollowing, sendNotificationObservable, showProfileModule } from '~/service/rx-service'

@Component({
  components: {}
})
export default class ProfileFollow extends Vue {
  @Prop({ type: Boolean, required: true }) isMyProfile: boolean
  @Prop({ required: true }) authUser: AuthUser
  @Prop({ type: Object, required: true }) user: User

  loading = true
  following = false
  followerCount = 0
  followingCount = 0

  width = 768;

  async mounted () {
    await Promise.resolve()
      .then(async () => {
        if (!this.isMyProfile) {
          await getFollowingByFollowerAndFollowing(this.authUser.userId, this.user.id)
            .then((existingFollowing) => {
              this.following = !!existingFollowing
            })
        }

        const [
          followerCount,
          followingCount
        ]: [number, number] = await Promise.all([
          Promise.resolve(this.followersLocked).then(locked => locked ? 0 : getCountOfFollowers(this.user)),
          Promise.resolve(this.followingLocked).then(locked => locked ? 0 : getCountOfFollowing(this.user))
        ])
          .finally(() => {
            this.loading = false
          }) as [number, number]

        this.followerCount = followerCount
        this.followingCount = followingCount
      })
      .catch((error) => {
        console.log(error)
        showErrorToaster(this.$t('notification.follow.canNotLoadFollowing'))
      })

    this.width = window.innerWidth
    window.addEventListener('resize', this.handleResize)
  }

  handleResize () {
    this.width = window.innerWidth
  }

  get followersLocked () {
    return !this.isMyProfile && this.user.followersPrivacy === PrivacyType.PRIVATE
  }

  get followingLocked () {
    return !this.isMyProfile && this.user.followingPrivacy === PrivacyType.PRIVATE
  }

  get isMobile () {
    return this.width < 768
  }

  get icon () {
    return this.following ? 'account-remove-outline' : 'account-star'
  }

  get buttonText () {
    return this.following ? this.$t('common.unfollow') : this.$t('common.follow')
  }

  get buttonType () {
    return this.following ? 'is-light' : 'is-primary'
  }

  followCalled () {
    this.loading = true
    Promise.resolve()
      .then(async () => {
        this.following ? await this.unfollow() : await this.follow()
      })
      .finally(() => {
        this.loading = false
      })
  }

  async follow () {
    await getFollowingByFollowerAndFollowing(this.authUser.userId, this.user.id as string)
      .then(async (existingFollowing) => {
        if (existingFollowing) {
          this.following = true
          return showInfoToaster(this.$t('notification.follow.alreadyFollowing', { username: this.user.username }))
        }

        await saveFollowing({
          follower: this.authUser.userId,
          following: this.user.id as string
        }).then((savedFollowing) => {
          sendNotificationObservable.next({
            from: savedFollowing.follower,
            to: savedFollowing.following,
            notificationType: PushNotificationType.FOLLOW,
            status: PushNotificationStatus.NEW
          })
        }).then(() => {
          this.following = true
          this.followerCount++
        })
      })
      .then(() => reloadFollowing.next())
      .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.systemError')))
  }

  async unfollow () {
    await getFollowingByFollowerAndFollowing(this.authUser.userId, this.user.id as string)
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
      .then(() => reloadFollowing.next())
      .catch(() => sendDangerNotification(this.$store.dispatch, this.$t('notification.systemError')))
  }

  showFollowers () {
    showProfileModule.next(ModuleType.FOLLOWERS)
  }

  showFollowings () {
    showProfileModule.next(ModuleType.FOLLOWINGS)
  }
}
</script>
