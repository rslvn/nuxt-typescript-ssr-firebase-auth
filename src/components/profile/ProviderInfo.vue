<template>
  <div>

    <b-field :label="$t('provider.info.uid')" horizontal>
      <span>{{ providerData.uid }}</span>
    </b-field>

    <b-field v-if="providerData.photoURL" :label="$t('provider.info.photoURL')" horizontal>
      <figure class="cropped-64x64">
        <img v-lazy="providerData.photoURL" :src="placeholder" alt="Picture of the provider" @error="imageLoadError">
      </figure>
    </b-field>

    <b-field v-if="providerData.displayName" :label="$t('provider.info.displayName')" horizontal>
      <span>{{ providerData.displayName }}</span>
    </b-field>

    <b-field v-if="providerData.email" :label="$t('provider.info.email')" horizontal>
      <span>{{ providerData.email }}</span>
    </b-field>

    <b-field v-if="providerData.phoneNumber" :label="$t('provider.info.phoneNumber')" horizontal>
      <span>{{ providerData.phoneNumber }}</span>
    </b-field>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { ProfilePhotoPlaceholder, ProviderData } from "~/types";

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
