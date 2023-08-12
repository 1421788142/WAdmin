import { Result } from '@/types/axios'
import { tableResultData } from '@/apis/interface'
import { searchFormProps } from '@/types/searchForm'
import { TableProps } from "ant-design-vue";
export namespace Table {
	type columnsType = wTableProps
	type resultType = tableResultData<any>
	type requestApiType = (params: any) => Promise<Result<resultType>>
	type beforeLoadType = (params: any) => boolean | object | void
	type afterLoadType = (records: resultType, state: stateProps) => any
	export interface hookProps {
		initParam?: any,
		pagination?: boolean,
		requestApi: requestApiType,
		beforeLoad?: beforeLoadType,
		afterLoad?: afterLoadType,
	}
	export interface pageableProps {
		pageNum: number //当前页数
		pageSize: number //每页条数
		total: number // 数据总数
	}
	export interface stateProps {
		expandedKeys: string[],
		isSelected: boolean,
		showSearch: boolean,
		errorReset: number,
		selectedList: TableProps["rowSelection"]['selectedRowKeys'],
		size: TableProps['size'][],
		searchColumns: searchFormProps[],
		tableColumns: columnsType,
	}

	export interface tableProps {
		/** 表格配置项 */
		columns: columnsType;
		/** 数据源 如果使用那么requestApi则失效 */
		dataSource?: object[];
		/** 请求表格数据的api ==> 必传 */
		requestApi: requestApiType;
		/** 请求前触发入参为searchParams,返回值为false时取消请求,否则将返回值searchParams合并 */
		beforeLoad?: beforeLoadType;
		/** 请求完成后渲染数据前触发,可处理数据 */
		afterLoad?: afterLoadType;
		selection?: boolean; //是否显示表格选择框
		selectionOption?: TableProps["rowSelection"]; //表格左侧选择框属性
		pagination?: boolean; //是否需要分页组件 ==> 非必传（默认为true）
		initParam?: any; //初始化请求参数 ==>非必传（默认为{}）
		toolButton?: boolean; //是否显示表格功能按钮 ==>非必传（默认为true）
		summary?: boolean; //是否显示汇总
		summaryFixed?: boolean | "top" | "bottom"; //汇总是否固定
		subTitle?: string; //副标题
		rowKey?: string; //选择框所选键值 allKey代表选择行数据
		searchShowTotal?: number; //搜索条件显示数量
		scroll?: TableProps["scroll"]; // 滚动配置项
		wrapClass?: string; //外层盒子的css类名
		expandedRowRender?: boolean; //是否自定义子级插槽
	}
}