<template>

  <div v-if="isRounded" class="circle" :style="borderStyle">
    <div class="bg-image rounded-50" :style="imageStyle"></div>
  </div>

  <div v-else :style="borderStyle">
    <div class="bg-image" :style="imageStyle"/>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { toBoolean } from '~/service/global-service';

  @Component({
    components: {}
  })
  export default class BackgroundSquareImage extends Vue {

    @Prop({ type: String, required: true }) imageUrl !: string
    @Prop({ type: [Number, String], required: true }) height !: number
    @Prop({ type: [Number, String], required: false, default: 0 }) width !: number
    @Prop({ type: [Boolean, String], required: false, default: false }) rounded !: boolean | string
    @Prop({ type: [Number, String], required: false, default: 0 }) border !: number
    @Prop({ type: String, required: false, default: '#eee' }) borderColor !: string
    @Prop({ type: [Boolean, String], required: false, default: true }) borderInside !: boolean | string
    @Prop({ type: [Boolean, String], required: false, default: false }) autoMargin !: boolean | string

    get isRounded() {
      return toBoolean(this.rounded);
    }

    get isAutoMargin() {
      return toBoolean(this.autoMargin);
    }

    get isBorderInside() {
      return toBoolean(this.borderInside);
    }

    get imageWidthPx() {
      if (this.width === 0)
        return 'auto'
      return this.isBorderInside ? `${this.width - 2 * this.border}px` : `${this.width}px`
    }

    get imageHeightPx() {
      return this.isBorderInside ? `${this.height - 2 * this.border}px` : `${this.height}px`
    }

    get borderWidthPx() {
      if (this.width === 0)
        return 'auto'
      return this.isBorderInside ? `${(this.width)}px` : `${(this.width + 2 * this.border)}px`
    }

    get borderHeightPx() {
      return this.isBorderInside ? `${(this.height)}px` : `${(this.height + 2 * this.border)}px`
    }

    get imageStyle() {
      return {
        'background-image': `url('${this.imageUrl}')`,
        height: this.imageHeightPx,
        width: this.imageWidthPx,
        ...this.marginByBorder
      }
    }

    get borderStyle() {
      return this.border > 0 ?
        {
          height: this.borderHeightPx,
          width: this.borderWidthPx,
          border: `${this.border}px solid ${this.borderColor}`,
          ...this.margin
        } :
        {}
    }

    get marginByBorder() {
      return this.border <= 0 && this.isAutoMargin ? { margin: '1em auto' } : {}
    }

    get margin() {
      return this.isAutoMargin ? { margin: '1em auto' } : {}
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
