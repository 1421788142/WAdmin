import { reactive, toRefs } from "vue";
import { getRouter } from '@/apis/user/index'
import { arrayToTree } from '@/utils/util'
import { message } from "ant-design-vue";
interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	loading:boolean,
	initFormParam:any,
	tableColumns:wTableProps,
	formColumns:wFormProps,
}
const statusList:wTableEnumProps = [
	{ label:'正常', color:'green', value: 1},
	{ label:'停用', color:'red', value: 2 },
]
export const usePageData = ()=>{
	const state = reactive<stateInterface>({
		title:'新增数据',
		visible:false,
		loading:false,
		initFormParam:{
			menuType: "M",
			title: '',
			pId: null,
			id: null,
			component: '',
			hidden: 1,
			keepAlive: 1,
			orderNum:0,
			icon:'',
			status:1,
			perms:'',
			path:'',
			isFrame:0
		},
		tableColumns:[
			{ width: 100, title:'菜单名称', dataIndex: 'title', search: true, resizable: true },
			{ width: 50, title:'图标', dataIndex: "icon" },
			{ width: 400, title:'组件', dataIndex: "component" },
			{
				width: 50,
				title:'状态',
				dataIndex: "status",
				tag:true,
				searchOption:{ type:'a-select', options:statusList }
			},
			{
				dataIndex: "operation",
				title: "操作",
				width: 180,
				fixed: "right"
			},
		],
		formColumns:[
			{
				name: 'menuType',
				formItemOption:{
					label: '菜单类型',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				renderForm:({ row, value })=>{
					return (
						<a-radio-group v-model:value={row['menuType']} button-style="solid">
							<a-radio-button value="M">目录</a-radio-button>
							<a-radio-button value="C">菜单</a-radio-button>
							<a-radio-button value="F">按钮</a-radio-button>
						</a-radio-group>
					);
				}
			},
			{
				name: 'pId',
				formItemOption:{
					label: '上级菜单',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				formItemType:'a-tree-select',
				componentOption:{
					showSearch:true,
					style:'width: 100%',
					dropdownStyle:{
						maxHeight: '400px', 
						overflow: 'auto'
					},
					fieldNames:{ children:'children', label:'title', value: 'id'},
					allowClear:true,
					treeDefaultExpandAll:true,
					treeData:[]
				},
			},
			{
				name: 'title',
				formItemOption:{
					label: '菜单名称',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
			},
			{
				name: 'icon',
				formItemOption:{ label: '图标' },
				renderForm:({ row, value })=>{
					return (
						<w-icon-picker v-model:icon={row['icon']} />
					);
				},
				isHide:(row:any)=> row.menuType !== 'F'
			},
			{
				name: 'orderNum',
				formItemOption:{
					label: '显示排序',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				formItemType:'a-input-number',
				componentOption:{
					min:0,
					step:1
				}
			},
			{
				name: 'component',
				formItemOption:{
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				tooltip: '访问的组件路径，如：`system/user/index`，默认在`views`目录下',
				label: '组件路径',
				isHide:(row:any)=> row.menuType === 'C'
			},
			{
				name: 'path',
				formItemOption:{
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				tooltip: '访问的路由地址，如：`/user`，如外网地址需内链访问则以`http(s)://`开头',
				label: '组件路径',
				isHide:(row:any)=> row.menuType === 'C'
			},
			{
				name: 'isFrame',
				formItemOption:{
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				tooltip: '选择是外链则路由地址需要以`http(s)://`开头',
				label: '是否外链',
				isHide:(row:any)=> row.menuType !== 'F',
				renderForm:({ row, value })=>{
					return (
						<a-radio-group v-model:value={row['isFrame']} button-style="solid">
                            <a-radio-button value={0}>否</a-radio-button>
                            <a-radio-button value={1}>是</a-radio-button>
                        </a-radio-group>
					);
				},
			},
			{
				name: 'hidden',
				formItemOption:{
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				tooltip: '选择否则路由将不会出现在菜单栏,但依然会加载菜单',
				label: '是否显示',
				isHide:(row:any)=> row.menuType !== 'F',
				renderForm:({ row, value })=>{
					return (
						<a-radio-group v-model:value={row['hidden']} button-style="solid">
                            <a-radio-button value={0}>否</a-radio-button>
                            <a-radio-button value={1}>是</a-radio-button>
                        </a-radio-group>
					);
				},
			},
			{
				name: 'keepAlive',
				formItemOption:{
					label: '是否缓存',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				isHide:(row:any)=> row.menuType === 'C',
				renderForm:({ row, value })=>{
					return (
						<a-radio-group v-model:value={row['keepAlive']} button-style="solid">
                            <a-radio-button value={0}>否</a-radio-button>
                            <a-radio-button value={1}>是</a-radio-button>
                        </a-radio-group>
					);
				},
			},
			{
				name: 'status',
				formItemOption:{
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				tooltip: '选择停用则路由将不会出现在菜单栏不会加载菜单',
				label: '菜单状态',
				isHide:(row:any)=> row.menuType !== 'F',
				renderForm:({ row, value })=>{
					return (
						<a-radio-group v-model:value={row['status']} button-style="solid">
                            <a-radio-button value={1}>正常</a-radio-button>
                            <a-radio-button value={2}>停用</a-radio-button>
                        </a-radio-group>
					);
				},
			},
			{
				name: 'perms',
				formItemOption:{
					label: '权限字符串',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				isHide:(row:any)=> row.menuType === 'F',
			}
		],
	})

	const getMenu = async () => {
		let { code, data } = await getRouter()
		let treeData = arrayToTree<menuListType>(data.dataList);
		code === 200 && state.formColumns.forEach(x=>x.name === 'pId' && (x.componentOption.treeData = treeData))
	};

	return {
		...toRefs(state),
		getMenu
	}
}