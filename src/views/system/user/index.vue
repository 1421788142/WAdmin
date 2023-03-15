<template>
	<div class="flex w-full">
		<w-tree-filter v-model:value="initParam.deptId" @change="table.refresh()" title="部门列表" />
		<w-table ref="table" :requestApi="userList" :initParam="initParam" :columns="tableColumns">
			<template #tableHeader="scope">
				<div class="flex flex-row grid-flow-row gap-1">
					<w-button btnType="primary" @click="add" />
				</div>
			</template>
			<template #url="{ row }">
				<a :href="row.text">{{row.text}}</a>
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<w-button type="update" @click="update(row.record)"/>
					<w-button color="red" type="delete" @click="update(row.record)"/>
				</div>
			</template>
		</w-table>
		<!-- 新增编辑框 -->
		<w-modal :destroyOnClose="false" :loading="loading" :title="title" width="1000px" v-model:visible="visible" @btnOk="btnOk">
			<w-form :submitApi="submitApi" :initFormParam="initFormParam" :columns="formColumns" ref="form">
				<template #avatarFormItem="{ row }">
					<w-upload v-model:value="imgList" uploadType="image" actionUrl="/upload/image" :total="1" @change="(value)=>{
						row.avatar = value[0]?.url ?? ''
					}" />
				</template>
			</w-form>
		</w-modal>
	</div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { usePageData } from './index'
import { userList, userListInterface } from '@/apis/table/useTable'
import { message } from 'ant-design-vue'
import formVue from '@/components/global/form/index.vue'
import tableVue from '@/components/global/table/index.vue'

const {
	tableColumns,
	formColumns,
	initFormParam,
	visible,
	title,
	initParam,
	imgList,
	loading
} = usePageData()

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