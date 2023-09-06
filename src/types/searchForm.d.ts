import type { SelectProps } from 'ant-design-vue'
import type { wFormProp } from '@/types/form/interface'

/**
 * 枚举 1.搜索表单下拉选择框 2.table数据转换
*/
export interface enumProp {
    value: number | string,
    label: string,
    color?: string
}
export type searchFormProps = {
    transform?: (params: any) => any//转换搜索条件
    defaultValue?: string | number | Array<string | number>,// 搜索项初始值
} & wFormProp<Partial<
    Pick<enumProps, "label" | "value"> & {
        disabled?: boolean;
        [prop: string]: any;
    }
>[]>