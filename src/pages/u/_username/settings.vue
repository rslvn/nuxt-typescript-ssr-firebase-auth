<template>
  <div class="container is-fullhd">
    <div class="columns is-centered">
      <div class="column is-half">
        <ProfileUpdateForm v-if="user" :user="user"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import ProfileUpdateForm from '~/components/form/ProfileUpdateForm.vue';
  import { AuthUser, RouteParameters, StateNamespace, User } from '~/types';
  import { getUserByUsername } from '~/service/firebase/firestore';
  import { Context } from '@nuxt/types';

  @Component({
    components: { ProfileUpdateForm }
  })
  export default class settings extends Vue {

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

  }
</script>
