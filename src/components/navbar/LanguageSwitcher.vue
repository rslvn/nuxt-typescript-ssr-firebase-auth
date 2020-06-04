<template>
  <b-navbar-dropdown>

    <template slot="label">
        <img class="image-fit-cover square-28" :src="activeLanguage.flag.src" :alt="activeLanguage.flag.alt">
    </template>

    <b-navbar-item v-for="(language,index) in languages" :key="index" :active="activeLanguage.code === language.code"
                   @click="changeLocale(language)">
      <div class="media">
        <figure class="image is-32x32 media-left">
          <img :src="language.flag.src" :alt="language.flag.alt">
        </figure>
        <div class="media-content">
          <h3>{{ language.name}}</h3>
        </div>
      </div>
    </b-navbar-item>
  </b-navbar-dropdown>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { SupportedLanguage, SupportedLanguages } from "~/types";

  @Component({
    components: {}
  })
  export default class LanguageSwitcher extends Vue {

    languages = SupportedLanguages;

    get activeLanguage() {
      return SupportedLanguages.find(value => value.code === this.$i18n.locale);
    }


    changeLocale(language: SupportedLanguage) {
      if (this.$i18n.locale === language.code) {
        return
      }

      this.$i18n.setLocale(language.code)
    }
  }
</script>
