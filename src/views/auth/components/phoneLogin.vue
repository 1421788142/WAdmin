<template>
    <div>
        <a-form class="mt-5" name="ruleFormRef" :model="form" @finish="Submit">
          <a-form-item name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
            <a-input size="large" placeholder="请输入手机号" v-model:value="form.phone" />
          </a-form-item>
          <a-form-item name="code" class="mt-5" :rules="[{ required: true, message: '短信验证码' }]">
            <div class="grid grid-flow-row-dense grid-cols-3 gap-2">
                <a-input class="col-span-2" size="large" placeholder="短信验证码" v-model:value="form.code" />
                <a-button size="large">发送验证码</a-button>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" size="large" class="w-full" @click="tabForm">提交</a-button>
          </a-form-item>
          <a-form-item>
            <a-button size="large" class="w-full" @click="tabForm">返回</a-button>
          </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
interface loginInterface {
  phone: string,
  code: string,
}
const emit = defineEmits(['change'])
// 切换表单类型
const tabForm = ()=>{
  emit('change','loginFormVue')
}
const form = reactive<loginInterface>({
  phone: '',
  code: '',
})

const Submit = async (values: any) => {
    
}
</script>

<style scoped>

</style>