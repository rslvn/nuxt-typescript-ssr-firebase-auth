<template>
  <div>
    <figure class="crop-to-fit">
      <img :src="image.src" :alt="image.alt">
    </figure>

    <div
      class="carousel-arrow"
    >
      <b-icon
        v-if="hasPrevious"
        class="has-icons-left is-hovered"
        pack="mdi"
        icon="mdi mdi-chevron-left"
        size="is-medium"
        both
        @click.native.prevent="previous"
      />
      <b-icon
        v-if="hasNext"
        class="has-icons-right"
        pack="mdi"
        icon="mdi mdi-chevron-right"
        size="is-medium"
        both
        @click.native.prevent="next"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Image } from 'common-types'

@Component({
  components: {}
})
export default class Lightbox extends Vue {
  @Prop({ type: Array, required: true }) images: Image[]
  @Prop({ type: Number, required: false, default: 0 }) initialIndex: number

  maxIndex = this.images.length - 1;
  index = this.maxIndex < this.initialIndex || this.initialIndex < 0 ? 0 : this.initialIndex

  get image () {
    return this.images[this.index]
  }

  get hasNext () {
    return this.index < this.maxIndex
  }

  next () {
    if (!this.hasNext) {
      return
    }
    this.index++
  }

  get hasPrevious () {
    return this.index > 0
  }

  previous () {
    if (!this.hasPrevious) {
      return
    }
    this.index--
  }
}
</script>
