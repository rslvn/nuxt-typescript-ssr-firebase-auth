<template>
  <div>
    <img ref="imageCropRef" class="img-container" :src="image.src" crossorigin>
    <slot name="preview" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'nuxt-property-decorator'
import Cropper from 'cropperjs'
import { Image } from 'types-module'

@Component({
  components: {}
})
export default class ImageCropper extends Vue {
  @Ref('imageCropRef') readonly imageCropRef: HTMLImageElement
  @Prop({ required: true }) image: Image
  @Prop({ type: Number, required: true }) width: number
  @Prop({ type: Number, required: true }) height: number
  @Prop({ type: Function, required: true }) preview: (cropped: string) => void

  cropper: Cropper|null = null

  mounted () {
    this.initiateCropper()
  }

  updated () {
    if (this.cropper) {
      this.cropper.destroy()
    }
    this.initiateCropper()
  }

  initiateCropper () {
    this.cropper = new Cropper(this.imageCropRef, {
      aspectRatio: this.width / this.height,
      viewMode: 0,
      background: false,
      modal: true,
      zoomable: true,
      guides: true,
      dragMode: 'move',
      movable: true,
      highlight: true,
      responsive: true,
      cropBoxResizable: true,
      crop: () => {
        const canvas = this.cropper?.getCroppedCanvas({
          width: this.width,
          height: this.height,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'low'
        })

        this.preview(canvas?.toDataURL('image/jpg', 1) as string)
      }
    })
  }
}
</script>
