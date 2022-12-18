const formData = {
	menuType: "M",
    title: "",
    pId: null,
    id: null,
    component: "",
    hidden: 1,
    keepAlive: 1,
    orderNum:0,
    icon:'',
    status:1,
    perms:'',
    path:'',
    isFrame:0
}

const columns: Partial<useTableColumn>[] = [
	{
		width: 100,
        title:'菜单名称',
        dataIndex: 'title',
        search: true, 
		resizable: true,
	},
	{
		width: 50,
        title:'图标',
        dataIndex: "icon",
	},
	{
		width: 400,
        title:'组件',
        dataIndex: "component",
	},
	{
		width: 50,
        title:'状态',
        dataIndex: "hidden",
        search: true,
		searchType:'select',
		enum:[
			{ label:'启用', value: 'false' },
			{ label:'隐藏', value: 'true' },
		]
	},
	{
		dataIndex: "operation",
		title: "操作",
		width: 180,
		fixed: "right"
	},
]
export { columns, formData }