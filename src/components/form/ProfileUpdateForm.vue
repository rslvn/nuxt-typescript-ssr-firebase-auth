<template>
  <div>
    <h3 class="title has-text-centered has-text-dark">{{ $t('form.profileUpdate.title')}}</h3>
    <div class="box">

      <ValidationObserver v-slot="{ passes }" tag="form">

        <BInputWithValidation
          v-model="updatedUser.name"
          :label="$t('common.field.name')"
          :placeholder="$t('common.field.namePlaceHolder')"
          rules="required|min:4"
          vid="name"
          class="has-margin-bottom-5"
        />

        <BInputWithValidation
          v-model="updatedUser.surname"
          :label="$t('common.field.surname')"
          :placeholder="$t('common.field.surnamePlaceHolder')"
          rules="required|min:4"
          vid="name"
          class="has-margin-bottom-5"
        />

        <BInputWithValidation
          v-model="updatedUser.biography"
          inputType="textarea"
          :label="$t('common.field.biography')"
          :placeholder="$t('common.field.biographyPlaceHolder')"
          rules=""
          vid="name"
          class="has-margin-bottom-5"
        />

        <div class="buttons">
          <b-button type="is-primary" icon-pack="fas"
                    icon-left="user-edit"
                    @click="passes(submit)">
            {{ $t('form.profileUpdate.submit')}}
          </b-button>

          <b-button type="is-primary" icon-pack="fas"
                    icon-left="user-edit"
                    @click="gotoProfile" outlined>
            {{ $t('common.back')}}
          </b-button>
        </div>

      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ValidationObserver } from "vee-validate";
  import { RouteType, StateNamespace, User } from '~/types';
  import BInputWithValidation from "~/components/ui/input/BInputWithValidation.vue";

  @Component({
    components: { ValidationObserver, BInputWithValidation }
  })
  export default class ProfileUpdateForm extends Vue {

    @Prop({ required: true }) user !: User
    updatedUser = this.user

    @StateNamespace.profile.Action saveUser !: (user: User) => Promise<void>;

    created() {
      console.log('ProfileUpdateForm: ', this.updatedUser)
    }

    submit() {
      this.saveUser(this.updatedUser)
        .then(() => {
          this.gotoProfile()
        })
    }

    gotoProfile() {
      this.$router.replace(RouteType.PROFILE)
    }

  }
</script>
