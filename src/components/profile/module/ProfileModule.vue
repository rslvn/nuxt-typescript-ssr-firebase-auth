<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <b-tabs type="is-toggle-rounded" size="is-small" v-model="moduleName" expanded>
          <template v-for="(moduleConfig, index) in moduleConfigs">
            <b-tab-item v-if="!moduleConfig.private || isMyProfile" :value="moduleConfig.name"
                        :label="$t(`module.${moduleConfig.name}`)" :icon="moduleConfig.icon"/>
          </template>

        </b-tabs>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <component :is="moduleConfig.component" v-bind="componentProperties"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component } from 'nuxt-property-decorator';
  import BaseModule from '~/mixin/BaseModule';
  import ProfileAboutMe from '~/components/profile/module/ProfileAboutMe.vue';
  import LinkedAccounts from '~/components/profile/module/LinkedAccounts.vue';
  import { ModuleConfig } from '~/types';
  import ProfileSettings from '~/components/profile/module/ProfileSettings.vue';

  @Component({
    components: {}
  })
  export default class ProfileModule extends BaseModule {

    moduleName = ProfileAboutMe.name

    componentProperties = {
      isMyProfile: this.isMyProfile,
      authUser: this.authUser,
      user: this.user
    }

    moduleConfigs: ModuleConfig[] = [
      {
        name: ProfileAboutMe.name,
        icon: 'account-details',
        component: ProfileAboutMe,
        private: false
      },
      {
        name: LinkedAccounts.name,
        icon: 'link-variant',
        component: LinkedAccounts,
        private: true
      },
      {
        name: ProfileSettings.name,
        icon: 'cog',
        component: ProfileSettings,
        private: true
      }
    ]

    get moduleConfig() {
      return this.moduleConfigs.find(moduleConfig => moduleConfig.name === this.moduleName)
    }


  }
</script>
