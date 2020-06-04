<template>
  <div>
    <h1 class="title">Masonry with Lightbox</h1>
    <h2 class="desc has-margin-bottom-15">Images</h2>

    <div class="masonry">
      <div v-for="(image,index) in images" :key="index" class="brick has-cursor-pointer" @click="showLightbox(index)">
        <img :src="image.src" :alt="image.alt"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Lightbox from '~/components/image/lightbox/Lightbox.vue';
  import { DefaultMeta, PageMeta, RouteType } from '~/types';
  import { getHead } from '~/service/seo-service';

  @Component({
    components: { Lightbox }
  })
  export default class lightbox extends Vue {

    pageMeta: PageMeta = {
      ...DefaultMeta,
      title: `Lightbox | ${DefaultMeta.title}`,
      url: `${DefaultMeta.url}${RouteType.LIGHT_BOX.path}`
    }

    head() {
      return getHead(this.pageMeta)
    }

    get images() {
      return [
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

    showLightbox(index: number) {
      this.$buefy.modal.open({
        parent: this,
        component: Lightbox,
        hasModalCard: false,
        trapFocus: true,
        canCancel: true,
        props: {
          images: this.images,
          initialIndex: index,
        }
      })
    }
  }
</script>
<style scoped>
  /* Defaults */
  body {
    background: #f9f9f9;
    color: #465665;
  }

  a {
    color: #5b7083;
    transition: all .25s ease-in-out;
  }

  /* The title */
  .title {
    font-weight: 700;
  }

  /* The description */
  .desc {
    font-size: 1em;
    font-style: italic;
    font-family: Georgia, serif;
  }

  /* Text-centering */
  .title,
  .desc,
  .intro {
    text-align: center;
  }

  /* Intro section */
  .intro {
    margin: 1.75em 0 .75em;
    border-bottom: 3px double rgba(0, 0, 0, 0.05);
    margin-bottom: 1.75em;
  }

  .intro a {
    opacity: .7;
  }

  .intro a:hover {
    opacity: 1;
  }

  .intro h3 {
    font-size: .825em;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
    margin: .25em .75em .75em;
  }

  .intro h3 a {
    font-weight: 400;
  }

  /* Masonry grid */
  .masonry {
    transition: all .5s ease-in-out;
    column-gap: 30px;
    column-fill: initial;
  }

  /* Masonry item */
  .masonry .brick {
    margin-bottom: 30px;
    display: inline-block; /* Fix the misalignment of items */
    vertical-align: top; /* Keep the item on the very top */
  }

  /* Masonry image effects */
  .masonry .brick img {
    transition: all .5s ease-in-out;
    backface-visibility: hidden; /* Remove Image flickering on hover */
  }

  .masonry .brick:hover img {
    opacity: .75;
  }

  /* Bordered masonry */
  .masonry.bordered {
    column-rule: 1px solid #eee;
    column-gap: 50px;
  }

  .masonry.bordered .brick {
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid #eee;
  }

  /* Gutterless masonry */
  .masonry.gutterless {
    column-gap: 0;
  }

  .masonry.gutterless .brick {
    margin-bottom: 0;
  }

  /* Masonry on tablets */
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    .masonry {
      column-count: 2;
    }
  }

  /* Masonry on big screens */
  @media only screen and (min-width: 1024px) {
    .desc {
      font-size: 1.25em;
    }

    .intro {
      letter-spacing: 1px;
    }

    .masonry {
      column-count: 3;
    }
  }

</style>
