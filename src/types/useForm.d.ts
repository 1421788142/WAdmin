// 搜索控件类型
type formItemType =
	| "text" //文本
	| "inputNumber" //数字输入框
	| "select" //下拉选择
	| "multipleSelect" //下拉选择多选
	| "treeSelect" //树选择器
	| "multipleTreeSelect" //多选树选择器
	| "time" //时间--时分秒
	| "timeange"  //时间区间--时分秒
	| "date" //日期--年月日
	| "datetime" //日期--年月日时分秒
	| "daterange" // 日期区间--年月日
	| "datetimerange"; //日期区间--年月日时分秒

// 文本框类型
type inputType = 'text' | 'number' | 'password' | 'color' | 'email'
// 表单类型
type componentType = 'default' | 'slot' | 'component'

declare interface useFormProps {
	value: string; // 表单name（必填）
	title: string; // 表单标题（必填）
	isHasShow?: boolean; // 是否显示
	componentType?: componentType; // 表单类型
	renderForm?: (params: any) => any; //自定义表单 （componentType为component必传）
	clearable?: boolean, //是否可清空
	formItemType?: formItemType, // 表单项类型默认文本
	rule?: any[], //校验规则
	selectList?: any[], //select | tree配置项,
	selectLabel?: string, //选择器的label
	selectValue?: string, //选择器的value
	step?: number, //数字输入框的step值
	inputType?: inputType, //文本框输入类型
	minNumber?: number, //数字输入最小值
	maxNumber?: number, //数字输入最大值
}
