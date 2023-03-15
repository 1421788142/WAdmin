import type { SelectProps, FormItemProps  } from 'ant-design-vue'

// 搜索控件类型
export type formItemType =
    | "a-input" //文本
    | "a-textarea" //文本域
    | "a-input-number" //数字输入框
    | "a-select" //下拉选择器
    | "a-switch" //switch开关
    | "a-auto-complete" //自动完成
    | "a-cascader" //级联选择
    | "a-checkbox-group" //多选框
    | "a-date-picker" //日期选择框
    | "a-range-picker" //日期范围选择器
    | "a-rate" //评分
    | "a-slider" //滑动输入条
    | "a-time-picker" //时间选择框
    | "a-transfer" //穿梭框
    | "a-tree-select" //树选择
    | "a-calendar" //树选择
    | "a-tree" //树形控件
    | "a-progress" //进度条


export interface formProps {
	formItemType?: formItemType, // 表单项类型默认文本
    isHide?: (params:any)=>boolean, //可通过表格设置显示隐藏,默认true
    sort?: number, //排序
    tooltip?: string, //label 提示语
	tooltipPlacement?: string, //label 提示语位置
	name?: string, // 使用tooltip时需要name(并且formItemOption里面不能有name,否则冲突)
	label?: string, // 使用tooltip时需要label(并且formItemOption里面不能有label,否则冲突)
	formItemOption?: FormItemProps, //form-item的api
    componentOption?: { //表单组件api组合
        options?:SelectProps['options'],
        [prop:string]: any
    },
	renderForm?: (params: any) => any; //自定义表单tsx
}