<template>
  <div
    class="justify-between p-2 md:flex table-search bg-white dark:bg-[#141414]"
    v-if="columns.length"
    ref="searchFormRef"
  >
    <a-form class="flex-1" :model="formParam" name="formRef">
      <a-row :gutter="gutter">
        <template v-for="item in searchColumns" :key="item.formItemOption.name">
          <a-col :span="formSpan">
            <a-form-item v-bind="item.formItemOption">
              <slot name="formItemSlot" :formItem="item" :searchParam="formParam">
                <component
                  class="!w-full"
                  :is="item?.renderForm ?? item.formItemType"
                  v-bind="item.componentOption"
                  v-on="item?.componentOption?.listeners || {}"
                  v-model:value="formParam[item.formItemOption.name!]"
                  :searchParam="formParam"
                ></component>
              </slot>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
    <div class="flex justify-end h-max">
      <div class="flex items-center ml-5">
        <slot name="searchBtn"></slot>
        <a-button type="primary" @click="search()" :loading="loading">
          {{ $t("buttons.inquire") }}
        </a-button>
        <a-button @click="reset()" class="ml-1" :disabled="loading">
          {{ $t("buttons.reset") }}
        </a-button>
      </div>
      <div class="flex pt-1 ml-2 cursor-pointer" v-if="columns.length > maxLength">
        <div class="flex items-center" @click="isShowMax = !isShowMax">
          <span class="mr-1">{{ isShowMax ? "收起" : "展开" }}</span>
          <component :is="isShowMax ? UpOutlined : DownOutlined"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { searchFormProps } from "@/types/searchForm";
import { useAutoFormRow } from "@/hooks/useAutoFormRow";
import { useVModel } from "@/hooks/useVModel";

interface propsInterface {
  columns: searchFormProps[]; // 搜索配置列
  value: Record<string, any>; // 搜索参数
  loading: boolean; //请求loading
  search: () => void; // 搜索方法
  reset: () => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<propsInterface>(), {
  columns: () => [],
});

const emit = defineEmits(["update:value"]);
const formParam = useVModel(props, "value", emit);

// 是否展开搜索项
const searchFormRef = ref();
const gutter = 24;
const isShowMax = ref(false);
const maxLength = ref<number>(4); //搜索最大展示数量
const formSpan = ref(maxLength.value);

onMounted(() => {
  let { num, init } = useAutoFormRow(searchFormRef, maxLength.value, maxLength.value);
  watchEffect(() => {
    maxLength.value = num.value;
    formSpan.value = Math.ceil(gutter / num.value);
  });
  init();
});

// 根据是否展开配置搜索项长度
const searchColumns = computed((): searchFormProps[] => {
  return isShowMax.value ? props.columns : props.columns.slice(0, maxLength.value);
});
</script>

<style scoped lang="scss"></style>
