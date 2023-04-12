<template>
  <div>
    <a-form class="mt-5" name="ruleFormRef" :model="form" @finish="Submit">
      <a-form-item name="userName" :rules="[{ required: true, message: '请输入你的账号' }]">
        <a-input size="large" placeholder="请输入你的账号" v-model:value="form.userName" />
      </a-form-item>
      <a-form-item name="password" class="mt-5" :rules="[{ required: true, message: '请输入你的密码' }]">
        <a-input-password size="large" placeholder="请输入你的密码" v-model:value="form.password" />
      </a-form-item>
      <a-form-item name="code" class="mt-5" :rules="[{ required: true, message: '图像验证码' }]">
        <div class="grid grid-flow-row-dense grid-cols-3 gap-2">
          <a-input class="col-span-2" size="large" placeholder="图像验证码" v-model:value="form.code" />
          <a-spin :spinning="codeLoading">
            <div class="relative cursor-pointer">
              <div @click="setupCodeImg"
                class="w-[100%] h-[100%] opacity-0 hover:opacity-100 absolute backdrop-invert backdrop-opacity-30 flex justify-center items-center">
                <span class="text-white text-md">点击刷新</span>
              </div>
              <img class="!w-[100%] h-[50px]" :src="codeImage" />
            </div>
          </a-spin>
        </div>
      </a-form-item>
      <a-form-item>
        <a-checkbox class="my-2" v-model:checked="form.isRemember">是否记住密码</a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button class="!h-[45px] w-full" type="primary" :loading="loading" :disabled="disabled"
          html-type="Submit">提交</a-button>
      </a-form-item>
    </a-form>
    <div class="grid grid-cols-1 gap-2 xl:grid-cols-3">
      <a-button @click="tabForm('phoneLogin')">手机登录</a-button>
      <a-button @click="tabForm('codeLogin')">二维码登录</a-button>
      <a-button @click="tabForm('registerForm')">注册</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import userStore from '@/store/user';
import { codeImg } from '@/apis/user';
const { login } = userStore()
const emit = defineEmits(['change'])
// 切换表单类型
const tabForm = (type: string) => {
  emit('change', type)
}
// 图片验证码
const codeLoading = ref<boolean>(true)
const codeImage = ref<string>('')
const setupCodeImg = async () => {
  codeLoading.value = true
  // let res = await codeImg()
  // codeImage.value = res.data.img
  setTimeout(() => {
    codeImage.value = 'https://vben.vvbin.cn/assets/header.1b5fa5f8.jpg'
    codeLoading.value = false
  }, 500)
  // codeLoading.value = false
}
setupCodeImg()
// 定义接口
interface loginInterface {
  userName: string,
  password: string,
  isRemember: boolean,
  code: string
}
const form = reactive<loginInterface>({
  userName: 'ispyy',
  password: '123456',
  isRemember: true,
  code: ''
})
// 登录验证
const loading = ref<boolean>(false)
const Submit = async () => {
  const query = {
    userName: form.userName,
    password: form.password,
  }
  loading.value = true
  const res = await login(query)
  loading.value = res
}
// 禁用按钮
const disabled = computed(() => {
  return !(form.userName && form.password && form.code);
})
</script>

<style scoped></style>