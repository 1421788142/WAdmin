<template>
	<a-form-item :name="item.dataIndex" :label="item.label || item.title">
		<slot>
			<component
				v-if="!item.renderForm"
				:is="item.searchType || 'a-input'" 
				v-bind="item.componentOption"
				v-model:value="searchParam[item.dataIndex!]"
				:row="searchParam"
			></component>
			<component v-else :is="item.renderForm" :row="searchParam"></component>
		</slot>
	</a-form-item>
</template>
<script setup lang="ts">
const props = defineProps<{
	item: useTableColumn; // 具体每一个搜索项的配置
	searchParam: any; // 搜索参数
}>()
</script>

<style scoped>

</style>