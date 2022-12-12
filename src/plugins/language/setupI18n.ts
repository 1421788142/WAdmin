import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import zh_CN from './lang/zh'
import en_US from './lang/en'
let config = localStorage.getItem('XiaoWuAdminConfig')
let language = config ? JSON.parse(config).language : 'zh_CN'
let i18n = createI18n({
    legacy: false,
    locale: language, // 默认语言为中文
    silentTranslationWarn: true,
    messages: {
      ...zh_CN,
      ...en_US
    }
})
export  default  i18n
export function setupI18n(app:App){
  app.use(i18n)
}
// //导出语言切换使得在其他js文件中也能使用多语言
export function i18nText(val:any) {
    try {
      const { t } = i18n.global
      return t(val)
    } catch (error) {
      console.log(error);
    }
}
