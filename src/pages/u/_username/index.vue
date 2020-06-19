<template>
  <Profile v-if="authUser && user" :auth-user="authUser" :user="user"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Profile from '~/components/profile/Profile.vue';
  import { AuthUser, Image, RouteParameters, StateNamespace, User } from '~/types';
  import { profilePhotoObservable } from '~/service/rx-service';
  import { getUserByUsername } from '~/service/firebase/firestore';
  import { Context } from '@nuxt/types';

  @Component({
    components: { Profile },
  })
  export default class profile extends Vue {

    user: User | null = null

    @StateNamespace.auth.Getter authUser !: AuthUser;

    async asyncData({ params, error, route, app }: Context) {
      let username = params[RouteParameters.USERNAME]

      if (!username) {
        error({
          message: app.i18n.t('page.notFound') as string,
          path: route.fullPath,
          statusCode: 404
        })
        return
      }

      let user = await getUserByUsername(username)

      return {
        user
      }
    }

    created() {
      this.$subscribeTo(profilePhotoObservable.asObservable(), (image: Image) => {
        if (this.user) {
          this.user.coverPhoto = image;
        }
      })
    }
  }
</script>


