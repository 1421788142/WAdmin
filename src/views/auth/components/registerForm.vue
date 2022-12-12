<template>
    <div>
        <a-form class="mt-5" name="ruleFormRef" :model="form" @finish="Submit">
            <a-form-item name="account" :rules="[{ required: true, message: '请输入账号' }]">
                <a-input size="large" placeholder="请输入账号" v-model:value="form.account" />
            </a-form-item>
            <a-form-item name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
                <a-input size="large" placeholder="请输入手机号" v-model:value="form.phone" />
            </a-form-item>
            <a-form-item name="code" class="mt-5" :rules="[{ required: true, message: '短信验证码' }]">
                <div class="grid grid-flow-row-dense grid-cols-3 gap-2">
                    <a-input class="col-span-2" size="large" placeholder="短信验证码" v-model:value="form.code" />
                    <a-button size="large">发送验证码</a-button>
                </div>
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
                <a-input size="large" @input="getLvl(form.password)" placeholder="请输入密码" v-model:value="form.password" />
                <div>
                    <a-progress :percent="level" :showInfo="false" :steps="3" />
                </div>
            </a-form-item>
            <a-form-item name="confirmPassword" :rules="[{ required: true, message: '确认密码' }]">
                <a-input size="large" placeholder="确认密码" v-model:value="form.confirmPassword" />
            </a-form-item>
            <a-form-item>
                <a-button class="w-full" type="primary" style="height: 45px;">注册</a-button>
            </a-form-item>
            <a-form-item>
                <a-button size="large" class="w-full" @click="tabForm">返回</a-button>
          </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const emit = defineEmits(['change'])
// 切换表单类型
const tabForm = ()=>{
  emit('change','loginFormVue')
}
const level = ref<number>(0)
const getLvl = (val:any) => {
    let num = 0
    if (/\d/.test(val)) num ++; //数字
    if (/[a-z]/.test(val)) num ++; //小写
    if (/[A-Z]/.test(val)) num ++; //大写
    if (val.length > 6) num ++
    if(num == 0) level.value = 0;
    if(num > 0) level.value = 25;
    if(num > 1) level.value = 50;
    if(num > 2) level.value = 75;
    if(num > 3) level.value = 100;
}
interface loginInterface {
    account: string,
    phone: string,
    code: string,
    password:string,
    confirmPassword:string
}

const form = reactive<loginInterface>({
    account: '',
    phone: '',
    code: '',
    password:'',
    confirmPassword:''
})

const Submit = async (values: any) => {
    
}
</script>

<style lang="scss">
.ant-progress-steps-item{
    width: 33% !important;
}
</style>