<template>
  <b-field class="file">
    <b-upload v-model="file" accept="image/*" :loading="loading">
      <a class="button is-light">
        <b-icon icon="camera"></b-icon>
      </a>
    </b-upload>
  </b-field>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
  import { getNewFileName } from '~/service/global-service'
  import { storage, TaskEvent, TaskState } from '~/plugins/fire-init-plugin'
  import { handleError } from '~/service/error-service'

  @Component({
    components: {}
  })
  export default class SingleFileUpload extends Vue {

    @Prop({ type: String, required: true }) parentFolderRef !: string
    @Prop({ type: Function, required: true }) uploadCompleted !: (fileUrl: string) => void

    loading = false
    file: File | null = null
    uploadTask: firebase.storage.UploadTask | null = null

    @Watch('file')
    onFileChanged(file: File, oldFile: File) {
      let fileName = this.parentFolderRef + getNewFileName(file.name);
      this.uploadTask = storage.ref().child(fileName).put(file)
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
              console.log('File available at', downloadURL)
              this.uploadCompleted(downloadURL)
            });
        });
    }

    handleFireStorageError = (error: Error): any => {
      handleError(this.$store.dispatch, error)
    }

  }
</script>
