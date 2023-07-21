import { reactive, toRefs } from "vue";
import { upload } from '@/hooks/interface/upload';
import { userList, userInterface } from '@/apis/system/user'

interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	loading:boolean,
	selecteId:number[],
	formParam:userInterface,
	tableColumns:wTableProps,
	formColumns:wFormProps,
	fileList:upload.stateProps['fileListData']
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

export const usePageData = ()=>{
	// 自定义(使用tsx语法)
	const renderAge = ({ row, value }) => {
		return (
			<a-input-number step={1} min={1} max={100} v-model:value={row!['age']}></a-input-number>
		);
	};
	const state = reactive<stateInterface>({
		title:'新增数据',
		visible:false,
		loading:false,
		fileList:[],
		selecteId:[1,3,5], // 测试默认选中 selectedList
		formParam:null,
		tableColumns:[
			{
				title:'用户姓名',
				dataIndex: "nickname",
				search: true,
			},
			{
				title:'创建时间',
				dataIndex: "createdTime",
				searchOption: {
					formItemType:'a-range-picker',
					format:'YYYY-MM-DD',
					valueFormat:'YYYY-MM-DD',
					defaultValue:[ "2023-04-06", "2023-05-11" ],
					transform: (value: any) => {
						return Object.assign({
							createdTimeS:value?.createdTime![0],
							createdTimeE:value?.createdTime![1],
						},value)
					}
				},
				sorter: (a: any, b: any) =>{
					const t1 = new Date(a.createdTime).getTime();
					const t2 = new Date(b.createdTime).getTime();
					return t1 - t2
				},
			},
			{
				title:'门户地址',
				dataIndex: "url",
				ellipsis: true,
			},
			{ title:'用户头像', dataIndex: "avatar", image:true, },
			{
				title:'会员等级',
				dataIndex: "grade",
				searchOption:{
					formItemType:'a-select',
					options:gradeList,
				},
				tag:true,
				sorter: (a: any, b: any) => a.grade - b.grade,
			},
			{
				title:'用户类型',
				dataIndex: "userType",
				showEnum:true,
				searchOption: { 
					formItemType: 'a-select',
					options:userType,
				},
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
				isRule:true,
				formItemOption:{ name: 'nickname', label: '用户姓名' },
			},
			{
				isRule:true,
				formItemOption:{ name: 'age', label: '用户年龄' },
				renderForm:renderAge,
			},
			{
				isRule:true,
				formItemOption:{ name: 'url', label: '门户地址' },
			},
			{
				isRule:true,
				formItemOption:{ name: 'avatar', label: '用户头像' },
			},
			{
				formItemType:'a-select',
				isRule:true,
				formItemOption:{ name: 'grade', label: '会员等级' },
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
				formItemType:'a-select',
				isRule:true,
				formItemOption:{ name: 'userType', label: '用户类型' },
				componentOption:{
					options:userType
				}
			}
		]
	})

	const open = async (type:string,row?:userInterface)=>{
		state.visible = true
		state.title = type === 'add' ? '新增' : `编辑`
		state.fileList = row ? [{
			url: row.avatar,
			status: 'done',
			isHand: true,//手动上传 以防数据混乱
			uid: String(row.userId),
			name: '用户头像'
		}] : []
		state.formParam = row ? row : {
			userType:1,
			grade:1,
		} as userInterface
	}

	return {
		...toRefs(state),
		userList,
		open
	}
}