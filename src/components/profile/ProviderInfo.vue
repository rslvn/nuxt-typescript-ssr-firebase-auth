<template>
  <div class="has-text-centered">
    <b-field :label="$t('common.field.id')" horizontal>
      <span> <small> {{ providerData.uid }} </small> </span>
    </b-field>

    <b-field :label="$t('common.field.photo')" horizontal>
      <BackgroundSquareImage :image-url="providerData.photoURL" size="64" auto-margin="true"/>
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
  import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue';

  @Component({
    components: { BackgroundSquareImage }
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
