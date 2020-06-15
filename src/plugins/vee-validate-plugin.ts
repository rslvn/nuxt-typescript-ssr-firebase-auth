import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { configure, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { QueryParameters, SupportedLanguages } from '~/types';

for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  })
}

const setLanguageFromQuery = (langQuery: string, app: NuxtAppOptions) => {
  if (!langQuery) {
    return
  }

  let supportedLanguage = SupportedLanguages.find(
    (language) => language.code === langQuery
  )

  if (supportedLanguage) {
    app.i18n.setLocale(supportedLanguage.code)
  }
}

const veeValidatePlugin: Plugin = ({ app, query }) => {
  // beforeLanguageSwitch called right before setting a new locale
  // app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
  //   console.log('beforeLanguageSwitch', oldLocale, newLocale)
  // };
  // // onLanguageSwitched called right after a new locale has been set
  // app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
  //   console.log('onLanguageSwitched', oldLocale, newLocale)
  // };

  let langQuery = query[QueryParameters.LANG] as string
  setLanguageFromQuery(langQuery, app)

  configure({
    // @ts-ignore
    defaultMessage: (field: string, values: Record<string, any>) => {
      values._field_ = app.i18n.t(`${field}`)
      return app.i18n.t(`validation.${values._rule_}`, values)
    },
  })
}

export default veeValidatePlugin
