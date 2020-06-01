<template>
  <div class="has-text-centered">
    <button class="button is-primary is-medium"
            @click="showLightbox">
      Launch image modal
    </button>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Lightbox from '~/components/image/lightbox/Lightbox.vue';

  @Component({
    components: { Lightbox }
  })
  export default class lightbox extends Vue {
    get images() {
      return [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fautumn-219972.jpg?alt=media&token=4e4c295f-2300-44b8-8611-12c7ffd262cf',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fbarley-5233734.jpg?alt=media&token=8ea1baf6-be24-4165-851f-ce423c58f0d6',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fbee-5219887.jpg?alt=media&token=f9142449-181d-42f3-8d8c-aa39fe81561b',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fdandelion-445228.jpg?alt=media&token=d0afbf98-8e01-4d2a-87ae-88558bb8363b',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Ffall-1072821_1920.jpg?alt=media&token=e5fd527c-ccd5-4aa9-973f-3e25c6df5ee0',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fhorse-430441_640.jpg?alt=media&token=dcc95b74-99e8-40b4-bad3-cca6e0077dd3',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fsunset-2021266.jpg?alt=media&token=373932d9-fb0f-44f7-965f-bc6a4f8cc9f3',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fwood-1350175_640.jpg?alt=media&token=078321ad-a102-4006-9838-a17470325369',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fboard.jpg?alt=media&token=8413214d-852b-4e14-b3cf-ff4a894e57da',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fpunta.jpg?alt=media&token=05671167-d88b-43c3-8978-d46e6e37b2a2',
          alt: 'lightbox picture'
        }
      ]
    }

    showLightbox() {
      this.$buefy.modal.open({
        parent: this,
        component: Lightbox,
        hasModalCard: false,
        trapFocus: true,
        canCancel: true,
        props: {
          images: this.images,
          initialIndex: 20,
        }
      })
    }
  }
</script>
