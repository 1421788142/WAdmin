<template>
    <div class="text-center">
        <qrcode-vue class="mx-auto" :value="data.payUrl" :size="data.size" level="H" />
        <p class="my-5 text-sm text-gray-700">扫码后点击"确认"，即可完成登录</p>
        <a-button size="large" class="w-full" @click="tabForm">返回</a-button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import QrcodeVue from 'qrcode.vue'
const emit = defineEmits(['change'])
// 切换表单类型
const tabForm = ()=>{
  emit('change','loginFormVue')
}
const data = reactive<{
  payUrl: string
  size: number
}>({
  payUrl: 'wwww.w..dwa',
  size: 200,
})
</script>

<style scoped>

</style>