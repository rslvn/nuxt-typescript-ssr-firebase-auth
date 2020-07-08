<template>
  <div v-if="isRounded" class="circle" :style="borderStyle">
    <div class="bg-image rounded-50" :style="imageStyle" />
  </div>

  <div v-else :style="borderStyle">
    <div class="bg-image" :style="imageStyle" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { toBoolean } from '~/service/global-service'

  @Component({
    components: {}
  })
export default class BackgroundSquareImage extends Vue {
    @Prop({ type: String, required: true }) imageUrl : string
    @Prop({ type: [Number, String], required: true }) size : number
    @Prop({ type: [Boolean, String], required: false, default: false }) rounded : boolean | string
    @Prop({ type: [Number, String], required: false, default: 0 }) border : number
    @Prop({ type: String, required: false, default: '#eee' }) borderColor : string
    @Prop({ type: [Boolean, String], required: false, default: true }) borderInside:boolean | string
    @Prop({ type: [Boolean, String], required: false, default: false }) autoMargin:boolean | string

    get isRounded () {
      return toBoolean(this.rounded)
    }

    get isAutoMargin () {
      return toBoolean(this.autoMargin)
    }

    get isBorderInside () {
      return toBoolean(this.borderInside)
    }

    get imageSizePx () {
      return this.isBorderInside ? `${this.size - 2 * this.border}px` : `${this.size}px`
    }

    get borderSizePx () {
      return this.isBorderInside ? `${(this.size)}px` : `${(this.size + 2 * this.border)}px`
    }

    get imageStyle () {
      return {
        'background-image': `url('${this.imageUrl}')`,
        height: this.imageSizePx,
        width: this.imageSizePx,
        ...this.marginByBorder
      }
    }

    get borderStyle () {
      return this.border > 0
        ? {
          height: this.borderSizePx,
          width: this.borderSizePx,
          border: `${this.border}px solid ${this.borderColor}`,
          ...this.margin
        }
        : {}
    }

    get marginByBorder () {
      return this.border <= 0 && this.isAutoMargin ? { margin: '1em auto' } : {}
    }

    get margin () {
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
