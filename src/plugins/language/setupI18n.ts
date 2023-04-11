import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import zh_CN from './lang/zh'
import en_US from './lang/en'

const geI18n = async () => {
  let i18n = null
  let { default: defaultFn } = await import('@/store/config')
  let { language } = defaultFn()
  i18n = createI18n({
    legacy: false,
    locale: language, // 默认语言为中文
    silentTranslationWarn: true,
    messages: {
      ...zh_CN,
      ...en_US
    }
  })
  return i18n
}

export const setupI18n = async (app: App) => {
  let i18n = await geI18n()
  app.use(i18n)
}
// //导出语言切换使得在其他js文件中也能使用多语言
export const i18nText = async (val: any) => {
  let i18n = await geI18n()
  try {
    const { t } = i18n.global
    return t(val)
  } catch (error) {
    console.log(error);
  }
}