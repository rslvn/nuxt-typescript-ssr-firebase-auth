<template>
  <div class="container">
    <div class="columns">
      <div class="column has-text-centered">
        <b-upload v-model="file"
                  drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon
                  icon="upload"
                  size="is-large">
                </b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </div>
    </div>

    <div v-if="imageToCrop" class="columns is-half-height">
      <div class="column is-full-mobile is-three-quarters-fullhd">
        <ImageCropper :image="imageToCrop" :height="400" :width="400" :preview="setPreview" class="height-50vh"/>
      </div>

      <div v-if="previewSrc" class="columns is-vcentered">
        <div class="column has-text-centered">
          <h3 class="h3 has-margin-bottom-30">Preview</h3>
          <img v-if="previewSrc" :src="previewSrc" class="profile-200"/>
          <img v-if="previewSrc" :src="previewSrc" class="profile-200-round has-margin-top-15"/>
          <div class="buttons is-centered has-margin-top-30">
            <b-button>Save</b-button>
            <b-button>Cancel</b-button>
          </div>
        </div>
      </div>
    </div>

    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
  import { Image } from '~/types';
  import { getNewFileName } from '~/service/global-service';
  import ImageCropper from '~/components/image/crop/ImageCropper.vue';

  @Component({
    components: { ImageCropper }
  })
  export default class ProfilePhotoUpdater extends Vue {
    @Prop({ required: false }) image !: Image

    isLoading = true
    isFullPage = true
    file: File | null = null
    imageToCrop: Image | null = this.image || null
    previewSrc: string | null = null

    @Watch('file')
    onFileChanged(file: File, oldFile: File) {
      this.imageToCrop = {
        src: URL.createObjectURL(file),
        alt: 'alt',
        default: false,
        // name: this.parentFolderRef + getNewFileName(file.name)
        name: getNewFileName(file.name)
      };
    }

    setPreview(croppedForPreview: string) {
      this.previewSrc = croppedForPreview
      this.isLoading = false
    }

  }
</script>
