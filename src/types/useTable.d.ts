interface enumProps {
	label: string; // 选项框显示的文字
	value: any; // 选项框值
	tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
	children?: enumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
}

// 搜索控件类型
type searchType =
	| "text" //文本
	| "select" //下拉选择
	| "multipleSelect" //下拉选择多选
	| "treeSelect" //树选择器
	| "multipleTreeSelect" //多选树选择器
	| "time" //时间--时分秒
	| "timeAnge"  //时间区间--时分秒
	| "date" //日期--年月日
	| "dateTime" //日期--年月日时分秒
	| "dateAnge" // 日期区间--年月日
	| "dateTimeAnge"; //日期区间--年月日时分秒
						//index索引  选择框   展开下级
type fixedProp = 'left' | 'right' //固定列表
type alignProp = 'left' | 'center' | 'right' //固定列表
interface useTableColumn {
	dataIndex: string; // 单元格数据（非特殊类型必填）
	newSearch?: string; // 搜索条件 有则取 newSearch 无则取dataIndex 
	title: string; // 单元格标题（非特殊类型必填）
	width?: number | string; // 列宽
	height?: string; // 列宽
	isShow?: boolean; // 是否显示
	clearable? :boolean, //是否可清空
	tag?: boolean; // 是否是标签展示
	ellipsis?: boolean; // 文字是否超出隐藏
	align?: alignProp; //表格内容对齐方向
	image?: boolean; // 是否是图片展示
	search?: boolean; // 是否为搜索项
	showEnum?: boolean; // 表格有枚举时是否显示枚举内容
	resizable?: boolean; // 是否改变表头宽度
	searchType?: searchType; // 搜索项类型
	sorter?: Object; // 表头排序
	initSearchParam?: string | number | boolean | any[]; // 搜索项初始值
	enum?: enumProps[]; // 枚举类型（渲染值的字典）
	fixed?: fixedProp //表格固定
}
