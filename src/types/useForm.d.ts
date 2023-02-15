// 搜索控件类型
type formItemType =
	| "a-input" //文本
	| "a-input-number" //数字输入框
	| "a-select" //下拉选择器
	| "a-switch" //switch开关
	| "a-auto-complete" //自动完成
	| "a-cascader" //级联选择
	| "a-checkbox-group" //多选框
	| "a-date-picker" //日期选择框
	| "a-rate" //评分
	| "a-slider" //滑动输入条
	| "a-time-picker" //时间选择框
	| "a-transfer" //穿梭框
	| "a-tree-select" //树选择
	| "a-calendar" //树选择
	| "a-tree" //树形控件
	| "a-progress" //进度条

declare interface useFormProps {
	formItemType?: formItemType, // 表单项类型默认文本
	componentOption?: any, //表单组件api组合
	formItemOption: any, //form-item的api
	name: string, //form对应的键名
	tooltip?: string, //label 提示语
	tooltipPlacement?: string,
	label?: string, // 使用tooltip时需要label(并且formItemOption里面不能有label,否则冲突)
	renderForm?: (params: any) => any; //自定义表单 （componentType为component必传）
	isHide?: (params: any) => any; //自定义表单 （componentType为component必传）
}
