import type { SelectProps, FormItemProps } from 'ant-design-vue'
import type { TooltipPlacement } from 'ant-design-vue/es/tooltip/index'
import { Ref } from 'vue'

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
    | "a-input-password" //进度条

export type wFormProp<T> = {
    sort?: number, //排序
    formItemType?: formItemType, // 表单项类型默认文本
    renderForm?: (params: any) => JSX.Element, //自定义表单tsx
    formItemOption?: FormItemProps & { name?: string, label?: string }, //form-item的api
    componentOption?: Partial<formComponentProps<T>>,
}

export type wFormProps = {
    isHide?: (params: any) => boolean, //可通过表格设置显示隐藏,默认true
    tooltip?: string, //label 提示语
    /**
     * 使用tooltip时需要label(并且formItemOption里面不能有label,否则冲突)
     * 
     */
    label?: string,
    tooltipPlacement?: TooltipPlacement, //label 提示语位置
    //默认验证(默认给表单添加rules(可被formItemOption的rules替换)  rules: [{ required: true, trigger: ['change', 'blur'] }] )
    isRule?: boolean,
    validator?: (param: any) => void, //验证器
    colSpan?: number, //col占比
} & wFormProp<Ref<SelectProps['options']> | SelectProps['options']>