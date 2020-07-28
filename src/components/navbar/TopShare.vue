<template>
  <b-navbar-dropdown :boxed="true" :close-on-click="true" :arrowless="true" hoverable right>
    <template slot="label">
      <b-icon
        icon="share-variant"
        type="is-primary"
      />
      <small class="has-text-primary has-margin-left-5"> {{ $t('common.Share') }} </small>
    </template>

    <b-navbar-item>
      <div class="block">
        <client-only>
          <SocialShare v-for="(socialMetaConfig, index) in socialMetaConfigs" :key="index" :page-meta="defaultMeta"
                       :social-meta-config="socialMetaConfig"
          />
        </client-only>
      </div>
    </b-navbar-item>
  </b-navbar-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SocialShare from '~/components/ui/social/SocialShare.vue'
import { DefaultMeta, SocialMetaConfigs } from '~/types'

@Component({
  components: { SocialShare }
})
export default class TopShare extends Vue {
  get defaultMeta () {
    return DefaultMeta
  }

  get socialMetaConfigs () {
    return SocialMetaConfigs
  }
}
</script>
