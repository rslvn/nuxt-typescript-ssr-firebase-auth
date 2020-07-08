<template>
  <div class="container">
    <PageTitle :title="$t('page.images.title')" />

    <div v-for="(image,index) in images" :key="index" class="columns has-text-centered">
      <div class="column">
        <div>{{ $t('page.images.original') }}</div>
        <img :src="image.src" :alt="image.alt">
      </div>

      <div class="column">
        <div>{{ $t('page.images.roundedNoBorder') }}</div>
        <BackgroundSquareImage :image-url="image.src" :rounded="true" size="200" auto-margin="true" />
      </div>

      <div class="column">
        <div>{{ $t('page.images.squareNoBorder') }}</div>
        <BackgroundSquareImage :image-url="image.src" :rounded="false" size="200" auto-margin="true" />
      </div>

      <div class="column">
        <div>{{ $t('page.images.roundedWithBorder') }}</div>
        <BackgroundSquareImage :image-url="image.src" rounded="true" size="200" border="10" auto-margin="true" />
      </div>

      <div class="column">
        <div>{{ $t('page.images.squareWithBorder') }}</div>
        <BackgroundSquareImage
          :image-url="image.src"
          rounded="false"
          size="200"
          border="5"
          border-color="cyan"
          auto-margin="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue'
import { Routes } from '~/types'
import { getHeadByRouteType } from '~/service/seo-service'
import PageTitle from '~/components/ui/PageTitle.vue'

  @Component({
    components: { PageTitle, BackgroundSquareImage }
  })
export default class images extends Vue {
    head () {
      return getHeadByRouteType(Routes.IMAGES, this)
    }

    get images () {
      return [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/images%2Fsquare-640.png?alt=media&token=2b1672c9-3a27-4e7a-b4f1-80e8c76e09db',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/images%2Fhistorical-museum.jpg?alt=media&token=409c02a1-a73d-4ecb-bfc2-4f47c0659fc3',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fhorse-430441_640.jpg?alt=media&token=dcc95b74-99e8-40b4-bad3-cca6e0077dd3',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Flilac-flower-5239959_640.jpg?alt=media&token=5c3d6615-164d-413f-bea3-700457992ad1',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fpoppy-5239343_1280.jpg?alt=media&token=e94e6cb8-3d1f-418b-aca0-b4857d6467bb',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fbattle-5200951_1280.jpg?alt=media&token=795c632c-e1f3-4ba2-bf09-29238ec4f927',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Ffantasy-5238022_1280.jpg?alt=media&token=4d791d12-d037-42b9-ba27-f7b4e52d4048',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fballoon-hot-air-5232909_1280.jpg?alt=media&token=bc5fe2df-b2bb-4f57-b482-93ded819a96a',
          alt: 'lightbox picture'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/lighbox%2Fautumn-219972.jpg?alt=media&token=4e4c295f-2300-44b8-8611-12c7ffd262cf',
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
  }
</script>
