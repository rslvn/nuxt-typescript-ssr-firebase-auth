<template>

  <div v-if="rounded" class="circle" :style="borderStyle">
    <div class="bg-image rounded-50" :style="imageStyle"></div>
  </div>

  <div v-else :style="borderStyle">
    <div class="bg-image" :style="imageStyle"/>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { Image } from '~/types';

  @Component({
    components: {}
  })
  export default class BackgroundSquareImage extends Vue {

    @Prop({ required: true }) image !: Image
    @Prop({ type: [Number, String], required: true }) size !: number
    @Prop({ type: [Boolean, String], required: false, default: false }) rounded !: boolean
    @Prop({ type: [Number, String], required: false, default: 0 }) border !: number
    @Prop({ type: String, required: false, default: '#eee' }) borderColor !: string
    @Prop({ type: [Boolean, String], required: false, default: true }) borderInside !: boolean
    @Prop({ type: [Boolean, String], required: false, default: false }) autoMargin !: boolean

    get imageSizePx() {
      return this.borderInside ? `${this.size - 2 * this.border}px` : `${this.size}px`
    }

    get bodeSizerPx() {
      return this.borderInside ? `${(this.size)}px` : `${(this.size + 2 * this.border)}px`
    }

    get imageStyle() {
      return {
        'background-image': `url('${this.image.src}')`,
        height: this.imageSizePx,
        width: this.imageSizePx,
        ...this.marginByBorder
      }
    }

    get borderStyle() {
      return this.border > 0 ?
        {
          height: this.bodeSizerPx,
          width: this.bodeSizerPx,
          border: `${this.border}px solid ${this.borderColor}`,
          ...this.margin
        } :
        {}
    }

    get marginByBorder() {
      return this.border <= 0 && this.autoMargin ? { margin: '1em auto' } : {}
    }

    get margin() {
      return this.autoMargin ? { margin: '1em auto' } : {}
    }

  }
</script>

<style scoped>

  .bg-image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  .circle {
    display: block;
    /*margin: 1em auto;*/
    background-size: cover;
    background-repeat: no-repeat;
    /*background-position: center center;*/
    -webkit-border-radius: 99em;
    -moz-border-radius: 99em;
  }

</style>
