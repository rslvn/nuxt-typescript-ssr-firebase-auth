<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <b-menu>
          <b-menu-list>
            <b-menu-item
              v-for="(setting,index) in settingsMenuConfigs"
              :key="index"
              :icon="setting.icon"
              :active="settingsType === setting.type"
              :label="$t(`settings.${setting.type}`)"
              @click="settingsType = setting.type"
            />
          </b-menu-list>
        </b-menu>
      </div>
      <div class="column is-half">
        <component :is="settingsMenuConfig.component" v-if="settingsMenuConfig" v-bind="componentProperties" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { reloadUserFromDatabase } from '~/service/rx-service'
import { SettingsMenuConfig, SettingsType } from '~/types'
import BaseModule from '~/mixin/BaseModule'
import ProfileUpdateForm from '~/components/form/ProfileUpdateForm.vue'
import ProfilePrivacyForm from '~/components/form/ProfilePrivacyForm.vue'

  @Component({
    components: { ProfileUpdateForm, ProfilePrivacyForm }
  })
export default class ProfileSettings extends BaseModule {
    settingsType = SettingsType.GENERAL

    settingsMenuConfigs: SettingsMenuConfig[] = [
      {
        type: SettingsType.GENERAL,
        icon: 'cogs',
        component: ProfileUpdateForm,
        private: true
      },
      {
        type: SettingsType.PRIVACY,
        icon: 'account-lock',
        component: ProfilePrivacyForm,
        private: true
      }
    ]

    created () {
      reloadUserFromDatabase.next()
    }

    get settingsMenuConfig () {
      return this.settingsMenuConfigs.find(setting => setting.type === this.settingsType)
    }

    get componentProperties () {
      return this.settingsMenuConfig?.componentProperties
        ? this.settingsMenuConfig.componentProperties
        : {
          user: this.user
        }
    }
  }
</script>
