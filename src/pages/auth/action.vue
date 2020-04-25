<template>
  <section class="section">
    <div v-if="isLoading" class="container is-fullhd">
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <b-notification type="is-success" :closable="false">
            <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false">
              <b-icon
                pack="fas"
                icon="sync-alt"
                custom-class="fa-spin">
              </b-icon>
              {{ $t('page.action.processing')}}

            </b-loading>
          </b-notification>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import {
    FirebaseAuthAction,
    FirebaseAuthActionParams,
    RouteParameters,
    RouteType,
    StateNamespace
  } from "~/types";

  @Component({
    components: {},
    asyncData: async ({ query, error, route }) => {

      let action = (query[FirebaseAuthActionParams.ACTION] as string)?.trim();
      let actionCode = (query[FirebaseAuthActionParams.ACTION_CODE] as string)?.trim();

      if (!action || !actionCode) {
        // return;
        throw error({
          statusCode: 403,
          message: 'No action or action code',
          path: route.path
        });
      }

      return {
        action,
        actionCode
      }
    }
  })
  export default class Action extends Vue {
    action: string = '';
    actionCode: string = '';

    isLoading = true;
    isFullPage = false;

    @StateNamespace.auth.Action handleVerifyEmail !: (actionCode: string) => Promise<any>;
    @StateNamespace.auth.Action handleVerifyPasswordResetCode !: (actionCode: string) => Promise<boolean>;

    mounted() {
      console.log('Action: ' + this.actionCode);

      switch (this.action) {
        case FirebaseAuthAction.VERIFY_EMAIL:
          this.handleVerifyEmail(this.actionCode)
            .then(() => this.isLoading = false);
          break;

        case FirebaseAuthAction.RECOVERY_EMAIL:

          break;
        case FirebaseAuthAction.RESET_PASSWORD:
          this.handleVerifyPasswordResetCode(this.actionCode)
            .then((validActionCode) => {
              this.isLoading = false;
              if (validActionCode) {
                this.$router.replace({
                  ...RouteType.RESET_PASSWORD,
                  query: {
                    [RouteParameters.actionCode]: this.actionCode
                  }
                });
              }
            });

          break;
        default:
          console.log('Invalid action: ', this.action)
      }
    }
  }
</script>
