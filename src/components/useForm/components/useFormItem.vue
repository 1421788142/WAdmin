<template>
	<a-form-item :name="item.name" v-bind="item.formItemOption">
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
</template>

<script setup lang="ts">
interface SearchFormItem {
	item: useFormProps; // 具体每一个搜索项的配置
	formParam: any; // 搜索参数
}
withDefaults(defineProps<SearchFormItem>(),{
	formParam:{},
})
</script>

<style scoped>

</style>