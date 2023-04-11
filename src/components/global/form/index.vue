<template>
    <a-form :model="formParam" ref="wFormRef" name="wFormRef" :label-col="labelCol" :layout="layout"
        :wrapper-col="wrapperCol">
        <a-row :gutter="gutter">
            <template v-for="item in formColumns" :key="item.prop">
                <a-col :span="item?.colSpan || span" v-if="item?.isHide ? item.isHide(formParam) : true">
                    <a-form-item :name="item.name" v-bind="item.formItemOption">
                        <template #label>
                            <a-tooltip :placement="item.tooltipPlacement ?? 'top'" :title="item.tooltip">
                                <info-circle-outlined />
                            </a-tooltip>
                            <span class="mx-2">{{ item.label }}</span>
                        </template>
                        <slot :name="`${item.name}FormItem`" :row="formParam">
                            <component v-if="!item.renderForm" :is="item.formItemType || 'a-input'"
                                v-bind="item.componentOption" v-on="item.componentOption?.listeners || {}"
                                v-model:value="formParam[item.name!]" :row="formParam"></component>
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
import { ref, computed } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { FormInstance, FormProps, message } from 'ant-design-vue';

interface propsInterface {
    columns: wFormProps, //所有表单项
    errorMsg?: string, //表单验收失败提示
    gutter?: number, //栅格间隔
    span?: number, //格占位格数
    labelCol?: FormProps['labelCol'],
    wrapperCol?: FormProps['wrapperCol'],
    layout?: FormProps['layout'],
    value: any
}

// 默认值
const props = withDefaults(defineProps<propsInterface>(), {
    columns: () => [],
    errorMsg: '请认真填写表单',
    labelCol: () => ({ span: 4 }),
    wrapperCol: () => ({ span: 20 }),
    gutter: 16,
    span: 12,
    layout: 'horizontal'
})
const getSort = (sort: number) => sort ?? 99
const initParam = {} //初始值

//表单配置项  这里预留配置项
const formColumns = props.columns.map((item): wFormProp => {
    initParam[item.name] = ''
    return {
        ...item,
        formItemOption: {
            rules: item?.isRule ?
                {
                    required: true,
                    trigger: ['change', 'blur'],
                    validator: item?.validator ?
                        (rule: Rule, value: any) => item.validator({ value, formParam: formParam.value }) :
                        (rule: Rule, value: any) => {
                            if (String(value)) {
                                return Promise.resolve()
                            } else {
                                return Promise.reject(`${item?.formItemOption?.label || item?.label}不能为空`)
                            }
                        }
                }
                : null,
            ...item.formItemOption
        }
    }
}).sort((a, b) => {
    return getSort(a.sort) - getSort(b.sort)
})

const emit = defineEmits(['update:value'])
// 设置form表单数据
const formParam = computed({
    get() {
        return {
            ...initParam,
            ...new Proxy(props.value, {
                set(obj, name, val) {
                    emit('update:value', {
                        ...initParam,
                        ...obj,
                        [name]: val
                    })
                    return true
                }
            })
        }
    },
    set() {
        emit('update:value', formParam.value)
    }
})
// 表单
const wFormRef = ref<FormInstance>()

// 提交
const submitForm = async () => {
    try {
        await wFormRef.value.validate() //先进行表单验证
        reset()
        return true
    } catch (e) {
        message.warn(props.errorMsg)
        return false
    }
}
// 重置
const reset = (type: 'reset' | 'clear' = 'clear') => {
    if (!wFormRef.value) return
    if (!type) {
        wFormRef.value.clearValidate()
        wFormRef.value.resetFields()
    } else if (type === 'reset') {
        wFormRef.value.resetFields()
    } else if (type === 'clear') {
        wFormRef.value.clearValidate()
    }
}
defineExpose({ submitForm, reset })
</script>

<style scoped></style>