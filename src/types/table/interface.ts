import type { TableColumnType, SelectProps } from 'ant-design-vue'

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

type layout = {
    labelCol?: {
        span: number
    },
    wrapperCol?: {
        span: number
    }
}

export interface searchProps {
    type?: searchType, //组件类型,默认a-input
    name?: string, //查询入参,默认取dataIndex
    label?: string, //查询组件的label,默认title
    sort?: number, //排序
    defaultValue?: string | number | boolean | any[], // 搜索项初始值
    renderForm?: (params: any) => any, //自定义表单tsx
    options?: SelectProps['options'] & enumProp[],
    allowClear?: boolean,
    listeners?: { [prop: string]: Function },
    layout?: layout,
    [prop: string]: any, //暂时为了适配其他配置项
}

export interface tableProps extends TableColumnType {
    title: string, //单元格表头（非特殊类型必填）
    dataIndex: string, //单元格表头（非特殊类型必填）
    search?: boolean, //是否作为查询条件,有搜索条件或者
    searchOption?: searchProps, //查询表单配置项(有此配置则默认做完搜索条件)
    show?: boolean, //可通过表格设置显示隐藏,默认true
    hide?: boolean, //是否渲染(不会显示并且不能加入表格设置)
    tooltip?: boolean, //是否显示提示框
    tag?: boolean; //是否是标签展示
    sort?: number, //排序
    image?: boolean; //是否是图片展示
    preview?: boolean; //是否查看大图
    height?: string | number, //图片高度
    summary?: boolean, //是否汇总
    renderSummary?: (pageData: any, column: tableProps) => any, //自定义汇总内容
    enum?: searchProps['options'], //tag标签 默认取 searchOption['options']
    showEnum?: boolean; //表格有枚举时是否显示枚举内容,默认true
    children?: tableProps[],//子表格
}