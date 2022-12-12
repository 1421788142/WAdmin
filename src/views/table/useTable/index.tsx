import { reactive, toRefs } from "vue";

interface stateInterface {
	title:string, //modal 标题
	visible:boolean, //modal是否显示
	initFormParam:any,
	tableColumns:useTableColumn[],
	formColumns:useFormProps[]
}

// 自定义(使用tsx语法)
const renderAge = (scope:any) => {
	return (
		<a-input-number step={1} min={1} max={100} v-model:value={scope.row.age}></a-input-number>
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
			{ title:'用户姓名', value:'nickname', rule:[{ required: true, trigger: ['change', 'blur'] }] },
			{ title:'用户年龄', value:'age',
				componentType:'component',
				renderForm:renderAge
			},
			{ title:'门户地址', value:'url' },
			{ title:'用户头像', value:'avatar', 
				componentType:'slot',
				rule:[{ required: true, trigger: ['change', 'blur'] }] 
			},
			{ title:'会员等级', value:'stars', formItemType:'select',
				selectList:[
					{lable:'一级', value:1},
					{lable:'二级', value:2},
					{lable:'三级', value:3},
					{lable:'四级', value:4},
					{lable:'五级', value:5},
				],
				rule:[{ required: true, trigger: ['change', 'blur'] }]
			},
			{ title:'用户类型', value:'userType', formItemType:'select', 
				selectList:[
					{lable:'普通用户', value:1},
					{lable:'管理员', value:2}
				],
				rule:[{ required: true, trigger: ['change', 'blur'] }]
			}
		]
	})
	return {
		...toRefs(state)
	}
}