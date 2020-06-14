<template>
  <ValidationProvider
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
    ref="provider"
  >
    <b-upload v-model="file">
      <slot name="button">
        <a class="button is-light">
          <b-icon icon="camera"></b-icon>
        </a>
      </slot>
    </b-upload>
  </ValidationProvider>
</template>

<script lang="ts">
  import { Component, Prop, Ref, Vue, Watch } from 'nuxt-property-decorator'
  import { TaskEvent, TaskState } from '~/plugins/fire-init-plugin'
  import { handleError } from '~/service/error-service'
  import { Image, StateNamespace } from "~/types";
  import { ValidationProvider } from "vee-validate";
  import { ValidationResult } from 'vee-validate/dist/types/types';

  @Component({
    components: { ValidationProvider }
  })
  export default class SingleFileUploadWithValidation extends Vue {

    @Ref('provider') readonly provider !: any

    @Prop({ type: String, required: true }) parentFolderRef !: string
    @Prop({ type: String, required: true }) vid !: string;
    @Prop({ type: String, required: true }) rules !: string;
    @Prop({ type: Function, required: true }) getAltValue !: (fileName: string) => string
    @Prop({ type: Function, required: true }) uploadCompleted !: (image: Image) => void

    file: File | null = null
    fileName = ''
    uploadTask: firebase.storage.UploadTask | null = null

    @StateNamespace.loading.Mutation setLoading !: (loading: boolean) => void;

    @Watch('file')
    async onFileChanged(file: File, oldFile: File) {
      let { valid, errors } = await this.provider?.validate() as ValidationResult;

      console.log('Valid >>> ', valid, 'errors: ', errors, 'type of', typeof this.provider)

      // this.setLoading(true);
      // this.fileName = this.parentFolderRef + getNewFileName(file.name)
      // this.uploadTask = storage.ref().child(this.fileName).put(file)
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
