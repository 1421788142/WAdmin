<template>
	<!-- 普通文本 -->
    <template v-if="item.formItemType === undefined || item.formItemType === 'text'">
		<a-input :type="item?.inputType || 'text'" v-model:value="formParam[item.value!]" :allow-clear="clearable(item)"></a-input>
    </template>
	<!-- InputNumber 数字输入框 -->
	<template v-if="item.formItemType === 'inputNumber'">
		<a-input-number v-model:value="formParam[item.value!]" :step="item?.step || 1" :min="item?.minNumber || 0" :max="item?.maxNumber || 99999999"></a-input-number>
	</template>
	<!-- 下拉选择器 -->
    <template v-if="item.formItemType === 'select' || item.formItemType == 'multipleSelect'">
		<a-select
			:fieldNames="{ label: item?.selectLabel ?? 'lable', value: item.selectValue ?? 'value' }"
			show-search
			:filter-option="filterOption"
            v-model:value="formParam[item.value!]"
			:mode="item.formItemType === 'multipleSelect' ? 'multiple' : ''"
			:maxTagCount="2"
			:allow-clear="clearable(item)"
			:options="item.selectList"
		>
		</a-select>
    </template>
	<!-- 下拉树形选择器 -->
	<template v-if="item.formItemType === 'treeSelect' || item.formItemType == 'multipleTreeSelect'">
		<a-tree-select
			show-search
			treeNodeFilterProp="label"
            v-model:value="formParam[item.value!]"
			style="width: 100%"
			:tree-data="item.selectList"
			:multiple="item.formItemType === 'multipleTreeSelect' ? true : false"
			:maxTagCount="2"
			:tree-checkable="item.formItemType === 'multipleTreeSelect' ? true : false"
			:allow-clear="clearable(item)"
			:show-checked-strategy="SHOW_PARENT"
		/>
	</template>
	<!-- 时间选择 -->
	<template v-if="item.formItemType === 'time' || item.formItemType === 'timeange'">
		<a-time-picker
			v-if=" item.formItemType == 'time'"
			class="w-full"
			 value-format="HH:mm:ss"
			:allowClear="clearable(item)"
            v-model:value="formParam[item.value!]"
		/>
		<a-time-range-picker
			v-if=" item.formItemType == 'timeange'"
			class="w-full"
			value-format="HH:mm:ss"
			:allowClear="clearable(item)"
            v-model:value="formParam[item.value!]"
		/>
	</template>
	<!-- 日期选择 -->
	<template v-if="item.formItemType === 'date' || item.formItemType === 'datetime'">
		<a-date-picker
			class="w-full"
			:show-time="item.formItemType == 'datetime'"
            v-model:value="formParam[item.value!]"
			:value-format="item.formItemType === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
			placeholder="请选择日期"
			:allowClear="clearable(item)"
		/>
	</template>
	<!-- 日期选择 区间 -->
	<template v-if="item.formItemType === 'daterange' || item.formItemType == 'datetimerange'">
		<a-range-picker
        v-model:value="formParam[item.value!]"
			:allowClear="clearable(item)"
			:show-time="item.formItemType === 'datetimerange'"
			:value-format="item.formItemType === 'datetimerange' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
		 />
	</template>
</template>

<script setup lang="ts">
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
interface SearchFormItem {
	item: useFormProps; // 具体每一个搜索项的配置
	formParam: any; // 搜索参数
}
const props = defineProps<SearchFormItem>()
// 下拉选择器搜索
const filterOption = (input: string, option: any) => {
	return option.label.indexOf(input) >= 0;
};
// 是否有清除按钮 (默认没有该字段和为true时可清空,false则不能清空)
const clearable = (item: useFormProps) => {
	return item.clearable || item.clearable == null || item.clearable == undefined;
};
</script>

<style scoped>

</style>