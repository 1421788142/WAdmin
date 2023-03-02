<template>
	<a-form-item v-bind="item">
		<slot>
			<component
				v-if="!item.renderForm"
				:is="item.formItemType" 
				v-bind="item.componentOption"
				v-model:value="searchParam[item.name!]"
				:row="searchParam"
			></component>
			<component v-else :is="item.renderForm" :row="searchParam"></component>
		</slot>
	</a-form-item>
</template>
<script setup lang="ts">
const props = defineProps<{
	item: useSearchForm; // 具体每一个搜索项的配置
	searchParam: any; // 搜索参数
}>()
</script>

<style scoped>

</style>