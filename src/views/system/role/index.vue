<template>
	<div class="h-full">
		<useTable ref="table" :selection="false" :requestApi="getRole" :columns="tableColumns">
			<template #tableHeader="scope">
				<permission-button btnType="primary" @click="add" />
				<a-button type="dashed" danger :disabled="!scope.isSelected" class="mx-2">批量删除</a-button>
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<a-button type="text" @click="update(row.record)" class="!flex !items-center">
						<template #icon><form-outlined /></template>
						<span>编辑</span>
					</a-button>
					<a-button danger type="text" class="!flex !items-center">
						<template #icon><delete-outlined /></template>
						<span>删除</span>
					</a-button>
				</div>
			</template>
		</useTable>
		<!-- 新增编辑框 -->
		<useModal :destroyOnClose="false" :title="title" width="1000px" v-model:visible="visible" @btnOk="btnOk">
			<useForm :submitApi="submitApi" :initFormParam="initFormParam" :columns="formColumns" ref="form"></useForm>
		</useModal>
	</div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { usePageData } from './index'
import { getRole, roleInterafce } from '@/apis/user'
import { message } from 'ant-design-vue'
import { deepCopy } from '@/utils/util'

const {
	tableColumns,
	formColumns,
	initFormParam,
	visible,
	title,
    getMenu
} = usePageData()

const form = ref<ComponentRef>()
getMenu()
const add = ()=>{
	visible.value = true
	nextTick(()=>{
		form.value.reset()
	})
}
const update = (value:roleInterafce)=>{
	visible.value = true
	title.value = '编辑数据'
	nextTick(()=>{
		form.value.formParam = deepCopy<roleInterafce>(value)
		form.value.reset('clear')
	})
}
const btnOk = ()=>{
	form.value.submitForm()
}

const table = ref<ComponentRef>()
const submitApi = async (params:roleInterafce) => {
	if(params.id){
		message.warn('修改失败,演示模式不允许操作')
	} else {
		message.warn('提交失败,演示模式不允许操作')
	}
	visible.value = false
	table.value.refresh()
}

</script>

<style scoped>

</style>