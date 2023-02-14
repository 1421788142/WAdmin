import { reactive, toRefs } from "vue";

interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	initFormParam:any,
	tableColumns:useTableColumn[],
	formColumns:useFormProps[]
}

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
		initFormParam:{
			stars:1,
			userType:1,
			age:18
		},
		tableColumns:[
			{
				title:'用户姓名',
				dataIndex: "nickname",
				search: true,
			},
			{
				title:'创建时间',
				dataIndex: "createdTime",
				search: true,
				searchType:'dateTime',
				sorter: (a: any, b: any) =>{
					const t1 = new Date(a.createdTime).getTime();
					const t2 = new Date(b.createdTime).getTime();
					  return t1 - t2
				},
			},
			{
				title:'用户门户地址',
				dataIndex: "url",
				ellipsis: true,
			},
			{
				title:'用户头像',
				dataIndex: "avatar",
				image:true,
			},
			{
				title:'会员等级',
				dataIndex: "stars",
				tag:true,
				search: true,
				searchType:'select',
				sorter: (a: any, b: any) => a.stars - b.stars,
				enum:[
					{ label:'一级', tagType: "blue", value: 1 },
					{ label:'二级', tagType: "#FF9800", value: 2 },
					{ label:'三级', tagType: "red", value: 3 },
					{ label:'四级', tagType: "yellow", value: 4 },
					{ label:'五级', tagType: "#9C27B0", value: 5 },
				]
			},
			{
				title:'用户类型',
				dataIndex: "userType",
				tag:true,
				search: true,
				searchType:'select',
				enum:[
					{ label:'管理员', tagType: "red", value: 1 },
					{ label:'普通用户', tagType: "blue", value: 2 }
				]
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
				formItemOption:{
					label: '用户姓名',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
			},
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
				formItemOption:{
					label: '门户地址',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
			},
			{
				name: 'avatar',
				formItemOption:{
					label: '用户头像',
					rules: [{ required: true, trigger: ['blur'] }],
				},
			},
			{
				name: 'stars',
				formItemType:'a-select',
				formItemOption:{
					label: '会员等级',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				componentOption:{
					options:[
						{ label:'一级', value:1 },
						{ label:'二级', value:2 },
						{ label:'三级', value:3 },
						{ label:'四级', value:4 },
						{ label:'五级', value:5 },
					],
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
				formItemOption:{
					label: '用户类型',
					rules: [{ required: true, trigger: ['change', 'blur'] }],
				},
				componentOption:{
					options:[
						{ label:'普通用户', value:1 },
						{ label:'管理员', value:2 },
					]
				}
			}
		]
	})
	return {
		...toRefs(state)
	}
}