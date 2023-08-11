import { App } from "vue";
import { createI18n } from "vue-i18n";
import zh_CN from "@/lang/zh";
import en_US from "@/lang/en";
import config from "@/store/config";

let language = "zh-CN";
let i18n = createI18n({
  legacy: false,
  locale: language, // 默认语言为中文
  silentTranslationWarn: true,
  globalInjection: true, // 全局模式，可以直接使用 $t
  allowComposition: true,// 允许组合式api
  messages: {
    ...zh_CN,
    ...en_US,
  },
});

export default i18n;
export function setupI18n(app: App) {
  i18n.global.locale.value = config().getConfigState("language") || language;
  app.use(i18n);
}
type I18Fun = typeof i18n.global.t;

/** 配合i18n Ally插件来进行国际化智能提示，（提示起作用） */
export const $$t: I18Fun = function (...args): string {
  try {
    const { t } = i18n.global;
    return t.apply(this, args);
  } catch (error) {
    console.log(error);
  }
};
//导出$$t使得在其他js文件中也能使用多语言
