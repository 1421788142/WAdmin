<template>
	<div class="h-full">
		<w-table 
			summary 
			summaryFixed 
			ref="table" 
			selection 
			:requestApi="userList" 
			:columns="tableColumns"
			:selectionOption="{ fixed:true }"
		>
			<template #tableHeader="scope">
				<div class="flex flex-row grid-flow-row gap-1">
					<w-import-data  v-permission="['export',$route.meta.permission]" class="inline-block" xlsxTitle="用户表格模板" :xlsxData="[]" :columns="xlsxHeader" />
					<w-button btnType="primary" type="export" @click="downloadTemplate" />
					<w-button btnType="primary" @click="add"/>
					<w-button ghost btnType="primary" :icon="false" :disabled="!scope.isSelected" type="delete" danger title="批量删除" />
				</div>
			</template>
			<template #nicknameTableHeader="scope">
				<a-button type="primary" @click="message.success(JSON.stringify(scope))">用户名称</a-button>
			</template>
			<template #urlTableHeader>
				<a-tag color="#55acee">门户地址</a-tag>
			</template>
			<template #url="{ row }">
				<a :href="row.text">{{row.text}}</a>
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<w-button type="update" @click="update(row.record)"/>
					<w-button type="delete" color="red" @click="update(row.record)"/>
				</div>
			</template>
		</w-table>

		<!-- 新增编辑框 -->
		<w-modal :destroyOnClose="false" :loading="loading" :title="title" width="1000px" v-model:visible="visible" @btnOk="btnOk">
			<w-form :submitApi="submitApi" :columns="formColumns" ref="form" :initFormParam="initFormParam">
				<template #avatarFormItem="{ row }">
					<uploadImg />
					<!-- <w-upload v-model:value="imgList" uploadType="image" actionUrl="/upload/image" :total="1" @change="(value)=>{
						row.avatar = value[0]?.url ?? ''
					}" /> -->
				</template>
			</w-form>
		</w-modal>
	</div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { usePageData } from './index'
import { userList, userListInterface } from '@/apis/table/useTable'
import aoaToSheetXlsx from '@/utils/aoaToSheetXlsx';
import { setTableExportData } from '@/utils/util'
import { message } from 'ant-design-vue';
import formVue from '@/components/global/form/index.vue'
import tableVue from '@/components/global/table/index.vue'
import uploadImg from '@/components/global/upload/components/uploadImg.vue';

const {
	tableColumns,
	formColumns,
	xlsxHeader,
	initFormParam,
	title,
	visible,
	loading,
	imgList
} = usePageData()


const xlsxData = ref<any>([]) //导出的数据
const getTableList = async ()=>{
	const { data } = await userList({
		pageNum: 1,
		pageSize: 10,
	});
	xlsxData.value = setTableExportData<any>(tableColumns.value,data.dataList).map((item) => {
		return Object.keys(item).map((key) => item[key]);
	});
}

// 导出模板
const downloadTemplate = async ()=>{
	await getTableList()
    aoaToSheetXlsx({
        data: xlsxData.value,
        header: xlsxHeader,
        filename: '导出用户信息',
    });
}

const [
	form,
	table
] = [
	ref<RefComponent<typeof formVue>>(),
	ref<RefComponent<typeof tableVue>>()
]

const add = ()=>{
	visible.value = true
	nextTick(()=>{
		form.value.reset()
	})
}
const update = (value:userListInterface)=>{
	visible.value = true
	title.value = '编辑数据'
	nextTick(()=>{
		form.value.reset(value,'clear')
	})
}
const btnOk = async ()=>{
	try {
		loading.value = true
		let { code, data } = await form.value.submitForm<userListInterface>()
		if(code === 201) return
		submitApi(data)
	} finally {
		loading.value = false
	}
}

const submitApi = async (params:userListInterface) => {
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