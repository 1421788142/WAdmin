<template>
    <a-form 
        :model="formParam"
        ref="wFormRef"
        name="wFormRef"
        :label-col="labelCol"
        :layout="layout"
        :wrapper-col="wrapperCol"
    >
        <a-row :gutter="gutter">
            <template v-for="item in formColumns" :key="item.prop">
                <a-col :span="span" v-if="item.isHide ? item.isHide(formParam) : true">
                    <a-form-item :name="item.name" v-bind="item.formItemOption">
                        <template #label>
                            <a-tooltip :placement="item.tooltipPlacement ?? 'top'" :title="item.tooltip">
                                <info-circle-outlined />
                            </a-tooltip>
                            <span class="mx-2">{{item.label}}</span>
                        </template>
                        <slot>
                            <component
                                v-if="!item.renderForm"
                                :is="item.formItemType || 'a-input'" 
                                v-bind="item.componentOption"
                                v-model:value="formParam[item.name!]"
                                :row="formParam"
                            ></component>
                            <component v-else :is="item.renderForm" :row="formParam"></component>
                        </slot>
                    </a-form-item>
                </a-col>
            </template>
        </a-row>
        <!-- 自定义插入内容 -->
        <slot name="content" :scoped="formParam"></slot>
    </a-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormInstance, FormProps, message } from 'ant-design-vue';
import { deepCopy } from '@/utils/util';

interface propsInterface {
    columns:wFormProps, //所有表单项
    errorMsg?:string, //表单验收失败提示
    initFormParam?:any, //初始化form数据
    gutter?:number, //栅格间隔
    span?:number, //格占位格数
    labelCol?:FormProps['labelCol'],
    wrapperCol?:FormProps['wrapperCol'],
    layout?:FormProps['layout'],
}

// 默认值
const props = withDefaults(defineProps<propsInterface>(),{
    columns:()=>[],
    errorMsg:'请认真填写表单',
    initFormParam:{},
    labelCol:()=> ({ span: 4 }),
    wrapperCol:()=> ({ span: 20 }),
    gutter:16,
    span:12,
    layout:'vertical'
})

const getSort = (sort:number)=> sort ?? 10
// 设置form表单数据
const formParam = ref<any>({})
// 重置数据
const setupFormData = ()=>{
    props.columns.forEach(item=>{
        formParam.value[item.name] = null
    })
    formParam.value = Object.assign(formParam.value,props.initFormParam)
}
setupFormData()
 //表单配置项  这里预留配置项
const formColumns = props.columns.map((item):wFormProp=>{
    return {
        ...item
    }
}).sort((a,b)=>{
    return getSort(a.sort) - getSort(b.sort)
})
// 表单
const wFormRef = ref<FormInstance>()
// 提交
const submitForm = async <T>():Promise<{code:number,data:T}>=>{
    try {
        await wFormRef.value.validate() //先进行表单验证
        return { code: 200, data:formParam.value }
    } catch (e) {
        message.warn(props.errorMsg)        
        return { code: 201, data:formParam.value }
    }
}
// 重置
const reset = <T>(params?:T, type?: 'reset' | 'clear')=>{
    if(params) formParam.value = deepCopy<T>(params)
    if(!wFormRef.value) return
    if(!type){
        wFormRef.value.clearValidate()
        wFormRef.value.resetFields()
    } else if (type === 'reset') {
        wFormRef.value.resetFields()
    } else {
        wFormRef.value.clearValidate()
    }
}
defineExpose({ formParam, submitForm, reset, setupFormData })
</script>

<style scoped>

</style>