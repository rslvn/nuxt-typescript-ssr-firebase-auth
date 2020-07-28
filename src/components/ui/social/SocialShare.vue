<template>
  <a :href="shareLink" target="_blank" class="has-margin-right-20" @click="shared()">
    <b-icon :icon="socialMetaConfig.icon" :type="socialMetaConfig.type" />
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PageMeta, SocialMetaConfig, SocialMetaType } from '~/types'

@Component({
  components: {}
})
export default class SocialShare extends Vue {
  @Prop({ type: Object, required: true }) readonly socialMetaConfig: SocialMetaConfig
  @Prop({ type: Object, required: true }) readonly pageMeta: PageMeta

  get rawLink () {
    const ua = navigator.userAgent.toLowerCase()

    /**
     * On IOS, SMS sharing link need a special formatting
     * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
     */
    if (this.socialMetaConfig.type === SocialMetaType.SMS && (ua?.includes('iphone') || ua?.includes('ipad'))) {
      return this.socialMetaConfig.shareLink.replace(':?', ':&')
    }

    return this.socialMetaConfig.shareLink
  }

  get encodedHashtags () {
    if (this.socialMetaConfig.type === SocialMetaType.FACEBOOK && this.pageMeta.tags.length) {
      return '%23' + this.pageMeta.tags.split(',')[0] + ' %23ahanda'
    }

    return this.pageMeta.tags
  }

  get shareLink () {
    let link = this.rawLink

    /**
     * Twitter sharing shouldn't include empty parameter
     * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
     */
    if (this.socialMetaConfig.type === SocialMetaType.TWITTER) {
      if (!this.pageMeta.tags?.length) {
        link = link.replace('&hashtags=@h', '')
      }
    }

    return link
      .replace(/@u/g, encodeURIComponent(this.pageMeta.url))
      .replace(/@t/g, encodeURIComponent(this.pageMeta.title))
      .replace(/@d/g, encodeURIComponent(this.pageMeta.description))
      .replace(/@h/g, this.encodedHashtags)
      .replace(/@m/g, encodeURIComponent(this.pageMeta.image.src))
  }

  shared () {
    console.log('Clicked on ' + this.socialMetaConfig.type)
  }
}
</script>
