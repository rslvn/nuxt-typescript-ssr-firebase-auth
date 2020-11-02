import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { configure, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { QueryParameters, SupportedLanguages } from '~/types'
import { getUserByUsername } from '~/service/firebase/firestore'

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    params: [],
    ...validation
  })
}

const setLanguageFromQuery = (langQuery: string, app: NuxtAppOptions) => {
  if (!langQuery) {
    return
  }

  const supportedLanguage = SupportedLanguages.find(
    language => language.code === langQuery
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

  const langQuery = query[QueryParameters.LANG] + ''
  setLanguageFromQuery(langQuery, app)

  // CUSTOM RULES
  extend('username', {
    message: field => app.i18n.t('validation.username', { field }) + '',
    validate: (value, params: any) => getUserByUsername(value)
      .then((user) => {
        return user ? user.id === params[0] : true
      })
  })

  configure({
    // @ts-ignore
    defaultMessage: (field: string, values) => {
      values._field_ = app.i18n.t(`${field}`)
      return app.i18n.t(`validation.${values._rule_}`, values)
    }
  })
}

export default veeValidatePlugin
