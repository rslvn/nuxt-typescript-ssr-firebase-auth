<template>
  <div>
    <div class="container">
      <div class="has-margin-top-10 has-margin-bottom-10">
        <article class="media has-margin-left-5">
          <div class="media-left">
            <ProfilePhoto :is-my-profile="isMyProfile" :auth-user="authUser" :profile-photo="user.profilePhoto"/>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>{{ fullName }}</strong></p>
              <p><small>@{{ user.username }}</small></p>
              <p class="has-margin-top-5">
                <b-taglist attached>
                  <b-tag :type="userPrivacyConfig.type">
                    <b-icon
                      :icon="userPrivacyConfig.icon"
                      size="is-small">
                    </b-icon>
                    {{$t(`privacy.${userPrivacyConfig.privacyType}.title`)}}
                  </b-tag>
                  <b-tag type="is-light">{{$t(`privacy.${userPrivacyConfig.privacyType}.subtitle`)}}
                    <b-tooltip :label="$t(`privacy.${userPrivacyConfig.privacyType}.description`)" multilined>
                      <b-icon
                        icon="information"
                        size="is-small">
                      </b-icon>
                    </b-tooltip>
                  </b-tag>
                </b-taglist>
              </p>
              <!--              <p class="has-margin-top-5">-->
              <!--                <b-tabs type="is-toggle" expanded class="has-margin-top-10" size="is-small" multiline>-->
              <!--                  <b-tab-item label="Pictures" icon="google-photos"></b-tab-item>-->
              <!--                  <b-tab-item label="Music" icon="library-music"></b-tab-item>-->
              <!--                  <b-tab-item label="Videos" icon="video"></b-tab-item>-->
              <!--                </b-tabs>-->
              <!--              </p>-->
            </div>
          </div>
        </article>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { AuthUser, PrivacyList, PrivacyType, User } from '~/types';
  import ProfilePhoto from '~/components/profile/ProfilePhoto.vue';

  @Component({
    components: { ProfilePhoto }
  })
  export default class ProfileBand extends Vue {

    @Prop({ type: Object, required: true }) authUser !: AuthUser
    @Prop({ type: Object, required: true }) user !: User
    @Prop({ type: Boolean, required: true }) isMyProfile !: boolean

    get fullName() {
      return this.user.surname ? `${this.user.name} ${this.user.surname}` : this.user.name
    }

    get userPrivacy() {
      return this.user.privacy || PrivacyType.PRIVATE
    }

    get userPrivacyConfig() {
      return PrivacyList.find((privacyConfig) => privacyConfig.privacyType === this.userPrivacy)
    }

  }
</script>
