<template>
	<div>
		<w-table :expandedRowKeys="expandedRowKeys" ref="table" :selection="false" :afterLoad="afterLoad" :pagination="false" :requestApi="getRouter" :columns="tableColumns">
			<template #tableHeader>
				<w-button btnType="primary" @click="update()" />
			</template>
			<template #icon="{ row }">
				<component v-if="row.record.icon" :is="row.record.icon"></component>
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<w-button v-if="row.record.menuType != 'F'" @click="update('add',row.record)" />
					<w-button @click="update('edit',row.record)" type="update" />
					<w-button @click="update('delete',row.record)" color="red" type="delete" />
				</div>
			</template>
		</w-table>
		<!-- 新增编辑 -->
		<w-modal :destroyOnClose="false" :loading="loading" :title="title" width="1000px" v-model:visible="visible" @btnOk="btnOk">
			<w-form ref="form" :labelCol="{ span: 6 }" :submitApi="submitApi" :columns="formColumns" :initFormParam="initFormParam" />
		</w-modal>
	</div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { getRouter } from '@/apis/user/index'
import { usePageData } from './index'
import { arrayToTree } from '@/utils/util'
import { Table } from '@/components/global/table/interface'
import { message, Modal } from 'ant-design-vue'
import formVue from '@/components/global/form/index.vue'
import tableVue from '@/components/global/table/index.vue'

const expandedRowKeys = ref<any[]>([])
const afterLoad = (value:any,state:Table.stateProps)=>{
	state.expandedKeys = Array.from(new Set(value.dataList.map(x=>x.menuType !=='C' && x.id)))
	return arrayToTree(value.dataList)
}

const [
	form,
	table
] = [
	ref<RefComponent<typeof formVue>>(),
	ref<RefComponent<typeof tableVue>>()
]

const refresh = ()=>{
	table.value.refresh()
}
const { 
	title,
	visible,
	loading,
	formColumns,
	initFormParam,
	tableColumns,
	getMenu
} = usePageData()

const update = async (type:string = 'add', row?:menuListType)=>{
	if(type === 'delete'){
		Modal.confirm({
			title: '是否确认删除',
			onOk:()=>message.warn('演示模式，不允许操作'),
		});
		return
	}
	await getMenu()
	visible.value = true
	await nextTick()
	if(type === 'add'){
		if(row) {
			form.value.reset({...initFormParam.value,pId:row.id},'clear')
		} else {
			form.value.reset(initFormParam.value,'clear')
		}
	} else {
		form.value.reset(row,'clear')
	}
	title.value = row && type !== 'add' ? `编辑${row.title}` : '新增'
}

const btnOk = async ()=>{
	try {
		loading.value = true
		let { code, data } = await form.value.submitForm<menuListType>()
		if(code === 201) return
		submitApi(data)
	} finally {
		loading.value = false
	}
}

const submitApi = async (params:any) => {
	params['children'] && delete params['children']
	if(params.id){
		message.warn('修改失败,演示模式不允许操作')
	} else {
		message.warn('新增失败,演示模式不允许操作')
	}
	visible.value = false
	refresh()
}

</script>

<style scoped>

</style>