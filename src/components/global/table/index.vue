<template>
    <div 
		class="flex flex-col px-2 pt-2
		border border-gray-200 dark:border-gray-700 rounded shadow-sm 
		overflow-auto bg-white dark:bg-[#141414]"
	 	:class="{'pb-2':!pagination,wrapClass}">
		<!-- 表格搜索 -->
        <w-search-form
            :search="search"
			:reset="reset"
			:loading="loading"
			:searchParam="searchParam"
			:columns="searchColumns"
			v-show="showSearch"
        >
		<!-- 搜索条件插槽 -->
			<template #formItemAll="{formItem,searchParam}">
				<slot :name="`${formItem.name}FormItem`" :formItem="formItem" :searchParam="searchParam"></slot>
			</template>
		</w-search-form>
		<!-- 表格头部 -->
		<div class="flex justify-between mb-2">
			<slot name="tableTitle">
				<div class="flex items-center max-w-[25%]">
					<span class="mr-1 text-lg truncate">{{$route.meta.title}}</span>
					<a-tooltip placement="right" v-if="subTitle">
						<template #title>
							<span>{{subTitle}}</span>
						</template>
						<info-circle-outlined class=" !text-zinc-500" />
					</a-tooltip>
				</div>
			</slot>
			<div class="flex items-center max-w-[70%] overflow-auto">
				<div class="flex min-w-min"> 
					<!-- 按钮插槽 isSelected 是否已选择, selectedList根据key所取的data数据集合 -->
					<slot name="tableHeader" :selectedList="selectedList" :isSelected="isSelected"></slot>
				</div>
				<!-- 表格操作模块 -->
				<div class="grid grid-flow-col grid-rows-1 gap-2 ml-2 text-xl" v-if="toolButton">
					<a-tooltip placement="top" v-if="searchColumns.length > 0">
						<template #title>数据筛选</template>
						<search-outlined @click="showSearch = !showSearch" class="cursor-pointer" />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>刷新</template>
						<redo-outlined @click="reset" class="cursor-pointer" />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>密度</template>
						<a-dropdown :trigger="['click']" placement="bottom">
							<column-width-outlined class="cursor-pointer" />
							<template #overlay>
								<a-menu v-model:selectedKeys="size" @click="setTableSize">
									<a-menu-item key="default">默认</a-menu-item>
									<a-menu-item key="middle">中等</a-menu-item>
									<a-menu-item key="small">紧凑</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</a-tooltip>
					<!-- 操作表头排序和显示隐藏 -->
					<colSetting :columns="tableColumns" @change="settingChange"/>
				</div>
			</div>
		</div>
		<!-- 表格 -->
		<a-table
			:columns="tableColumns.filter(x=>x.show)"
			:data-source="dataList"
			:size="size[0]"
			:scroll="scroll"
			v-bind="$attrs"
			:pagination="false"
			:loading="loading"
			v-model:expandedRowKeys="expandedKeys"
			bordered
			@resizeColumn="handleResizeColumn"
			:row-key="record => rowKey === 'allKey' ? record : record[rowKey]"
			:row-selection="selection ? { 
				rowSelection: selectedList,
				onChange: selectionChange,
				...selectionOption
			} : null"
		>
			<template #headerCell="{ column }">
				<slot :name="`${column['dataIndex']}TableHeader`" :row="column"></slot>
			</template>
			<template #bodyCell="{ text, record, index, column }">
				<slot :name="column.dataIndex" :row="{text, record, index, column}">
					<bodyCell :row="{ text, record, index, column }"/>
				</slot>
			</template>
			<template #expandedRowRender="{ record }" v-if="expandedRowRender">
				<slot name="expandedRender" :row="{ record }"></slot>
			</template>
			<template #summary="{ pageData }">
				<slot name="summaryCell">
					<summaryCell v-if="summary" :row="{ pageData, fixed:summaryFixed, tableColumns, selection}"/>
				</slot>
			</template>
		</a-table>
		<!-- 分页 -->
		<w-pagination v-if="pagination" :pageable="pageable" :change="change"/>
    </div>
</template>

<script lang="ts">
// 禁止透传
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { watch } from "vue";
import { TableProps } from 'ant-design-vue'
import { pick } from "@/utils/util";
import { useTable } from "./index";
import { Table } from "./interface";
import colSetting from './components/colSetting.vue'
import bodyCell from './components/bodyCell.vue'
import summaryCell from './components/summaryCell.vue'

interface tablePorps {
	columns: wTableProps, //列配置项
	dataSource?: object[], //数据源 如果使用那么requestApi则失效
	requestApi: Table.hookProps['requestApi'], //请求表格数据的api ==> 必传
	beforeLoad?: Table.hookProps['beforeLoad'], //请求前触发入参为searchParams,返回值为false时取消请求,否则将返回值searchParams合并
  	afterLoad?: Table.hookProps['afterLoad'], //请求完成后渲染数据前触发,可处理数据
	selection?: boolean, //是否显示表格选择框
	selectionOption?: TableProps['rowSelection'], //表格左侧选择框属性
	pagination?: boolean, //是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any, //初始化请求参数 ==>非必传（默认为{}）
	toolButton?: boolean, //是否显示表格功能按钮 ==>非必传（默认为true）
	summary?: boolean, //是否显示汇总
	summaryFixed?: boolean | 'top' | 'bottom', //汇总是否固定
	subTitle?: string, //副标题
	rowKey?: string, //选择框所选键值 allKey代表选择行数据
	searchShowTotal?: number,//搜索条件显示数量
	scroll?: TableProps['scroll'], // 滚动配置项
	wrapClass?: string,//外层盒子的css类名
	expandedRowRender?: boolean,//是否自定义子级插槽
}

// 接受父组件prop，配置默认值
const props = withDefaults(defineProps<tablePorps>(), {
	columns:()=>[],
	dataSource: () => [],
	pagination: true,
	selectable: false,
	initParam: {},
	toolButton: true,
	subTitle:null,
	selection: false,
	expandedRowRender: false,
	rowKey: 'id',
	scroll: () => {
		return {
			x: 'max-content',
			y: 550
		}
	},
	selectionOption:()=>({})
})

const { 
    dataList,
    pageable,
    searchParam, 
	tableColumns,
	searchColumns,
	loading,
	size,
	selectedList,
	isSelected,
	showSearch,
	expandedKeys,
	setTableSize,
    search, 
    reset,
	change,
	selectionChange,
	setColumns
} = useTable({
	...pick(props,[
		'columns',
		'initParam',
		'pagination',
		'requestApi',
		'beforeLoad',
		'afterLoad',
	])
});

// 根据配置定义搜索模块和表格数据源
setColumns()
// 重置表格已选的值
watch(loading,()=>selectionChange([]))
// 	修改表头宽度
const handleResizeColumn = (w:number, col:wTableProp) => {
	let columns = tableColumns.value.filter(x=>x.dataIndex === col.dataIndex)
	columns[0].width = w
}
const settingChange = (columns:wTableProps)=>{
	loading.value = true
	tableColumns.value = columns
	setTimeout(()=>loading.value = false,300)
}
// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: reset });
</script>

<style lang="scss">
.table-img-box{
	img{
		height: 100%;
	}
}
</style>