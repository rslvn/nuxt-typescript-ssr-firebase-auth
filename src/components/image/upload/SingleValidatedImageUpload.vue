<template>
  <ValidationProvider
    ref="provider"
    :vid="vid"
    :name="label"
    :rules="rules"
  >
    <b-upload v-model="file" accept="image/*">
      <slot name="button">
        <a class="button is-light">
          <b-icon icon="camera" />
        </a>
      </slot>
    </b-upload>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'
import { ValidationResult } from 'vee-validate/dist/types/types'
import { Image } from 'types-module'
import { storage, TaskEvent, TaskState } from '~/plugins/fire-init-plugin'
import { handleError } from '~/service/error-service'
import { StateNamespace } from '~/types'
import { showErrorToaster, showWarningToaster } from '~/service/notification-service'
import { getNewFileName } from '~/service/global-service'

@Component({
  components: { ValidationProvider }
})
export default class SingleFileUploadWithValidation extends Vue {
  @Ref('provider') readonly provider: any

  @Prop({ type: String, required: true }) label: string
  @Prop({ type: String, required: true }) parentFolderRef: string
  @Prop({ type: Function, required: true }) getAltValue: (fileName: string) => string
  @Prop({ type: Function, required: true }) uploadCompleted: (image: Image) => void
  @Prop({ type: String, required: false, default: '' }) rules: string;
  @Prop({ type: String, required: false, default: 'uploadFile' }) vid: string;

  file: File|null = null
  fileName = ''
  uploadTask: firebase.storage.UploadTask|null = null

  @StateNamespace.loading.Mutation setLoading: (loading: boolean) => void;

  @Watch('file')
  async onFileChanged (file: File) {
    if (!file) {
      return
    }

    const { valid, errors } = await this.provider?.validate() as ValidationResult
    if (!valid) {
      showErrorToaster(errors[0])
      this.file = null
      return
    }

    this.setLoading(true)

    const delimiter = this.parentFolderRef.endsWith('/') ? '' : '/'
    this.fileName = `${this.parentFolderRef}${delimiter}${getNewFileName(file.name)}`

    this.uploadTask = storage.ref().child(this.fileName).put(file)
  }

  @Watch('uploadTask')
  onUploadTaskChanged () {
    return this.uploadTask?.on(TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        switch (snapshot.state) {
          case TaskState.RUNNING: // or 'running'
            break
          case TaskState.SUCCESS: // or 'running'
            break
          default:
            showWarningToaster(`upload status: ${snapshot.state}`)
            this.setLoading(false)
        }
      },
      this.handleFireStorageError,
      () => {
        return this.uploadTask?.snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
            const image: Image = {
              name: this.fileName,
              src: downloadURL,
              alt: this.getAltValue(this.file?.name || ''),
              default: false
            }
            this.uploadCompleted(image)
            this.setLoading(false)
          })
      })
  }

  handleFireStorageError = (error: Error): any => {
    handleError(this.$store.dispatch, error)
  }
}
</script>
