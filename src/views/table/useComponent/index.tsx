import { reactive, toRefs } from 'vue'
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

// 自定义(使用tsx语法)
const renderAge = ({ row }) => {
	return (
		<a-input-number step={1} min={1} max={100} v-model:value={row!['age']}></a-input-number>
	);
};

export const usePageData = ()=>{
	const state = reactive<stateInterface>({
		title:'新增数据',
		visible:false,
		loading:false,
		fileList:[],
		formParam:null,
		tableColumns:[
			{
				title:'id',
				width:50,
				dataIndex: "id",
				fixed:'left',
				summary:true
			},
			{
				title:'用户信息',
				dataIndex:'',
				searchOption:{
					formItemOption:{
						label:'用户名称',
						name:',nickname',
					},
				},
				filters: [
					{ text: '彭于晏', value: 1 },
					{ text: '吴彦祖', value: 2 },
				],
				filterSearch:true,
				onFilter: (value: string, record: any) =>record.id === value,
				children: [
					{ title: '用户名称', dataIndex: 'nickname', width: 100 },
					{ title: '用户地址', dataIndex: 'address', width: 100 },
				],
			},
			{ 
				title:'用户年龄',
				dataIndex: "age",
				searchOption:{
					formItemType:'a-input-number',					
				},
				sorter: (a: any, b: any) => a.age - b.age,
			},
			{
				title:'创建时间',
				dataIndex: "createdTime",
				searchOption:{
					defaultValue:[],
					formItemType:'a-range-picker',
				},
				sorter: (a: any, b: any) =>{
					const t1 = new Date(a.createdTime).getTime();
					const t2 = new Date(b.createdTime).getTime();
					return t1 - t2
				},
				summary:true,
				renderSummary:(pageData)=>{
					let ageAll:number[] = pageData.map(x=>x.age)
					return `年龄总数: ${ageAll.reduce(((a,b)=> a+ b),0)} !!!`
				}
			},
			{ title:'门户地址', dataIndex: "url", ellipsis: true },
			{ title:'用户头像', dataIndex: "avatar", image:true },
			{
				title:'会员等级',
				dataIndex: "grade",
				searchOption:{ formItemType:'a-select', componentOption:{options:gradeList} },		
				sorter: (a: any, b: any) => a.grade - b.grade,
				tag:true,
				showEnum:true
			},
			{
				title:'用户类型',
				dataIndex: "userType",
				showEnum:true,
				searchOption:{ 
					formItemType:'a-select', 
					componentOption:{
						options:userType
					}
				},		
			},
			{ dataIndex: "operation", title: "操作", fixed: "right" }
		],
		formColumns:[
			{
				isRule:true,
				formItemOption:{ name: 'nickname', label: '用户姓名' },
			},
			{
				isRule:true,
				formItemOption:{ name: 'age', label: '用户年龄' },
				renderForm:renderAge
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

	// ["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"]
	let xlsxHeader = state.tableColumns.filter((column) => column.title != '操作').map((column)=>column.title);

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
		xlsxHeader,
		open,
		userList
	}
}