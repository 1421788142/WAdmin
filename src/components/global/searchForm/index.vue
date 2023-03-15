<template>
    <div 
        class="justify-between p-2 md:flex table-search bg-white dark:bg-[#141414]"
        v-if="columns.length"
    >
        <a-form class="flex-1" :model="searchParam" name="formRef">
            <a-row :gutter="16">
                <template v-for="item in searchColumns" :key="item.prop">
                    <a-col :xs="24" :sm="12" :lg="6" :order="1">
                        <a-form-item v-bind="item">
                            <slot>
                                <component
                                    v-if="!item.renderForm"
                                    :is="item.type" 
                                    v-bind="item.searchOption"
                                    v-model:value="searchParam[item.name!]"
                                    :row="searchParam"
                                ></component>
                                <component v-else :is="item.renderForm" :row="searchParam"></component>
                            </slot>
                        </a-form-item>
                    </a-col>
                </template>
            </a-row>
        </a-form>
        <div class="flex justify-end h-max">
            <div class="flex items-center ml-5">
                <a-button type="primary" @click="search" :loading="loading">查询</a-button>
                <a-button @click="reset" class="ml-1">重置</a-button>
            </div>
            <div class="flex pt-1 ml-1 cursor-pointer" v-if="columns.length > maxLength">
                <div class="flex items-center" @click="isShowMax = !isShowMax">
                    <span class="mr-1">{{ isShowMax ? "收起" : "展开" }}</span>
                    <component :is="isShowMax ? UpOutlined : DownOutlined"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { searchProps } from '@/types/table/interface';

interface propsInterface {
	columns: searchProps[]; // 搜索配置列
	searchParam: any; // 搜索参数
    loading: boolean, //请求loading
	search: (params: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<propsInterface>(), {
	columns: () => [],
	searchParam: {}
});

// 是否展开搜索项
const isShowMax = ref(false);
const maxLength = ref<number>(4)//搜索最大展示数量

// 根据是否展开配置搜索项长度
const searchColumns = ref<searchProps[]>([])
watch(()=>isShowMax.value,(newV)=>{
    searchColumns.value = newV ? props.columns : props.columns.slice(0, maxLength.value)
},{immediate: true})
</script>

<style scoped lang="scss">
</style>