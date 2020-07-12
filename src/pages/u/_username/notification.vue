<template>
  <div>
    <PageTitle :title="$t('page.profileNotification.title')" />

    <div v-for="(pushNotificationEnriched,index) in pushNotifications"
         :key="index">
      <p>{{ item }}</p>
    </div>

    <client-only>
      <infinite-loading @infinite="infiniteHandler" />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import InfiniteLoading, { StateChanger } from 'vue-infinite-loading'
import { AuthUser, PushNotificationEnriched, RouteParameters, StateNamespace } from '~/types'
import userPrivateMiddleware from '~/middleware/user-private'
import PageTitle from '~/components/ui/PageTitle.vue'

@Component({
  components: { PageTitle, InfiniteLoading },
  middleware: userPrivateMiddleware
})
export default class notification extends Vue {
  username = ''
  page = 1
  pushNotifications: PushNotificationEnriched[] = []

  @StateNamespace.auth.Getter authUser: AuthUser

  asyncData ({ params }: Context) {
    const username = params[RouteParameters.USERNAME]

    return {
      username
    }
  }

  infiniteHandler ($state: StateChanger) {
    console.log('infiniteHandler called')
    this.$axios.get('https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8', {
      params: {
        query: 'a',
        page: this.page
      }
    }).then(({ data }) => {
      if (data.results.length) {
        this.page += 1
        this.pushNotifications.push(...data.results)
        $state.loaded()
      } else {
        $state.complete()
      }
    }).finally(() => console.log('infiniteHandler finished'))
  }
}
</script>
