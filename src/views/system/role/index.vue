<template>
	<div class="h-full">
		<w-table ref="table" :selection="false" :requestApi="getRole" :columns="tableColumns">
			<template #tableHeader="scope">
				<w-button btnType="primary" @click="add" />
			</template>
			<template #status="{ row }">
				<a-switch v-model:checked="row.record.status" @click="change(row.record)" :checkedValue="1" checked-children="正常" un-checked-children="禁用" />
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<w-button type="update" @click="update(row.record)"/>
					<w-button type="delete" color="red" @click="update(row.record)"/>
				</div>
			</template>
		</w-table>
		<!-- 新增编辑框 -->
		<w-modal :loading="loading" :destroyOnClose="false" :title="title" width="1000px" v-model:visible="visible" @btnOk="btnOk">
			<w-form :submitApi="submitApi" :labelCol="{span:4}" :initFormParam="initFormParam" :columns="formColumns" ref="form" />
		</w-modal>
	</div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { usePageData } from './index'
import { getRole, roleInterafce } from '@/apis/user'
import { message } from 'ant-design-vue'
import { deepCopy } from '@/utils/util'
import formVue from '@/components/global/form/index.vue'
import tableVue from '@/components/global/table/index.vue'

const {
	tableColumns,
	formColumns,
	initFormParam,
	visible,
	loading,
	title,
    getMenu
} = usePageData()

const [
	form,
	table
] = [
	ref<RefComponent<typeof formVue>>(),
	ref<RefComponent<typeof tableVue>>()
]

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
		form.value.reset(value,'clear')
	})
}
const btnOk = async ()=>{
	try {
		loading.value = true
		let { code, data } = await form.value.submitForm<roleInterafce>()
		if(code === 201) return
		submitApi(data)
	} finally {
		loading.value = false
	}
}

const submitApi = async (params:roleInterafce) => {
	if(params.id){
		message.warn('修改失败,演示模式不允许操作')
	} else {
		message.warn('提交失败,演示模式不允许操作')
	}
	visible.value = false
	table.value.refresh()
}

const change = (params:roleInterafce)=>{
	params.status = params.status === 1 ? 1 : 2
	table.value.refresh()
}

</script>

<style scoped>

</style>