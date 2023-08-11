import { Table } from "./interface";
import { reactive, onMounted, toRefs } from "vue";
import { setTableColumns, setSearhFormColumns } from '@/utils/index'
import { message } from "ant-design-vue";
import { isObject } from "@/utils/is";
import { useApi } from "@/hooks/useApi";
import { $$t } from "@/plugins/language/setupI18n";

export const useTable = ({
	initParam,
	pagination,
	requestApi,
	beforeLoad,
	afterLoad,
}: Table.hookProps) => {
	const state = reactive<Table.stateProps>({
		expandedKeys: [],// 展开的行
		size: ['middle'],// 表格大小
		showSearch: true,// 是否显示查询模块
		isSelected: false,// 是否选中数据
		selectedList: [],// 选择的数据
		searchColumns: [],// 查询组件集合
		tableColumns: [],// 查询组件集合
		errorReset: 0,//是否查询失败重启 0没有重启任务 1正在重启,重启成功恢复到0
	});

	const setColumns = (columns: wTableProps) => {
		// 设置搜索模块
		setSearhFormColumns(columns, state, initSearchParam.value)
		// 设置表格
		setTableColumns(columns, state)
	}

	/**
	 * 
	 * @param selectedRowKeys 勾选的table列数据
	 */
	const selectionChange = (selectedRowKeys: string[] | number[] | object[]) => {
		state.isSelected = !!selectedRowKeys.length
		state.selectedList = selectedRowKeys
	}

	/**
	 * @description 获取表格数据
	 * @return void
	 * */
	const getTableList = async () => {
		try {
			loading.value = true
			// 先更新查询参数
			updateTotalParam();
			transform()
			Object.assign(totalParam.value, initParam);
			const { data } = await requestApi(beforeLoad ? beforeLoad(totalParam.value) : totalParam.value);
			listData.value = afterLoad ? afterLoad(data, state) : (() => (pagination ? data.dataList : data))()
			state.errorReset = 0
			// 解构后台返回的分页数据(如果有分页更新分页信息)
			const { pageNum, pageSize, total } = data;
			pagination && updatePageable({ pageNum, pageSize, total });
		} catch (error) {
			// 失败重启查询一次  bug:前一次请求和当前请求一样则会情况当前请求,所以导致拿不到数据  所以这里定义一下重启
			state.errorReset += 1
			if (state.errorReset !== 1) return
			message.warn($$t('messages.queryFailed', { num: 2 }))
			setTimeout(() => {
				getTableList()
			}, 2000)
		} finally {
			loading.value = false
		}
	};

	const {
		listData,
		loading,
		pageable,
		totalParam,
		searchParam,
		initSearchParam,
		change,
		search,
		reset,
		updatePageable,
		updateTotalParam
	} = useApi(getTableList, pagination)
	onMounted(() => {
		reset()
	})

	/**
	 * @description 转换传参( a.date = ['2021-01-01', '2021-01-02'] transform a.dateStart = '2021-01-01' a.dateEnd = '2021-01-02')
	 * @return void
	 * */
	const transform = () => {
		state.searchColumns.forEach((item) => {
			if (item.transform && item.transform instanceof Function) {
				const returnParam = item.transform(totalParam.value)
				isObject(returnParam) && Object.assign(totalParam.value, returnParam)
			}
		})
	}

	/**
	 * @description 修改表格尺寸
	 * @return void
	 * */
	const setTableSize = ({ key }) => state.size = [key];

	return {
		...toRefs(state),
		listData,
		pageable,
		searchParam,
		loading,
		getTableList,
		search,
		reset,
		change,
		setTableSize,
		selectionChange,
		setColumns
	};
};
