<template>
  <b-upload v-model="file" accept="image/*">
    <slot name="button">
      <a class="button is-light">
        <b-icon icon="camera"></b-icon>
      </a>
    </slot>
  </b-upload>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
  import { getNewFileName } from '~/service/global-service'
  import { storage, TaskEvent, TaskState } from '~/plugins/fire-init-plugin'
  import { handleError } from '~/service/error-service'
  import { Image, StateNamespace } from "~/types";

  @Component({
    components: {}
  })
  export default class SingleImageUpload extends Vue {

    @Prop({ type: String, required: true }) parentFolderRef !: string
    @Prop({ type: Function, required: true }) getAltValue !: (fileName: string) => string
    @Prop({ type: Function, required: true }) uploadCompleted !: (image: Image) => void

    file: File | null = null
    fileName = ''
    uploadTask: firebase.storage.UploadTask | null = null

    @StateNamespace.loading.Mutation setLoading !: (loading: boolean) => void;

    @Watch('file')
    onFileChanged(file: File, oldFile: File) {
      this.setLoading(true);
      this.fileName = this.parentFolderRef + getNewFileName(file.name)
      this.uploadTask = storage.ref().child(this.fileName).put(file)
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
              this.setLoading(false)
            });
        });
    }

    handleFireStorageError = (error: Error): any => {
      handleError(this.$store.dispatch, error)
    }

  }
</script>
