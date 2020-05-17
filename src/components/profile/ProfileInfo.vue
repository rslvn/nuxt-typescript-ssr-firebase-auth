<template>
  <div class="box">

    <b-field :label="$t('card.user.userId')" horizontal>
      <span>{{ user.userId }}</span>
    </b-field>

    <b-field :label="$t('card.user.name')" label-position="on-border" horizontal>
      <span>{{ user.name }}</span>
    </b-field>

    <b-field v-if="user.email" :label="$t('card.user.email')" horizontal>
      <b-field grouped>
        <span>{{ user.email }}</span>
        <b-tooltip v-if="user.verified" :label="$t('card.user.mailVerified')">
          <b-icon type="is-success"
                  class="has-margin-left-15"
                  pack="fas"
                  icon="check"/>
        </b-tooltip>

        <b-tooltip v-else :label="$t('card.user.mailNotVerified')">
          <b-icon type="is-warning"
                  class="has-margin-left-15"
                  pack="fas"
                  icon="exclamation-triangle"/>
        </b-tooltip>

      </b-field>
    </b-field>

    <!--    <b-field horizontal>-->
    <!--      <template slot="label">-->
    <!--        <b-field grouped>-->
    <!--          <b-icon-->
    <!--            pack="fab"-->
    <!--            icon="google">-->
    <!--          </b-icon>-->
    <!--          <span class="has-margin-left-5">Google:</span>-->
    <!--        </b-field>-->
    <!--      </template>-->
    <!--      <span>{{user.email }}</span>-->
    <!--    </b-field>-->

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { StoredUser } from "~/types";

  @Component({
    components: {}
  })
  export default class ProfileInfo extends Vue {

    @Prop({ required: true }) user !: StoredUser

  }
</script>
