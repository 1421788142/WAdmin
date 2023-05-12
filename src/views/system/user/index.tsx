import { reactive, toRefs } from "vue";
import { userList, updateUser, delUser ,userInterface } from '@/apis/system/user'
interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	loading:boolean, 
	formParam:userInterface,
	tableColumns:wTableProps,
	formColumns:wFormProps,
	initParam:any,
	imgList:any[],
}

const gradeList:wTableEnumProps = [
	{ label:'一级', color: "blue", value: 1 },
	{ label:'二级', color: "#FF9800", value: 2 },
	{ label:'三级', color: "red", value: 3 },
	{ label:'四级', color: "yellow", value: 4 },
	{ label:'五级', color: "#9C27B0", value: 5 },
]
const userType:wTableEnumProps = [
	{ label:'管理员', value: 1 },
	{ label:'普通用户', value: 2 }
]

// 自定义(使用tsx语法)
const renderAge = ({ row, value }) => {
	return (
		<a-input-number step={1} min={1} max={100} v-model:value={row!['age']}></a-input-number>
	);
};

export const usePageData = ()=>{
	const state = reactive<stateInterface>({
		title:'新增数据',
		visible:false,
		loading:false,
		imgList:[],
		formParam:null,
		initParam:{
			deptId:''
		},
		tableColumns:[
			{ title:'用户姓名', dataIndex: "nickname", search: true },
			{ title:'用户年龄', dataIndex: "age" },
			{
				title:'创建时间',
				dataIndex: "createdTime",
				searchOption:{ type:'a-date-picker' },
				sorter: (a: any, b: any) =>{
					const t1 = new Date(a.createdTime).getTime();
					const t2 = new Date(b.createdTime).getTime();
					return t1 - t2
				},
			},
			{ title:'门户地址', dataIndex: "url", ellipsis: true },
			{ title:'用户头像', dataIndex: "avatar", image:true },
			{
				title:'会员等级',
				dataIndex: "grade",
				search: true,
				searchOption:{ type:'a-select',options:gradeList },
				sorter: (a: any, b: any) => a.grade - b.grade,
			},
			{
				title:'用户类型',
				dataIndex: "userType",
				searchOption:{ type:'a-select', options: userType }
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
				name: 'userName',
				isRule:true,
				formItemOption:{ label: '用户姓名' },
			},
			{ name: 'nickname', formItemOption:{ label: '真实姓名' } },
			{
				name: 'age',
				formItemOption:{
					label: '用户年龄',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				renderForm:renderAge
			},
			{
				name: 'url',
				isRule:true,
				formItemOption:{ label: '门户地址' },
			},
			{
				name: 'avatar',
				isRule:true,
				formItemOption:{ label: '用户头像' },
			},
			{ name: 'email', formItemOption:{ label: '邮箱' } },
			{ name: 'address', formItemOption:{ label: '地址' } },
			{
				name: 'grade',
				isRule:true,
				formItemType:'a-select',
				formItemOption:{ label: '会员等级' },
				componentOption:{
					options:gradeList,
					showSearch:true,
					allowClear:true,
					filterOption:(input: string, option: any) => {
						return option.label.indexOf(input) != -1
					}
				}
			},
			{
				name: 'userType',
				formItemType:'a-select',
				isRule:true,
				formItemOption:{ label: '用户类型' },
				componentOption:{
					options:userType
				}
			}
		]
	})

	const open = async (type:string,row?:userInterface)=>{
		state.visible = true
		state.title = type === 'add' ? '新增' : `编辑`
		state.formParam = row ? row: {
			id: null,
			grade: 1,
		} as userInterface
	}

	return {
		userList,
		open,
		updateUser,
		delUser,
		...toRefs(state)
	}
}