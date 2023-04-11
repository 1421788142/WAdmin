<template>
	<div class="h-full">
		<w-table summary :summaryFixed="true" ref="table" :requestApi="userList" :columns="tableColumns">
			<template #tableHeader="scope">
				<div class="flex flex-row grid-flow-row gap-1">
					<w-import-data v-permission="['export', $route.meta.permission]" class="inline-block" xlsxTitle="用户表格模板"
						:xlsxData="[]" :columns="xlsxHeader" />
					<w-button btnType="primary" type="export" @click="downloadTemplate" />
					<w-button btnType="primary" @click="update" />
					<w-button ghost btnType="primary" :icon="false" :disabled="!scope.isSelected" type="delete" danger
						title="批量删除" />
				</div>
			</template>
			<template #nicknameTableHeader="scope">
				<a-button type="primary" @click="message.success(JSON.stringify(scope))">用户名称</a-button>
			</template>
			<template #urlTableHeader>
				<a-tag color="#55acee">门户地址</a-tag>
			</template>
			<template #url="{ row }">
				<a :href="row.text">{{ row.text }}</a>
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<w-button @click="update('edit', row.record)" type="update" />
					<w-button @click="update('delete', row.record)" color="red" type="delete" />
				</div>
			</template>
		</w-table>

		<!-- 新增编辑框 -->
		<w-modal :destroyOnClose="false" :loading="loading" :title="title" width="1000px" v-model:visible="visible"
			@btnOk="btnOk">
			<w-form :submitApi="submitApi" :columns="formColumns" ref="form" v-model:value="formParam">
				<template #avatarFormItem="{ row }">
					<uploadImgVue autoUpload ref="uploadImgRef" :total="1" accept="image/*" :fileList="fileList"
						@autoUpload="(state) => afterFn(state)"
						@change="(state) => row.avatar = state.fileListData.map(x => x.url).join(',')" />
				</template>
			</w-form>
		</w-modal>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePageData } from './index'
import { userInterface } from '@/apis/system/user'
import aoaToSheetXlsx from '@/utils/aoaToSheetXlsx';
import { setTableExportData } from '@/utils/util'
import { message, Modal } from 'ant-design-vue';
import formVue from '@/components/global/form/index.vue'
import tableVue from '@/components/global/table/index.vue'
import uploadImgVue from '@/components/global/upload/uploadImg.vue';
import { uploadImg } from '@/apis/common'
import { upload } from '@/hooks/interface/upload';

const {
	tableColumns,
	formColumns,
	xlsxHeader,
	formParam,
	title,
	visible,
	loading,
	fileList,
	userList,
	open
} = usePageData()

const xlsxData = ref<any>([]) //导出的数据
const getTableList = async () => {
	const { data } = await userList({
		pageNum: 1,
		pageSize: 10,
	});
	xlsxData.value = setTableExportData<any>(tableColumns.value, data.dataList).map((item) => {
		return Object.keys(item).map((key) => item[key]);
	});
}

// 导出模板
const downloadTemplate = async () => {
	await getTableList()
	aoaToSheetXlsx({
		data: xlsxData.value,
		header: xlsxHeader,
		filename: '导出用户信息',
	});
}

const [
	form,
	table,
	uploadImgRef
] = [
		ref<RefComponent<typeof formVue>>(),
		ref<RefComponent<typeof tableVue>>(),
		ref<RefComponent<typeof uploadImgVue>>(),
	]

const afterFn = async (state: upload.stateProps) => {
	let imgList = state.fileListData.filter(x => x.isHand)
	for (let i = 0; i < state.notFileList.length; i++) {
		let formData = new FormData()
		formData.append('file', (state.notFileList[i] as any))
		let { data } = await uploadImg(formData)
		imgList.push({
			url: data.url,
			isHand: true,//手动上传 以防数据混乱
			status: 'done',
			uid: String(data.id),
			name: data.name
		})
	}
	state.fileListData = imgList
	state.notFileList = []
	formParam.value.avatar = imgList.map(x => x.url).join(',')
}

const update = async (type: string = 'add', row: userInterface) => {
	if (type === 'delete') {
		Modal.confirm({
			title: '是否确认删除',
			onOk: async () => {
				message.warn('演示模式,不能删除')
			},
		});
	} else {
		await open(type, row)
		form.value?.reset()
	}
}

const btnOk = async () => {
	let res = await form.value.submitForm()
	if (res) submitApi()
}

const submitApi = async () => {
	loading.value = true
	if (formParam.value.id) {
		message.warn('修改失败,演示模式不允许操作')
	} else {
		message.warn('提交失败,演示模式不允许操作')
	}
	loading.value = false
	visible.value = false
	table.value.refresh()
}
</script>

<style scoped></style>