<template>

  <section class="section">
    <div class="columns has-same-height is-gapless">
      <div class="column">
        <div class="hero-body is-centered">
          <figure class="image is-128x128">
            <img class="is-rounded" :src="storedUser.profilePicture.src" :alt="storedUser.profilePicture.alt">
          </figure>
        </div>
      </div>
      <div class="column">
        <UserCard :user="storedUser"/>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { StateNamespace, StoredUser } from "~/lib/types";
  import UserCard from "~/components/card/UserCard.vue";

  @Component({
    components: { UserCard },
  })
  export default class Account extends Vue {

    @StateNamespace.auth.Getter storedUser !: StoredUser;

  }
</script>
