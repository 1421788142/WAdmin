<template>
    <div class="flex flex-col h-full px-4 pt-4 overflow-auto bg-white dark:bg-[#141414]" ref="tableBox" :class="{'pb-4':!pagination}">
		<!-- 表格搜索 -->
        <searchForm
            :search="search"
			:reset="reset"
			:searchParam="searchParam"
			:columns="searchColumns"
			v-show="isShowSearch"    
        ></searchForm>
		<!-- 表格头部 -->
		<div class="flex justify-between mb-2">
			<div class="flex items-center max-w-[25%]">
				<span class="mr-1 text-lg truncate">{{$route.meta.title}}</span>
				<a-tooltip placement="right" v-if="subTitle">
					<template #title>
						<span>{{subTitle}}</span>
					</template>
					<info-circle-outlined class=" !text-zinc-500" />
				</a-tooltip>
			</div>
			<div class="flex items-center max-w-[70%] overflow-auto">
				<div class="flex min-w-min"> 
					<!-- 按钮插槽 isSelected 是否已选择, selectedListIds选择的id集合 -->
					<slot name="tableHeader" :ids="selectedListIds" :isSelected="isSelected"></slot>
				</div>
				<!-- 表格操作模块 -->
				<div class="!text-xl flex items-center ml-3" v-if="toolButton">
					<a-tooltip placement="top" v-if="searchColumns.length > 0">
						<template #title>数据筛选</template>
						<search-outlined @click="isShowSearch = !isShowSearch" class="mr-3 cursor-pointer" />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>刷新</template>
						<redo-outlined @click="reset" class="cursor-pointer" />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>密度</template>
						<a-dropdown :trigger="['click']" placement="bottom">
							<column-width-outlined class="mx-3 cursor-pointer" />
							<template #overlay>
								<a-menu v-model:selectedKeys="selectedKeys" @click="setTableSize">
									<a-menu-item key="default">默认</a-menu-item>
									<a-menu-item key="middle">中等</a-menu-item>
									<a-menu-item key="small">紧凑</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</a-tooltip>
					<!-- 操作表头排序和显示隐藏 -->
					<colSetting :columns="tableColumns" @change="setColumns"/>
				</div>
			</div>
		</div>
		<a-table
			:sticky="getConfigState('tableHeight') === 'auto'"
			:class="{'!flex-1 md:overflow-auto':getConfigState('tableHeight') === 'auto'}"
			:bordered="borderShow"
			:scroll="{ x: 1000 }"
			:size="tableSize"
			:loading="loading"
			:pagination="false"
			:data-source="tableData" 
			:filterSearch="true"
			:row-key="record => record"
			 @resizeColumn="handleResizeColumn"
			:row-selection="selection ? { rowSelection: selectedListIds, onChange: selectionChange } : null"
		>
			<!-- 自定义表头 data-index值拼接TableHeader -->
			<template #headerCell="{ column }">
				<slot :name="`${column['data-index']}TableHeader`" :row="column"></slot>
			</template>
			<!-- 内容 -->
			<template v-for="item in tableColumns" :key="item">
				<a-table-column
					:align="item?.align ? item.align : 'center'"
					v-if="item.isShow"
					:data-index="item.dataIndex"
					:title="item.title"
					:fixed="item?.fixed || ''"
					:sorter="item?.sorter || null"
					:width="item?.width || 150"
					:resizable="item?.resizable || false"
					:ellipsis="item?.ellipsis || true"
				>
				<template #default="scope">
					<slot :name="item.dataIndex" :row="scope">
						<a-image
							v-if="item.image"
							:width="item.width || '120px'"
							:height="item?.height || '60px'"
							:src="scope.value"
						/>
						<a-tag v-else-if="item.tag" :color="filterEnum(scope.value,item.enum,'tag')">
							{{ item.enum?.length ? filterEnum(scope.value,item.enum): defaultFormat(0,0,scope.value) }}
						</a-tag>
						<!-- 文字（自带格式化内容） -->
						<span v-else>{{ (item.enum?.length && item.showEnum) ? filterEnum(scope.value,item.enum): defaultFormat(0,0,scope.value) }}</span>
					</slot>
				</template>
				</a-table-column>
			</template>
		</a-table>
		<usePagination
			v-if="pagination"
			:pageable="pageable"
			:setupPagination="setupPagination"
		/>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { filterEnum, defaultFormat } from "@/utils/util";

import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";

import colSetting from './components/colSetting.vue'

import piniaConfig from '@/store/config';
const { getConfigState } = piniaConfig()

// 是否显示搜索模块
const isShowSearch = ref<boolean>(true);

interface useTableProps {
	columns: useTableColumn[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
	setTableList?: (data: any) => any // 重新处理table数据 ==>非必填
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	subTitle?: string; //副标题
	rowKey?: string //选择框所选键值 allKey代表选择行数据
	selection?: boolean //是否显示表格选择框
	borderShow?: boolean //是否显示边框
}
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<useTableProps>(), {
	columns: () => [],
	pagination: true,
	initParam: {},
	toolButton: true,
	subTitle:'温馨提醒',
	rowKey: 'id',
	selection: true,
	borderShow: true
});
// 表格列配置项处理（添加 isShow 属性，控制显示/隐藏）
const tableColumns = ref<useTableColumn[]>();
tableColumns.value = props.columns.map(item => {
	return {
		...item,
		isShow: item?.isShow ?? true,
		resizable: item?.resizable ?? true,
	};
});
// 修改表格排序
const setColumns = (data:useTableColumn[]) => tableColumns.value = data;
// 表格多选 Hooks
const { 
	selectionChange,
	selectedListIds,
	isSelected
} = useSelection(props.rowKey);
// 表格操作 Hooks
const { 
    tableData,
    pageable,
    searchParam, 
    initSearchParam,
	tableSize,
	setTableSize,
    getTableList, 
    search, 
    reset,
	setupPagination,
	loading
} = useTable(props.requestApi, props.initParam, props.pagination, props.setTableList);

// 重置表格已选的值
watch(loading,()=>selectionChange([]))

// 过滤需要搜索的配置项
const searchColumns = props.columns.filter(item => item.search);

// 设置搜索表单的默认值
searchColumns.forEach(column => {
	if (column.initSearchParam !== undefined && column.initSearchParam !== null) {
		initSearchParam.value[column.dataIndex!] = column.initSearchParam;
	}
});

// 	修改表头宽度
const handleResizeColumn = (w:number, col:useTableColumn) => {
	let columns = tableColumns.value.filter(x=>x.dataIndex === col.dataIndex)
	columns[0].width = w
}

// 修改table表格尺寸
const selectedKeys = computed(() => [tableSize.value])

// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: getTableList });
</script>

<style scoped>
#tableBox{
	overflow: auto;
}
</style>