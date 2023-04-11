import { reactive, toRefs } from "vue";
import { upload } from '@/hooks/interface/upload';
import { userList, userInterface } from '@/apis/system/user'

interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	loading:boolean,
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
				searchOption: { type:'a-date-picker' },
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
					type:'a-select',
					options:gradeList
				},
				tag:true,
				sorter: (a: any, b: any) => a.stars - b.stars,
			},
			{
				title:'用户类型',
				dataIndex: "userType",
				searchOption: { 
					type: 'a-select',
					options:userType
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
				name: 'nickname',
				isRule:true,
				formItemOption:{ label: '用户姓名' },
			},
			{
				name: 'age',
				isRule:true,
				formItemOption:{ label: '用户年龄' },
				renderForm:renderAge,
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
			{
				name: 'grade',
				formItemType:'a-select',
				isRule:true,
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