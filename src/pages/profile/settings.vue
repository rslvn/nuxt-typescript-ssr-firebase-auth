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
  import { getUser } from '~/service/firebase/firestore-service';
  import { StateNamespace, StoredUser, User } from '~/types';

  @Component({
    components: { ProfileUpdateForm }
  })
  export default class settings extends Vue {

    user: User | null = null

    @StateNamespace.auth.Getter storedUser !: StoredUser;

    async created() {
      await getUser(this.storedUser.userId)
        .then((user: User) => {
          this.user = user
          console.log('settings: ', this.user)
        })
    }

  }
</script>
