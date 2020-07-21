<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <b-tabs v-model="moduleType" type="is-toggle-rounded" size="is-small" expanded>
          <b-tab-item
            v-for="(moduleConfig, key) in computedModuleConfigs"
            :key="key"
            :label="$t(`module.${moduleConfig.type}`)"
            :icon="moduleConfig.icon"
            :value="moduleConfig.type"
          />
        </b-tabs>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <component :is="moduleConfig.component" v-if="moduleConfig" v-bind="componentProperties" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { PrivacyType } from 'types-module'
import { ModuleTabConfig, ModuleType } from '~/types'
import BaseModule from '~/mixin/BaseModule'
import ProfileAboutMe from '~/components/profile/module/ProfileAboutMe.vue'
import LinkedAccounts from '~/components/profile/module/LinkedAccounts.vue'
import ProfileFollowers from '~/components/profile/module/ProfileFollowers.vue'
import ProfileFollowings from '~/components/profile/module/ProfileFollowings.vue'
import ProfileSettings from '~/components/profile/module/ProfileSettings.vue'
import { showProfileModule } from '~/service/rx-service'

@Component({
  components: {}
})
export default class ProfileModule extends BaseModule {
  moduleType = ModuleType.ABOUT_ME

  moduleConfigs: ModuleTabConfig[] = [
    {
      type: ModuleType.ABOUT_ME,
      icon: 'account-details',
      component: ProfileAboutMe,
      private: false
    },
    {
      type: ModuleType.LINKED_ACCOUNTS,
      icon: 'link-variant',
      component: LinkedAccounts,
      private: true
    },
    {
      type: ModuleType.FOLLOWERS,
      icon: 'account-arrow-left',
      component: ProfileFollowers,
      private: this.user?.privacy === PrivacyType.PRIVATE || this.user.followersPrivacy === PrivacyType.PRIVATE
    },
    {
      type: ModuleType.FOLLOWINGS,
      icon: 'account-arrow-right',
      component: ProfileFollowings,
      private: this.user?.privacy === PrivacyType.PRIVATE || this.user.followingPrivacy === PrivacyType.PRIVATE
    },
    {
      type: ModuleType.SETTINGS,
      icon: 'cog',
      component: ProfileSettings,
      private: true
    }
  ]

  created () {
    this.$subscribeTo(showProfileModule.asObservable(), (moduleType: ModuleType) => {
      this.moduleType = moduleType
    })
  }

  get moduleConfig () {
    return this.moduleConfigs.find(moduleConfig => moduleConfig.type === this.moduleType)
  }

  get computedModuleConfigs () {
    return this.moduleConfigs.filter(moduleConfig => !moduleConfig.private || this.isMyProfile)
  }

  get componentProperties () {
    return this.moduleConfig?.componentProperties
      ? this.moduleConfig.componentProperties
      : {
        isMyProfile: this.isMyProfile,
        authUser: this.authUser,
        user: this.user
      }
  }
}
</script>
