<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import loginFormVue from './components/loginForm.vue';
import phoneLogin from './components/phoneLogin.vue';
import codeLogin from './components/codeLogin.vue';
import registerForm from './components/registerForm.vue';

import configStore from '@/store/config'
const { getConfigState, setConfigState } = configStore()

const { VITE_PROJECT_NAME, VITE_PROJECT_LOGO } = import.meta.env
 let currentComp = shallowRef(loginFormVue)
 const compChange = (type:any):any => {
    if(type === 'phoneLogin') {
      currentComp.value = phoneLogin
    } else if(type === 'codeLogin'){
      currentComp.value = codeLogin
    } else if(type === 'registerForm'){
      currentComp.value = registerForm
    } else {
      currentComp.value = loginFormVue
    }
  }
  const checked = ref<boolean>(getConfigState('isHasDark'))
  const chnageDark = (value:boolean)=>{
    setConfigState('isHasDark',value)
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.getElementById('theme')?.remove()
      document.documentElement.classList.remove('dark')
    }
  }
  chnageDark(checked.value)
</script>
<template>
  <div class="relative w-screen h-screen dark:bg-[#333]">
    <div class="absolute top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div class="w-[95%] rounded-xl h-[95%] shadow-2xl bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#464646] dark:to-[#232323] flex justify-between items-center">
        <div class="absolute right-20 top-14">
          <a-switch v-model:checked="checked"  @change="chnageDark">
              <template #checkedChildren>
                  <div class="flex items-center justify-center">
                      <a-image :preview="false" :width="20" :height="20" src="/svg/sun.svg"></a-image>
                  </div>
              </template>
              <template #unCheckedChildren>
                  <div class="flex items-center justify-center">
                      <a-image :preview="false" :width="20" :height="20" src="/svg/moon.svg"></a-image>
                  </div>
              </template>
          </a-switch>
        </div>
        <div class="w-[60%] h-[100%] p-20 items-center hidden xl:flex justify-center">
				  <img src="/image/login_left.png" alt="login" />
			  </div>
        <div class="w-[100%] xl:w-[50%] h-[100%] px-2 flex items-center justify-center">
				  <div class="w-[100%] sm:w-[60%] xl:w-[65%] overflow-hidden mx-auto shadow-2xl bg-white dark:bg-[#333] rounded-2xl p-[2.5vw]">
            <div class="flex items-center justify-center mb-10">
				      <img class="max-w-[70px] mr-[5%]" :src="VITE_PROJECT_LOGO"/>
              <div class="text-3xl font-black text-gray-600 min-w-max">{{VITE_PROJECT_NAME}}</div>
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
