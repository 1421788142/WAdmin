<template>
    <div class="justify-between mb-2 md:flex table-search" v-if="columns.length">
        <a-form class="flex-1" :model="searchParam" name="formRef">
            <a-row :gutter="16">
                <template v-for="item in getSearchList" :key="item.prop">
                    <a-col :xs="24" :sm="12" :lg="6" :order="1">
                        <search-form-item :item="item" :searchParam="searchParam" />
                    </a-col>
                </template>
            </a-row>
        </a-form>
        <div class="flex justify-end h-max">
            <div class="mx-5">
                <a-button type="primary" @click="search">
                    <div class="flex items-center"><SearchOutlined class="mr-2" />查询</div>
                </a-button>
                <a-button @click="reset" class="ml-1">
                    <div class="flex items-center"><redo-outlined class="mr-2" />重置</div>
                </a-button>
            </div>
            <div class="flex pt-1 cursor-pointer" v-if="columns.length > maxLength">
                <div class="flex items-center" @click="searchShow=!searchShow">
                    <span class="mr-1">{{ searchShow ? "收起" : "展开" }}</span>
                    <component :is="searchShow ? UpOutlined : DownOutlined"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import searchFormItem from './components/searchFormItem.vue'


interface UseTableProps {
	columns: useTableColumn[]; // 搜索配置列
	searchParam: any; // 搜索参数
	search: (params: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<UseTableProps>(), {
	columns: () => [],
	searchParam: {}
});

// 是否展开搜索项
const searchShow = ref(false);
const maxLength = ref<number>(4)//搜索最大展示数量

// 根据是否展开配置搜索项长度
const getSearchList = computed((): useTableColumn[] => {
	if (searchShow.value) return props.columns;
	return props.columns.slice(0, maxLength.value);
});
</script>

<style scoped>

</style>