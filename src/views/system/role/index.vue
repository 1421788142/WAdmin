<template>
	<div class="h-full">
		<w-table ref="table" :requestApi="roleList" :columns="tableColumns">
			<template #tableHeader>
				<w-button btnType="primary" @click="update" />
			</template>
			<template #status="{ row }">
				<a-switch v-model:checked="row.record.status" @click="statusChange(row.record)" :checkedValue="1"
					checked-children="正常" un-checked-children="禁用" />
			</template>
			<template #operation="{ row }">
				<div class="w-table-btn">
					<w-button @click="update('edit', row.record)" type="update" />
					<w-button @click="update('delete', row.record)" color="red" type="delete" />
				</div>
			</template>
		</w-table>
		<!-- 新增编辑框 -->
		<w-modal :loading="loading" :destroyOnClose="false" :title="title" width="700px" v-model:visible="visible"
			@btnOk="btnOk">
			<w-form :submitApi="submitApi" :labelCol="{ span: 4 }" :span="24" layout="horizontal" v-model:value="formParam"
				:columns="formColumns" ref="form">
				<template #menuIdFormItem>
					<a-checkbox-group v-model:value="roleBtnIds">
						<a-tree v-model:checkedKeys="rolePagesId" autoExpandParent defaultExpandAll show-line checkable
							:style="{ width: '100%' }" :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
							:fieldNames="{ children: 'children', title: 'title', key: 'id' }" :tree-data="treeData"
							@check="check">
							<template #title="{ dataRef }">
								<div class="flex justify-between w-[400px]">
									<div class="w-[150px]">{{ dataRef.title }}</div>
									<!-- 页面按钮 -->
									<div class="w-[200px] text-right" @click.stop>
										<a-checkbox v-for="box in menuBtn.filter(x => x.pId === dataRef.id)" :value="box.id"
											:key="box.id"
											@change="change(menuBtn.filter(x => x.pId === dataRef.id), dataRef)">
											<span>{{ box.title }}</span>
										</a-checkbox>
									</div>
								</div>
							</template>
						</a-tree>
					</a-checkbox-group>
				</template>
			</w-form>
		</w-modal>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePageData } from './index'
import { roleInterface } from '@/apis/system/role'
import { message, Modal } from 'ant-design-vue'
import formVue from '@/components/global/form/index.vue'
import tableVue from '@/components/global/table/index.vue'

const {
	tableColumns,
	formColumns,
	formParam,
	visible,
	loading,
	title,
	rolePagesId,
	roleBtnIds,
	treeData,
	menuBtn,
	getMenu,
	check,
	change,
	open,
	roleList,
	updateRole,
	delRole
} = usePageData()

const [
	form,
	table
] = [
		ref<RefComponent<typeof formVue>>(),
		ref<RefComponent<typeof tableVue>>()
	]

getMenu()
const refresh = () => table.value.refresh()
const update = async (type: string = 'add', row: roleInterface) => {
	if (type === 'delete') {
		Modal.confirm({
			title: '是否确认删除',
			onOk: async () => {
				let { code, data } = await delRole({ id: row.id })
				if (code === 200) {
					refresh()
					message.warn(data.message)
				}
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
	let { code, data } = await updateRole(formParam.value)
	if (code === 200) {
		message.warn(data.message)
		visible.value = false
		refresh()
		loading.value = false
	}
}

const statusChange = (params: roleInterface) => {
	params.status = params.status === 1 ? 1 : 2
	table.value.refresh()
}

</script>

<style scoped></style>