import { reactive, toRefs, ref, onMounted } from "vue";
import { getRouter } from '@/apis/user/index'
import { arrayToTree } from '@/utils/util'

interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	initFormParam:any,
	tableColumns:useTableColumn[],
	formColumns:useFormProps[]
}

const starsList = ref<any[]>([
	{ label:'禁用', tagType: "red", value: 1 },
	{ label:'正常', tagType: "green", value: 2 },
])

// 自定义(使用tsx语法)
const renderAge = ({ row, value }) => {
	return (
		<a-input-number step={1} min={0} max={100} v-model:value={row!['order']}></a-input-number>
	);
};
const treeData = ref<any[]>([])
const getMenu = async () => {
	let { code, data } = await getRouter()
	let dataList = arrayToTree<menuListType>(data.dataList);
	code === 200 && (treeData.value = dataList)
};

const renderMenu = ({ row, value }) => {
	let dropdownStyle = {
		maxHeight: '400px', 
		overflow: 'auto'
	}
	let fieldNames = { children:'children', title:'title', key: 'id'}
	return (
		<a-tree
			v-model:checkedKeys={row!['menuId']}
			checkable
			showSearch
			allowClear
			blockNode
			checkStrictly
			style={{width: "100%"}}
			dropdownStyle={dropdownStyle}
			fieldNames={fieldNames}
			tree-data={treeData.value}
		>
		</a-tree>
	);
};

export const usePageData = ()=>{
	const state = reactive<stateInterface>({
		title:'新增数据',
		visible:false,
		initFormParam:{
			order:0,
			status:2,
			menuId:[]
		},
		tableColumns:[
			{
				title:'角色名称',
				dataIndex: "roleName",
				search: true,
			},
			{
				title:'创建时间',
				dataIndex: "createdTime",
				sorter: (a: any, b: any) =>{
					const t1 = new Date(a.createdTime).getTime();
					const t2 = new Date(b.createdTime).getTime();
					return t1 - t2
				},
			},
			{
				title:'排序',
				dataIndex: "order",
			},
			{
				title:'状态',
				dataIndex: "status",
				searchType:'a-select',
				componentOption:{
					options:starsList,
				},
			},
			{
				title:'备注',
				dataIndex: "memo",
			},
			{
				dataIndex: "operation",
				title: "操作",
				fixed: "right",
				width:200
			}
		],
		formColumns:[
			{
				name: 'roleName',
				formItemOption:{
					label: '角色名称',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
			},
			{
				name: 'order',
				formItemOption:{
					label: '排序',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				renderForm:renderAge
			},
			{
				name: 'status',
				formItemType:'a-select',
				formItemOption:{
					label: '状态',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				componentOption:{
					options:starsList,
				}
			},
			{
				name: 'memo',
				formItemType:'a-textarea',
				formItemOption:{ label: '备注', },
			},
			{
				name: 'menuId',
				formItemOption:{
					label: '菜单分配',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				renderForm:renderMenu
			},
		]
	})

	return {
		...toRefs(state),
		getMenu
	}
}