import type { SelectProps, FormItemProps } from 'ant-design-vue'
import type { formItemOptionType } from '@/types/form/interface'

/**
 * 枚举 1.搜索表单下拉选择框 2.table数据转换
*/
export interface enumProp {
    value: number | string,
    label: string,
    color?: string
}

export type searchFormProps = {
    formItemProps?: {
        name?: string, //查询入参,默认取dataIndex
        label?: string, //查询组件的label,默认title
        labelCol?: FormItemProps['labelCol'],
        wrapperCol?: FormItemProps['wrapperCol'],
    },
} & formItemOptionType & Partial<formComponentProps<SelectProps['options'] & enumProp[]>>