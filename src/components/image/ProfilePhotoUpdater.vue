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

    <div v-if="previewSrc" class="columns">
      <div class="column is-three-quarters-fullhd">
        <div class="buttons is-centered">
          <b-button>Kaydet</b-button>
          <b-button>Cancel</b-button>
        </div>
      </div>
    </div>

    <div class="columns">
      <div v-if="imageToCrop" class="column is-full-mobile is-three-quarters-fullhd">
        <ImageCropper :image="imageToCrop" :preview="setPreview"/>
      </div>

      <div v-if="previewSrc" class="columns is-vcentered">
        <div class="column has-text-centered">
          <img v-if="previewSrc" :src="previewSrc" class="profile-200 has-margin-top-15"/>
          <img v-if="previewSrc" :src="previewSrc" class="profile-200-round"/>
        </div>
      </div>
    </div>

    <div v-if="previewSrc" class="columns">
      <div class="column is-three-quarters-fullhd">
        <div class="buttons is-centered">
          <b-button>Kaydet</b-button>
          <b-button>Cancel</b-button>
        </div>
      </div>
    </div>
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
    // @Prop({ type: String, required: true }) parentFolderRef !: string

    loading = false
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
      }
    }

    setPreview(croppedForPreview: string) {
      this.previewSrc = croppedForPreview
    }

  }
</script>
