<template>
  <div class="container">
    <div class="columns is-centered">

      <div class="column is-half">
        <b-tabs type="is-toggle-rounded" size="is-small" v-model="moduleType" expanded>
          <b-tab-item v-for="(moduleConfig, key) in computedModuleConfigs" :key="key"
                      :label="$t(`module.${moduleConfig.moduleType}`)"
                      :icon="moduleConfig.icon"
                      :value="moduleConfig.moduleType">
          </b-tab-item>
        </b-tabs>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <component :is="moduleConfig.module" v-bind="componentProperties"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { Component } from 'nuxt-property-decorator';
  import { ModuleConfig, ModuleType } from '~/types';
  import BaseModule from '~/mixin/BaseModule';
  import ProfileAboutMe from '~/components/profile/module/ProfileAboutMe.vue';
  import LinkedAccounts from '~/components/profile/module/LinkedAccounts.vue';
  import ProfileFollowers from '~/components/profile/module/ProfileFollowers.vue';
  import ProfileFollowings from '~/components/profile/module/ProfileFollowings.vue';
  import ProfileSettings from '~/components/profile/module/ProfileSettings.vue';
  import { showProfileModule } from '~/service/rx-service';

  @Component({
    components: {}
  })
  export default class ProfileModule extends BaseModule {

    moduleType = ModuleType.ProfileAboutMe

    componentProperties = {
      isMyProfile: this.isMyProfile,
      authUser: this.authUser,
      user: this.user
    }

    moduleConfigs: ModuleConfig<any>[] = [
      {
        moduleType: ModuleType.ProfileAboutMe,
        icon: 'account-details',
        module: ProfileAboutMe,
        private: false
      },
      {
        moduleType: ModuleType.LinkedAccounts,
        icon: 'link-variant',
        module: LinkedAccounts,
        private: true
      },
      {
        moduleType: ModuleType.ProfileFollowers,
        icon: 'account-arrow-left',
        module: ProfileFollowers,
        private: true
      },
      {
        moduleType: ModuleType.ProfileFollowings,
        icon: 'account-arrow-right',
        module: ProfileFollowings,
        private: true
      },
      {
        moduleType: ModuleType.ProfileSettings,
        icon: 'cog',
        module: ProfileSettings,
        private: true
      }
    ]

    created() {
      this.$subscribeTo(showProfileModule.asObservable(), async (moduleType: ModuleType) => {
        this.moduleType = moduleType
      })
    }

    get moduleConfig() {
      return this.moduleConfigs.find(moduleConfig => moduleConfig.moduleType === this.moduleType)
    }

    get computedModuleConfigs() {
      return this.moduleConfigs.filter(moduleConfig => !moduleConfig.private || this.isMyProfile)
    }

  }
</script>
