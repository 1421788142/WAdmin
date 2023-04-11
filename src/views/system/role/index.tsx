import { reactive, toRefs } from "vue";
import { getRouter } from '@/apis/user/index'
import { roleList, updateRole, delRole ,roleInterface } from '@/apis/system/role'
import { arrayToTree } from '@/utils/util'

interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	loading:boolean,
	formParam:roleInterface,
	tableColumns:wTableProps,
	formColumns:wFormProps,
	rolePagesId:number[],
	roleBtnIds:number[],
	menuList:menuListType[]
	menuBtn:menuListType[],
	treeData:menuListType[]
}

const starsList:wTableEnumProps = [
	{ label:'禁用', value: 0 },
	{ label:'正常', value: 1 },
]

export const usePageData = ()=>{
	const state = reactive<stateInterface>({
		title:'新增数据',
		visible:false,
		loading:false,
		formParam:null,
		rolePagesId:[],
		roleBtnIds:[],
		menuList:[],//页面菜单
		menuBtn:[],//页面按钮
		treeData:[],
		tableColumns:[
			{ title:'角色名称', dataIndex: "roleName", search: true },
			{
				title:'创建时间',
				dataIndex: "createdTime",
				sorter: (a: any, b: any) =>{
					const t1 = new Date(a.createdTime).getTime();
					const t2 = new Date(b.createdTime).getTime();
					return t1 - t2
				},
			},
			{ title:'排序', dataIndex: "order" },
			{
				title:'状态',
				dataIndex: "status",
				searchOption:{ type:'a-select', options:starsList },
			},
			{ title:'备注', dataIndex: "memo" },
			{
				dataIndex: "operation",
				title: "操作",
				fixed: "right",
				width:200
			}
		],
		formColumns:[
			{
				isRule:true,
				name: 'roleName',
				formItemOption:{ label: '角色名称' },
			},
			{
				isRule:true,
				name: 'order',
				formItemOption:{ label: '排序' },
				renderForm:() => {
					return (
						<a-input-number step={1} min={0} max={100} v-model:value={state.formParam!['order']}></a-input-number>
					);
				}
			},
			{
				isRule:true,
				name: 'status',
				formItemType:'a-select',
				formItemOption:{ label: '状态' },
				componentOption:{ options:starsList }
			},
			{
				name: 'memo',
				formItemType:'a-textarea',
				formItemOption:{ label: '备注', },
			},
			{
				name: 'menuId',
				formItemOption:{ label: '菜单分配' },
			},
		]
	})

	const getMenu = async ()=>{
		let { code, data } = await getRouter()
		if(code !== 200) return
		let dataList = data.dataList;
		let [ menuBtn, menuList ] = [dataList.filter(x=>x.menuType === 'F'), dataList.filter(x=>x.menuType !== 'F')]
		state.treeData = arrayToTree<menuListType>(menuList);
		state.menuBtn = menuBtn
		state.menuList = menuList
	}

	const check = (value:string[],e:any)=>{
		let btnList = state.menuBtn.filter(x=>x.pId === e.node.id).map(x=>x.id)
		if(!e.node.checked){
			state.roleBtnIds.push(...btnList)
		} else {
			state.roleBtnIds = state.roleBtnIds.filter(x=>!btnList.includes(x))
		}
	}

	const change = (btnList:menuListType[],menuItem:menuListType)=>{
		let pageBtnIds = btnList.map(x=>x.id)
		setTimeout(()=>{
			let hasBtn = pageBtnIds.filter(x=>state.roleBtnIds.indexOf(x) !== -1).length > 0
			if(hasBtn){
				state.rolePagesId.push(menuItem.id)
			} else {
				state.rolePagesId = state.rolePagesId.filter(x=>x !== menuItem.id)
			}
		},200)
	}

	const open = async (type:string,row?:roleInterface)=>{
		state.title = type === 'add' ? '新增' : `编辑`
		state.visible = true
		// 因为角色id返回格式是合并菜单和按钮  但是tree组件id过多会报警告 所以做一下过滤
		state.rolePagesId = row ? state.menuList.filter(x=>row?.menuId.indexOf(x.id) !== -1).map(x=>x.id) : [] //过滤目录和菜单id
		state.roleBtnIds = row ? state.menuBtn.filter(x=>row?.menuId.indexOf(x.id) !== -1).map(x=>x.id) : [] //过滤按钮id
		state.formParam = {
			id:row?.id ?? null,
			memo:row?.memo ?? '',
			roleName:row?.roleName ?? '',
			menuId:row?.menuId ?? [],
			order: row?.order ?? 0,
			status:row?.status ?? 1,
		}
	}

	return {
		...toRefs(state),
		getMenu,
		check,
		change,
		open,
		roleList,
		updateRole,
		delRole
	}
}