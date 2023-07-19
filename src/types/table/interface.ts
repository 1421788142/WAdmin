import type { TableColumnType, FormItemProps } from 'ant-design-vue'
import type { searchFormProps } from '../searchForm'

export interface searchProps {
    defaultValue?: string | number | Array<string | number>, // 搜索项初始值
    labelCol?: searchFormProps['formItemProps']['labelCol'],
    wrapperCol?: searchFormProps['formItemProps']['wrapperCol'],
}

export interface tableProps extends TableColumnType {
    title: string, //单元格表头（非特殊类型必填）
    dataIndex: string, //单元格表头（非特殊类型必填）
    search?: boolean, //是否作为查询条件,有搜索条件或者
    searchOption?: searchProps & searchFormProps  //查询表单配置项(有此配置则默认做完搜索条件)
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
    enum?: searchFormProps['componentProps']['options'], //tag标签 默认取 searchOption['options']
    showEnum?: boolean; //表格有枚举时是否显示枚举内容,默认true
    children?: tableProps[],//子表格
}