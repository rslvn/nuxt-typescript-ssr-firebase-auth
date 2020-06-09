<template>
  <div class="has-text-centered-mobile">
    <b-field :label="$t('common.field.id')" horizontal>
      <span> <small> {{ providerData.uid }} </small> </span>
    </b-field>

    <b-field :label="$t('common.field.photo')" horizontal>
      <img class="image-fit-cover square-64" v-lazy="providerData.photoURL" :src="placeholder"
           alt="Picture of the provider" @error="imageLoadError">
    </b-field>

    <b-field :label="$t('common.field.name')" horizontal>
      <span>{{ providerData.displayName }}</span>
    </b-field>

    <b-field :label="$t('common.field.email')" horizontal>
      <span>{{ providerData.email }}</span>
    </b-field>

    <b-field v-if="providerData.phoneNumber" :label="$t('common.field.phone')" horizontal>
      <span>{{ providerData.phoneNumber }}</span>
    </b-field>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ProfilePhotoPlaceholder, ProviderData } from '~/types';

  @Component({
    components: {}
  })
  export default class ProviderInfo extends Vue {

    @Prop({ type: Object, required: false }) providerData !: ProviderData;

    get placeholder() {
      return ProfilePhotoPlaceholder
    }

    imageLoadError(event: any) {
      event.target.src = ProfilePhotoPlaceholder
    }

  }
</script>
