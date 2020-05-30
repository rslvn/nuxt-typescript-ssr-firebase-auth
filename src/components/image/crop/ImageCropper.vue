<template>
  <div>
    <img ref="imageCropRef" :src="image.src" crossorigin>
    <slot name="preview"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Ref, Vue } from 'nuxt-property-decorator';
  import { Image } from '~/types';
  import Cropper from "cropperjs";

  @Component({
    components: {}
  })
  export default class ImageCropper extends Vue {
    @Ref('imageCropRef') readonly imageCropRef !: HTMLImageElement
    @Prop({ required: true }) image !: Image
    @Prop({ type: Function, required: true }) preview !: (cropped: string) => void

    cropper: Cropper | null = null

    mounted() {
      console.log('imageCropRef', this.imageCropRef, 'image', this.image)
      this.cropper = new Cropper(this.imageCropRef, {
        aspectRatio: 1,
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
            width: 300,
            height: 300,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'low',
          });

          this.preview(canvas?.toDataURL("image/jpg", 1) as string)
        }
      });
    }

  }
</script>
