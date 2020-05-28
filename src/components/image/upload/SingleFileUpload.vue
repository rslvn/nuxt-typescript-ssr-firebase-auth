<template>
  <b-upload v-model="file" accept="image/*" :loading="loading">
    <a class="button is-light">
      <b-icon icon="camera"></b-icon>
    </a>
  </b-upload>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
  import { getNewFileName } from '~/service/global-service'
  import { storage, TaskEvent, TaskState } from '~/plugins/fire-init-plugin'
  import { handleError } from '~/service/error-service'
  import { Image } from "~/types";

  @Component({
    components: {}
  })
  export default class SingleFileUpload extends Vue {

    @Prop({ type: String, required: true }) parentFolderRef !: string
    @Prop({ type: Function, required: true }) getAltValue !: (fileName: string) => string
    @Prop({ type: Function, required: true }) uploadCompleted !: (image: Image) => void

    loading = false
    file: File | null = null
    fileName = ''
    uploadTask : firebase.storage.UploadTask | null = null

    @Watch('file')
    onFileChanged(file: File, oldFile: File) {
      this.fileName = this.parentFolderRef + getNewFileName(file.name)
      this.uploadTask = storage.ref().child(this.fileName).put(file)
      console.log('onFileChanged: ', this.fileName)
    }

    @Watch('uploadTask')
    onUploadTaskChanged(val: any, oldVal: any) {
      this.uploadTask?.on(TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          switch (snapshot.state) {
            case TaskState.PAUSED: // or 'paused'
              break;
            case TaskState.RUNNING: // or 'running'
              break;
          }
        },
        this.handleFireStorageError,
        () => {
          this.uploadTask?.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              let image: Image = {
                name: this.fileName,
                src: downloadURL,
                alt: this.getAltValue(this.file?.name || ''),
                default: false
              }
              this.uploadCompleted(image)
            });
        });
    }

    handleFireStorageError = (error: Error): any => {
      handleError(this.$store.dispatch, error)
    }

  }
</script>
