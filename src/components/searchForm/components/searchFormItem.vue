<template>
	<!-- 普通文本 -->
    <template v-if="item.searchType === undefined || item.searchType === 'text'">
		<a-input v-model:value="searchParam[item.newSearch ?? item.dataIndex!]" :allow-clear="clearable(item)"></a-input>
    </template>
	<!-- 下拉选择器 -->
    <template v-if="item.searchType === 'select' || item.searchType == 'multipleSelect'">
		<a-select
			show-search
			:filter-option="filterOption"
			v-model:value="searchParam[item.newSearch ?? item.dataIndex!]"
			:mode="item.searchType === 'multipleSelect' ? 'multiple' : ''"
			:maxTagCount="2"
			:allow-clear="clearable(item)"
			:options="item.enum"
		>
		</a-select>
    </template>
	<!-- 下拉树形选择器 -->
	<template v-if="item.searchType === 'treeSelect' || item.searchType == 'multipleTreeSelect'">
		<a-tree-select
			show-search
			treeNodeFilterProp="label"
			v-model:value="searchParam[item.newSearch ?? item.dataIndex!]"
			style="width: 100%"
			:tree-data="item.enum"
			:multiple="item.searchType === 'multipleTreeSelect' ? true : false"
			:maxTagCount="2"
			:tree-checkable="item.searchType === 'multipleTreeSelect' ? true : false"
			:allow-clear="clearable(item)"
			:show-checked-strategy="SHOW_PARENT"
		/>
	</template>
	<!-- 时间选择 -->
	<template v-if="item.searchType === 'time' || item.searchType === 'timeAnge'">
		<a-time-picker
			v-if=" item.searchType == 'time'"
			class="w-full"
			 value-format="HH:mm:ss"
			:allowClear="clearable(item)"
			v-model:value="searchParam[item.newSearch ?? item.dataIndex!]"
		/>
		<a-time-range-picker
			v-if=" item.searchType == 'timeAnge'"
			class="w-full"
			value-format="HH:mm:ss"
			:allowClear="clearable(item)"
			v-model:value="searchParam[item.newSearch ?? item.dataIndex!]"
		/>
	</template>
	<!-- 日期选择 -->
	<template v-if="item.searchType === 'date' || item.searchType === 'dateTime'">
		<a-date-picker
			class="w-full"
			:show-time="item.searchType == 'dateTime'"
			v-model:value="searchParam[item.newSearch ?? item.dataIndex!]"
			:value-format="item.searchType === 'dateTime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
			placeholder="请选择日期"
			:allowClear="clearable(item)"
		/>
	</template>
	<!-- 日期选择 区间 -->
	<template v-if="item.searchType === 'dateAnge' || item.searchType == 'dateTimeAnge'">
		<a-range-picker
		 	v-model:value="searchParam[item.newSearch ?? item.dataIndex!]"
			:allowClear="clearable(item)"
			:show-time="item.searchType === 'dateTimeAnge'"
			:value-format="item.searchType === 'dateTimeAnge' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
		 />
	</template>
</template>

<script setup lang="ts">
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const props = defineProps<{
	item: useTableColumn; // 具体每一个搜索项的配置
	searchParam: any; // 搜索参数
}>()
// 下拉选择器搜索
const filterOption = (input: string, option: any) => {
	return option.label.indexOf(input) >= 0;
};
// 是否有清除按钮 (默认没有该字段和为true时可清空,false则不能清空)
const clearable = (item: useTableColumn) => {
	return item.clearable || item.clearable == null || item.clearable == undefined;
};
</script>

<style scoped>

</style>