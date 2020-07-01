<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <ProfileUpdateForm :user="user"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component } from 'nuxt-property-decorator';
  import ProfileUpdateForm from '~/components/form/ProfileUpdateForm.vue';
  import { reloadUserFromDatabase } from '~/service/rx-service';
  import BaseModule from '~/mixin/BaseModule';

  @Component({
    components: { ProfileUpdateForm }
  })
  export default class ProfileSettings extends BaseModule {

    created() {
      reloadUserFromDatabase.next()
    }

  }
</script>
