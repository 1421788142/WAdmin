<template>
  <div ref="wFormRefParent">
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
          <a-col
            :span="formRowSpan(item)"
            v-if="item?.isHide ? item.isHide(formParam) : true"
          >
            <a-form-item v-bind="item.formItemOption">
              <template #label>
                <a-tooltip
                  :placement="item.tooltipPlacement ?? 'top'"
                  :title="item.tooltip"
                >
                  <info-circle-outlined />
                </a-tooltip>
                <span class="mx-2">{{ item.label }}</span>
              </template>
              <slot
                :name="`${item.formItemOption.name}FormItem`"
                :row="formParam"
              >
                <component
                  v-if="!item.renderForm"
                  :is="item.formItemType || 'a-input'"
                  v-bind="item.componentOption"
                  v-on="item.componentOption?.listeners || {}"
                  v-model:value="formParam[item.formItemOption.name!]"
                ></component>
                <component
                  v-else
                  :is="item.renderForm"
                  :row="formParam"
                ></component>
              </slot>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <!-- 自定义插入内容 -->
      <slot name="content" :scoped="formParam"></slot>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElementSize } from "@vueuse/core";
import type { Rule } from "ant-design-vue/es/form";
import { FormInstance, FormProps, message } from "ant-design-vue";
import { useVModel } from "@/hooks/useVModel";
import { $$t } from "@/plugins/language/setupI18n";

interface propsInterface {
  columns: wFormProps; //所有表单项
  errorMsg?: string; //表单验收失败提示
  gutter?: number; //栅格间隔
  span?: number; //格占位格数
  labelCol?: FormProps["labelCol"];
  wrapperCol?: FormProps["wrapperCol"];
  layout?: FormProps["layout"];
  value: Record<string, any>;
}

// 默认值
const props = withDefaults(defineProps<propsInterface>(), {
  columns: () => [],
  errorMsg: () => $$t("messages.formSubmitTitle"),
  labelCol: () => ({ span: 4 }),
  wrapperCol: () => ({ span: 20 }),
  gutter: 16,
  span: 12,
  layout: "horizontal",
});

const wFormRefParent = ref();
const { width } = useElementSize(wFormRefParent);

const formRowSpan = (item: wFormProp) => {
  if (width.value >= 1200) {
    return 6;
  } else if (width.value >= 700) {
    return item?.colSpan || props.span;
  } else {
    return 24;
  }
};

//表单配置项  这里预留配置项
const getSort = (sort: number) => sort ?? 10; //排序
const initParam = {};
const formColumns = props.columns
  .map((item): wFormProp => {
    initParam[item.formItemOption.name] = "";
    return {
      ...item,
      formItemOption: {
        rules: item?.isRule
          ? {
              required: true,
              trigger: ["change", "blur"],
              validator: item?.validator
                ? (rule: Rule, value: any) =>
                    item.validator({ value, formParam: formParam.value })
                : (rule: Rule, value: any) => {
                    if (value && String(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        `${$$t("commons.notEmpty", {
                          text: item?.formItemOption?.label || item?.label,
                        })}`,
                      );
                    }
                  },
            }
          : null,
        ...item.formItemOption,
      },
    };
  })
  .sort((a, b) => {
    return getSort(a.sort) - getSort(b.sort);
  });

// 设置form表单数据
const wFormRef = ref<FormInstance>();
const emit = defineEmits(["update:value"]);
const formParam = useVModel(props, "value", emit);

// 提交
const submitForm = async () => {
  try {
    await wFormRef.value.validate(); //先进行表单验证
    reset();
    return true;
  } catch (e) {
    message.warn(props.errorMsg);
    return false;
  }
};

// 重置
const reset = (type: "reset" | "clear" = "clear") => {
  if (!wFormRef.value) return;
  if (!type) {
    wFormRef.value.clearValidate();
    wFormRef.value.resetFields();
  } else if (type === "reset") {
    wFormRef.value.resetFields();
  } else if (type === "clear") {
    wFormRef.value.clearValidate();
  }
};
defineExpose({ submitForm, reset });
</script>

<style scoped></style>
