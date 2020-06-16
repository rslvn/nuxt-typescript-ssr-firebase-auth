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
  import { AuthUser, StateNamespace, User } from '~/types';
  import { getUser } from '~/service/firebase/firestore';

  @Component({
    components: { ProfileUpdateForm }
  })
  export default class settings extends Vue {

    user: User | null = null

    @StateNamespace.auth.Getter authUser !: AuthUser;

    async created() {
      await getUser(this.authUser.userId)
        .then((user: User) => {
          this.user = user
        })
    }

  }
</script>
