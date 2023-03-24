<script setup lang="ts">
import { shallowRef, ref, watchEffect } from 'vue'
import loginFormVue from './components/loginForm.vue';
import phoneLogin from './components/phoneLogin.vue';
import codeLogin from './components/codeLogin.vue';
import registerForm from './components/registerForm.vue';
import config from '@/store/config';
import { getAssetsImage } from '@/utils/util';

const { VITE_PROJECT_NAME, VITE_PROJECT_LOGO } = import.meta.env

const { getConfigState } = config()
const checked = ref<boolean>(false)
watchEffect(()=>{
    checked.value = getConfigState('isHasDark')
})
const iconStyle = { width:20, height:20 }
const chnageDark = (value:boolean)=>{
  import('@/hooks/useTheme').then(({useTheme})=>{
        let { 
            switchDark,
        } = useTheme()
        switchDark(value)
    })
}

let currentComp = shallowRef(loginFormVue)
let loginForm = {
  loginFormVue,
  phoneLogin,
  codeLogin,
  registerForm,
}
const compChange = (key: string) => {
  currentComp.value = loginForm[key]
}

</script>
<template>
  <div class="relative w-screen h-screen dark:bg-[#333]">
    <div class="fixed z-50 md:top-10 top-5 md:right-16 right-5">
      <a-switch v-model:checked="checked" @change="chnageDark">
            <template #checkedChildren>
                <w-svg-icon name="sun" :iconStyle="iconStyle" />
            </template>
            <template #unCheckedChildren>
                <w-svg-icon name="moon" :iconStyle="iconStyle" />
            </template>
        </a-switch>
    </div>
    <div class="absolute top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div class="w-[95%] rounded-xl h-[95%] shadow-2xl bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#464646] dark:to-[#232323] flex justify-between items-center">
        <div class="w-[60%] h-[100%] p-20 items-center hidden xl:flex justify-center">
          <img :src="getAssetsImage('image/login_left.png')" alt="login" />
        </div>
        <div class="w-[100%] xl:w-[50%] h-[100%] px-2 flex items-center justify-center">
          <div
            class="w-[100%] sm:w-[60%] xl:w-[65%] overflow-hidden mx-auto shadow-2xl bg-white dark:bg-[#333] rounded-2xl p-[2.5vw]">
            <div class="flex items-center justify-center mb-10">
              <img class="max-w-[70px] mr-[5%]" :src="getAssetsImage(VITE_PROJECT_LOGO)" />
              <div class="text-3xl font-black text-gray-600 min-w-max">{{ VITE_PROJECT_NAME }}</div>
            </div>
            <transition appear name="login-transform" mode="out-in">
              <component :is="currentComp" @change="compChange"></component>
            </transition>
          </div>
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
