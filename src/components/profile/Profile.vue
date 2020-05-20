<template>
  <div>
    <div class="columns is-mobile">

      <div class="column">
        <b-field position="is-centered" grouped>
          <ProfilePictureCard :user="user"/>
        </b-field>
      </div>

    </div>

    <div class="columns is-mobile">

      <div class="column">
        <h2 class="subtitle">{{$t('card.user.title')}}</h2>
        <ProfileInfo :user="user"/>
      </div>

    </div>

    <div class="columns is-mobile">

      <div class="column">
        <h2 class="subtitle">{{$t('card.linkedAccounts.title')}}</h2>
        <ProviderList :user="user"/>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { StoredUser } from "~/types";
  import ProfileInfo from "~/components/profile/ProfileInfo.vue";
  import ProfilePictureCard from "~/components/profile/ProfilePictureCard.vue";
  import ProviderList from "~/components/profile/ProviderList.vue";

  @Component({
    components: { ProviderList, ProfilePictureCard, ProfileInfo },
  })
  export default class Profile extends Vue {

    @Prop({ required: true }) user !: StoredUser;

  }
</script>


