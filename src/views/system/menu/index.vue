<template>
	<div>
		<useTable ref="table" :selection="false" :setTableList="setTableList" :pagination="false" :requestApi="getRouter" :columns="tableColumns">
			<template #tableHeader>
				<permission-button btnType="primary" @click="update()" />
			</template>
			<template #icon="{ row }">
				<component v-if="row.record.icon" :is="row.record.icon"></component>
			</template>
			<template #status="{ row }">
				<a-tag v-if="row.record.status === 1" color="green">正常</a-tag>
				<a-tag v-else color="red">停用</a-tag>
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<permission-button v-if="row.record.menuType != 'F'" @click="update('add',row.record)" />
					<permission-button @click="update('edit',row.record)" title="编辑" icon="form-outlined" type="update" />
					<permission-button @click="update('delete',row.record)" color="red" title="删除" icon="delete-outlined" type="delete" />
				</div>
			</template>
		</useTable>
		<!-- 新增编辑 -->
		<useModal :destroyOnClose="false" :title="title" width="1000px" v-model:visible="visible" @btnOk="btnOk">
			<useForm :labelCol="{
				span: 6
			}" :submitApi="submitApi" :columns="formColumns" ref="form" :initFormParam="initFormQuery"></useForm>
		</useModal>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getRouter } from '@/apis/user/index'
import { usePageData } from './index'
import { arrayToTree, deepCopy } from '@/utils/util'
import { message, Modal } from 'ant-design-vue'
import PermissionButton from '@/components/global/permissionButton.vue';

const setTableList = (value:any)=>arrayToTree(value.dataList)
const table = ref<ComponentRef>()
const refresh = ()=>{
	table.value.refresh()
}
const { 
	title,
	visible,
	formColumns,
	initFormParam,
	tableColumns,
	submitApi,
	getMenu
} = usePageData(refresh)
const initFormQuery = ref<any>()
const update = async (type:string = 'add', row?:menuListType)=>{
	if(type === 'delete'){
		Modal.confirm({
			title: '是否确认删除',
			onOk() {
				message.warn('演示模式，不允许操作')
			},
		});
		return
	}
	getMenu()
	if(type === 'add'){
		if(row) {
			initFormQuery.value = deepCopy<any>(initFormParam.value)
			initFormQuery.value.pId = row.id
		} else {
			initFormQuery.value = deepCopy<any>(initFormParam.value)
		}
	} else {
		initFormQuery.value = deepCopy<any>(row)
	}
	title.value = row && type !== 'add' ? `编辑${row.title}` : '新增'
	visible.value = true
}

const form = ref<ComponentRef>()
const btnOk = ()=> {
	form?.value.submitForm()
}


</script>

<style scoped>

</style>