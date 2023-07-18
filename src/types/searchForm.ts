import type { SelectProps, FormItemProps } from 'ant-design-vue'


// 搜索控件类型
export type searchType =
    | "a-input" //文本
    | "a-input-number" //数字输入框
    | "a-date-picker" //日期选择框
    | "a-range-picker" //时间选择框
    | "a-time-picker" //时间选择框
    | "a-tree" //树形控件
    | "a-select" //选择器


/**
 * 枚举 1.搜索表单下拉选择框 2.table数据转换
*/
export interface enumProp {
    value: number | string,
    label: string,
    color?: string
}

type componentProps = Partial<formComponentProps<SelectProps['options'] & enumProp[]>>

export interface searchFormProps {
    type?: searchType, //组件类型,默认a-input
    sort?: number, //排序
    renderForm?: (params: any) => JSX.Element, //自定义表单tsx
    listeners?: { [prop: string]: Function },
    formItemProps?: {
        name?: string, //查询入参,默认取dataIndex
        label?: string, //查询组件的label,默认title
        labelCol?: FormItemProps['labelCol'],
        wrapperCol?: FormItemProps['wrapperCol'],
    },
    componentProps?: componentProps,
    [prop: string]: any, //暂时为了适配其他配置项
}