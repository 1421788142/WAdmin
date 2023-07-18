import { Table } from "./interface";
import { reactive, computed, onMounted, toRefs } from "vue";
import { isBoolean } from '@/utils/is'
import { getSort, setTableColumns, setSearhFormColumns } from '@/utils/index'
import { message } from "ant-design-vue";

export const useTable = ({
	initParam,
	pagination,
	requestApi,
	beforeLoad,
	afterLoad,
}: Table.hookProps) => {
	const state = reactive<Table.stateProps>({
		dataList: [],// 表格数据
		expandedKeys: [],// 展开的行
		size: ['middle'],// 表格大小
		loading: false,// 加载动画
		showSearch: true,// 是否显示查询模块
		isSelected: false,// 是否选中数据
		selectedList: [],// 选择的数据
		searchColumns: [],// 查询组件集合
		tableColumns: [],// 查询组件集合
		errorReset: 0,//是否查询失败重启 0没有重启任务 1正在重启,重启成功恢复到0
		pageable: {
			// 当前页数
			pageNum: 1,
			// 每页显示条数
			pageSize: 10,
			// 总条数
			total: 100
		},
		searchParam: {},// 查询参数(只包括查询)
		initSearchParam: {},// 初始化默认的查询参数
		totalParam: {},// 总参数(包含分页和查询参数)
	});

	const setColumns = (columns: wTableProps) => {
		// 设置搜索模块
		setSearhFormColumns(columns, state)
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
	 * @description 页面所需参数,按需配置
	 * */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize
			};
		},
		set: (newVal: any) => {
			console.log("我是分页更新之后的值", newVal);
		}
	});

	// 初始化的时候需要做的事情就是 设置表单查询默认值 && 获取表格数据(reset函数的作用刚好是这两个功能)
	onMounted(() => {
		reset();
	});

	/**
	 * @description 获取表格数据
	 * @return void
	 * */
	const getTableList = async () => {
		try {
			state.loading = true
			// 先更新查询参数
			updatedTotalParam();
			Object.assign(state.totalParam, initParam);
			const { data } = await requestApi(beforeLoad ? beforeLoad(state.totalParam) : state.totalParam);
			state.dataList = afterLoad ? afterLoad(data, state) : (() => (pagination ? data.dataList : data))()
			state.errorReset = 0
			// 解构后台返回的分页数据(如果有分页更新分页信息)
			const { pageNum, pageSize, total } = data;
			pagination && updatePageable({ pageNum, pageSize, total });
		} catch (error) {
			// 失败重启查询一次  bug:前一次请求和当前请求一样则会情况当前请求,所以导致拿不到数据  所以这里定义一下重启
			state.errorReset += 1
			if (state.errorReset !== 1) return
			message.warn('查询失败,2秒后重启查询')
			setTimeout(() => {
				getTableList()
			}, 2000)
		} finally {
			state.loading = false
		}
	};

	/**
	 * @description 更新查询参数
	 * @return void
	 * */
	const updatedTotalParam = () => {
		state.totalParam = {};
		// 处理查询参数，可以给查询参数加自定义前缀操作
		let nowSearchParam: { [propName: string]: any } = {};
		// 防止手动清空输入框携带参数（可以自定义查询参数前缀）
		for (let key in state.searchParam) {
			// * 某些情况下参数为 false/0 也应该携带参数
			if ([false, 0].includes(state.searchParam[key]) || state.searchParam[key]) {
				nowSearchParam[key] = state.searchParam[key];
			}
		}
		Object.assign(state.totalParam, nowSearchParam, pagination ? pageParam.value : {});
	};

	/**
	 * @description 更新分页信息
	 * @param {Object} resPageable 后台返回的分页数据
	 * @return void
	 * */
	const updatePageable = (resPageable: Table.pageableProps) => {
		Object.assign(state.pageable, resPageable);
	};

	/**
	 * @description 修改表格尺寸
	 * @return void
	 * */
	const setTableSize = ({ key }) => state.size = [key];

	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	const search = () => {
		state.pageable.pageNum = 1;
		getTableList();
	};

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	const reset = () => {
		state.pageable.pageNum = 1;
		state.searchParam = {};
		// 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
		Object.keys(state.initSearchParam).forEach(key => {
			state.searchParam[key] = state.initSearchParam[key];
		});
		getTableList();
	};

	/**
	 * @description 每页条数改变
	 * @param {Number} pageNum 当前页数
	 * @param {Number} pageSize 当前条数
	 * @return void
	 * */
	const change = (pageNum: number, pageSize: number) => {
		state.pageable.pageNum = pageNum;
		state.pageable.pageSize = pageSize;
		getTableList();
	};

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		change,
		setTableSize,
		selectionChange,
		setColumns
	};
};
