// 搜索控件类型
type formItemType =
	| "a-input" //文本
	| "a-textarea" //文本域
	| "a-input-number" //数字输入框
	| "a-select" //下拉选择器
	| "a-switch" //switch开关
	| "a-date-picker" //日期选择框
	| "a-range-picker" //日期范围选择器
	| "a-time-picker" //时间选择框
	| "a-transfer" //穿梭框
	| "a-tree-select" //树选择
	| "a-calendar" //树选择
	| "a-tree" //树形控件

declare interface useSearchForm {
	formItemType?: formItemType, // 表单项类型默认文本
	componentOption?: any, //表单组件api组合
    searchSort?: number,//排序
	name: string, //form对应的键名
    initSearchParam?: string | number | boolean | any[]; // 搜索项初始值
	label?: string, // label名称
	renderForm?: (params: any) => any; //自定义表单tsx
}
