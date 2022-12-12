<template>
	<div>
		<useTable :selection="false" :setTableList="setTableList" :pagination="false" :requestApi="getRouter" :columns="columns">
			<template #tableHeader>
				<permission-button btnType="primary" @click="update()" />
			</template>
			<template #title="{ row }">
				{{row.record.title}}
			</template>
			<template #icon="{ row }">
				<component v-if="row.record.icon" :is="row.record.icon"></component>
			</template>
			<template #hidden="{ row }">
				<a-tag v-if="row.record.status === 1" color="green">启用</a-tag>
				<a-tag v-else color="red">禁用</a-tag>
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
		<setModelVue ref="setModel" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getRouter } from '@/apis/user/index'
import { columns } from './index'
import setModelVue from './component/setModel.vue';
import { arrayToTree } from '@/utils/util'
import { message, Modal } from 'ant-design-vue'
import PermissionButton from '@/components/global/permissionButton.vue';

const setTableList = (value:any)=>arrayToTree(value.dataList)

const setModel = ref<any>(null)
const update = (type:string = 'add', row?:menuListType)=>{
	if(type === 'delete'){
		Modal.confirm({
        title: '是否确认删除',
        onOk() {
			message.warn('演示模式，不允许操作')
        },
    });
	} else {
		setModel.value.open(type,row)
	}
}
</script>

<style scoped>

</style>