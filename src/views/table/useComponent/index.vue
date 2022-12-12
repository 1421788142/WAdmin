<template>
	<div class="h-full">
		<useTable ref="table" :requestApi="userList" :columns="tableColumns">
			<template #tableHeader="scope">
				<import-data class="inline-block" xlsxTitle="用户表格模板" :xlsxData="[]" :columns="xlsxHeader" />
				<a-button type="primary" class="mx-2" @click="downloadTemplate">
					<template #icon><DownloadOutlined /></template>导出表格
				</a-button>
				<a-button type="primary" @click="add">新增</a-button>
				<a-button type="dashed" danger :disabled="!scope.isSelected" class="mx-2">批量删除</a-button>
			</template>
			<template #nicknameTableHeader="scope">
				<a-button type="primary" @click="message.success('我是自定义表头')">用户名称</a-button>
			</template>
			<template #urlTableHeader="scope">
				<a-tag color="#55acee">门户地址</a-tag>
			</template>
			<template #url="{ row }">
				<a href="">{{row.value}}</a>
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
		<useModal :title="title" width="1000px" v-model:visible="visible" @btnOk="btnOk">
			<useForm :submitApi="submitApi" :columns="formColumns" ref="form" :initFormParam="initFormParam">
				<template #avatarFormItem="{ row }">
					<upload v-model:value="imgList" uploadType="image" actionUrl="/upload/image" :total="1" @change="(value)=>{
						row.avatar = value[0]?.url ?? ''
					}" />
				</template>
			</useForm>
		</useModal>
	</div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { usePageData } from './index'
import { userList, userListInterface } from '@/apis/table/useTable'
import aoaToSheetXlsx from '@/utils/aoaToSheetXlsx';
import { deepCopy, setTableExportData } from '@/utils/util'
import { message } from 'ant-design-vue';

const {
	tableColumns,
	formColumns,
	xlsxHeader,
	initFormParam,
	title,
	visible
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

const imgList = ref<any[]>([])

const form = ref<ComponentRef>()
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
		form.value.formParam = deepCopy<userListInterface>(value)
		form.value.reset('clear')
	})
}
const btnOk = ()=>{
	form.value.submitForm()
}

const table = ref<ComponentRef>()
const submitApi = async (params:userListInterface) => {
	if(params.id){
		// let { code, data } = await update(params)
		message.success('修改成功')
	} else {
		// let { code, data } = await add(params)
		message.success('提交成功')
	}
	visible.value = false
	table.value.refresh()
}
</script>

<style scoped>

</style>