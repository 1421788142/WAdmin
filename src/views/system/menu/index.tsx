import { reactive, toRefs } from "vue";
import { menuList, updateMenu, delMenu } from '@/apis/system/menu'
import { arrayToTree } from '@/utils/util'
interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	loading:boolean,
	formParam:menuListType,
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
		formParam:null,
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
		formColumns:[],
	})
	state.formColumns = [
		{
			isRule:true,
			formItemOption:{ name: 'menuType', label: '菜单类型' },
			renderForm:()=>{
				return (
					<a-radio-group v-model:value={state.formParam['menuType']} button-style="solid">
						<a-radio-button value="M">目录</a-radio-button>
						<a-radio-button value="C">菜单</a-radio-button>
						<a-radio-button value="F">按钮</a-radio-button>
					</a-radio-group>
				);
			}
		},
		{
			isRule:true,
			formItemOption:{ name: 'pId', label: '上级菜单' },
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
				treeData:[],
				treeNodeFilterProp:'title'
			},
		},
		{ isRule:true, formItemOption:{ name: 'title', label: '菜单名称' } },
		{
			formItemOption:{ name: 'icon', label: '图标' },
			renderForm:()=>{
				return (
					<w-icon-picker v-model:icon={state.formParam['icon']} />
				);
			},
			isHide:()=>state.formParam?.menuType !== 'F'
		},
		{
			isRule:true,
			formItemOption:{ name: 'orderNum', label: '显示排序' },
			formItemType:'a-input-number',
			componentOption:{ min:0, step:1 }
		},
		{
			
			isRule:true,
			tooltip: '访问的组件路径，如：`system/user/index`，默认在`views`目录下',
			label: '组件路径',
			formItemOption:{name: 'component'},
			isHide:()=>state.formParam?.menuType === 'C'
		},
		{
			isRule:true,
			tooltip: '访问的路由地址,如:`/user`，如外网地址需内链访问则以`http(s)://`开头,如果为目录,请以当前文件夹地址做拼接(system),注意请不要和其他目录文件夹重复,保持唯一性',
			label: '组件路径',
			formItemOption:{name: 'path'},
			isHide:()=>state.formParam?.menuType !== 'F'
		},
		{
			isRule:true,
			tooltip: '选择是外链则路由地址需要以`http(s)://`开头',
			label: '是否外链',
			formItemOption:{name: 'isFrame'},
			isHide:()=>state.formParam?.menuType !== 'F',
			renderForm:()=>{
				return (
					<a-radio-group v-model:value={state.formParam['isFrame']} button-style="solid">
						<a-radio-button value={0}>否</a-radio-button>
						<a-radio-button value={1}>是</a-radio-button>
					</a-radio-group>
				);
			},
		},
		{
			isRule:true,
			tooltip: '选择否则路由将不会出现在菜单栏,但依然会加载菜单',
			label: '是否显示',
			formItemOption:{name: 'hidden'},
			isHide:()=>state.formParam?.menuType !== 'F',
			renderForm:()=>{
				return (
					<a-radio-group v-model:value={state.formParam['hidden']} button-style="solid">
						<a-radio-button value={0}>否</a-radio-button>
						<a-radio-button value={1}>是</a-radio-button>
					</a-radio-group>
				);
			},
		},
		{
			isRule:true,
			formItemOption:{ name: 'keepAlive', label: '是否缓存' },
			isHide:()=>state.formParam?.menuType === 'C',
			renderForm:()=>{
				return (
					<a-radio-group v-model:value={state.formParam['keepAlive']} button-style="solid">
						<a-radio-button value={0}>否</a-radio-button>
						<a-radio-button value={1}>是</a-radio-button>
					</a-radio-group>
				);
			},
		},
		{
			isRule:true,
			tooltip: '选择停用则路由将不会出现在菜单栏不会加载菜单',
			label: '菜单状态',
			formItemOption:{ name: 'status' },
			isHide:()=>state.formParam?.menuType !== 'F',
			renderForm:()=>{
				return (
					<a-radio-group v-model:value={state.formParam['status']} button-style="solid">
						<a-radio-button value={1}>正常</a-radio-button>
						<a-radio-button value={2}>停用</a-radio-button>
					</a-radio-group>
				);
			},
		},
		{
			isRule:true,
			formItemOption:{ name: 'perms', label: '权限字符串' },
			isHide:()=>state.formParam?.menuType === 'F',
		}
	]

	const getMenu = async () => {
		let { code, data } = await menuList()
		let treeData = arrayToTree<menuListType>(data.dataList);
		if(code === 200){
			state.formColumns.forEach(x=>x.formItemOption.name === 'pId' && (x.componentOption.treeData = treeData))
		}
	};

	const open = async (type:string,row?:menuListType)=>{
		await getMenu()
		state.visible = true
		state.title = type === 'add' ? '新增' : `编辑`
		state.formParam = {
			title: type === 'update' ? row?.title : '',
			icon:type === 'update' ? row?.icon : '',
			menuType:type === 'update' ? row?.menuType : 'M',
			hidden:type === 'update' ? row?.hidden : 1,
			keepAlive:type === 'update' ? row?.keepAlive : 1,
			status:type === 'update' ? row?.status : 1,
			isFrame:type === 'update' ? row?.isFrame : 0,
			orderNum:type === 'update' ? row?.orderNum : 0,
			perms:type === 'update' ? row?.perms : '',
			path:type === 'update' ? row?.path : '',
			component:type === 'update' ? row?.component : '',
			id:type === 'update' ? row?.id : null,
			pId: (type === 'add' && !!row) ? row.id : row?.pId ?? 0,
		}
	}

	return {
		...toRefs(state),
		menuList,
		getMenu,
		open,
		updateMenu,
		delMenu,
	}
}