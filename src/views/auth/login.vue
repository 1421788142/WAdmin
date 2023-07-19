<script setup lang="ts">
import { shallowRef, ref, watchEffect } from "vue";
import loginFormVue from "./components/loginForm.vue";
import phoneLogin from "./components/phoneLogin.vue";
import codeLogin from "./components/codeLogin.vue";
import registerForm from "./components/registerForm.vue";
import config from "@/store/config";
import { getAssets } from "@/utils/util";
import { useI18n } from "vue-i18n";
import { WAdminConfig } from "@/store/interface";

const { VITE_PROJECT_NAME, VITE_PROJECT_LOGO } = import.meta.env;
const { t, locale } = useI18n();
const { getConfigState, setConfigState } = config();
const checked = ref<boolean>(false);
const language = ref<string>("");

watchEffect(() => {
  checked.value = getConfigState("isHasDark");
  language.value = getConfigState("language");
});
const iconStyle = { width: 20, height: 20 };
let switchDarkFn = null;
const chnageDark = (value: boolean) => {
  !switchDarkFn &&
    import("@/hooks/useTheme").then(({ useTheme }) => {
      let { switchDark } = useTheme();
      switchDarkFn = switchDark;
      switchDark(value);
    });
  switchDarkFn && switchDarkFn(value);
};

//获取类型，语言模块
const changLan = (value: WAdminConfig.state["language"]) => {
  setConfigState("language", value);
  locale.value = value;
};

let currentComp = shallowRef(loginFormVue);
let loginForm = {
  loginFormVue,
  phoneLogin,
  codeLogin,
  registerForm,
};
const compChange = (key: string) => {
  currentComp.value = loginForm[key];
};
</script>
<template>
  <div class="relative w-screen h-screen dark:bg-[#333]">
    <!-- 主题切换 -->
    <div
      class="fixed z-50 flex items-center md:top-10 top-5 md:right-10 right-5"
    >
      <a-switch v-model:checked="checked" @change="chnageDark">
        <template #checkedChildren>
          <w-svg-icon name="sun" :iconStyle="iconStyle" />
        </template>
        <template #unCheckedChildren>
          <w-svg-icon name="moon" :iconStyle="iconStyle" />
        </template>
      </a-switch>
      <a-dropdown :trigger="['click']">
        <span class="ml-4 leading-4 cursor-pointer">
          <translation-outlined :style="{ fontSize: '20px' }" />
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item
              @click="changLan('zh_CN')"
              :disabled="language === 'zh_CN'"
            >
              {{ t("sys.zhCN") }}
            </a-menu-item>
            <a-menu-item
              @click="changLan('en_US')"
              :disabled="language === 'en_US'"
            >
              {{ t("sys.enCN") }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <!-- 背景 -->
    <div class="absolute top-0 left-0 z-0 hidden h-full xl:flex">
      <img :src="getAssets('image/login_bg.png')" alt="login" />
    </div>
    <!-- 主体内容 -->
    <div class="flex items-center justify-center w-screen h-screen">
      <div
        class="w-[60%] h-[65%] p-20 items-center hidden xl:flex flex-col justify-center z-10"
      >
        <div class="w-full pl-40 mb-6">
          <div class="flex items-center w-full">
            <img
              class="max-w-[70px] mr-[1%]"
              :src="getAssets(VITE_PROJECT_LOGO)"
            />
            <span class="text-3xl font-black">
              {{ VITE_PROJECT_NAME }}
            </span>
          </div>
          <div>输入您的个人详细信息开始使用！</div>
        </div>
        <div class="w-[70%]">
          <a-carousel autoplay>
            <img :src="getAssets('image/login_banner1.png')" alt="login" />
            <img :src="getAssets('image/login_banner2.png')" alt="login" />
          </a-carousel>
        </div>
      </div>
      <div
        class="w-[100%] xl:w-[50%] h-[100%] px-2 flex items-center justify-center"
      >
        <div
          class="w-[100%] sm:w-[60%] xl:w-[65%] overflow-hidden mx-auto shadow-2xl bg-white dark:bg-[#333] rounded-2xl p-[2.5vw]"
        >
          <div class="mb-6 text-4xl font-bold">{{ t("sys.Sign") }}</div>
          <transition appear name="login-transform" mode="out-in">
            <component :is="currentComp" @change="compChange"></component>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
/* fade-transform */
.login-transform-leave-active,
.login-transform-enter-active {
  transition: all 0.5s;
}

.login-transform-enter-from {
  opacity: 0;
  transition: all 0.5s;
  transform: translateX(-60px);
}

.login-transform-leave-to {
  opacity: 0;
  transition: all 0.5s;
  transform: translateX(60px);
}
</style>
