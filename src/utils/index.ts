import { isBoolean } from '@/utils/is'
import { deepMerge } from '@/utils/util';
import { Table } from "@/components/global/table/interface";
import { searchFormProps } from '@/types/searchForm';


/**
 * @description 获取排序
 * @param {Number} sort 当前排序号
 * @param {Number} defaultSort 默认排序号
 * @return string
 * */
export const getSort = (sort: number, defaultSort: number = 10) => sort ?? defaultSort //排序

/**
 * @description 处理tableColumns转换a-table columns配置项
 * @param {Array} columns 自定义的配置
 * @return {wTableProps} tableColumns 转换后的配置
 * */
export function setTableColumns(columns: wTableProps, state: Table.stateProps): void {
    state.tableColumns = columns.filter(x => !x.hide).map(m => {
        return {
            ...m,
            enum: m?.enum ?? m?.searchOption?.componentOption?.options,
            show: isBoolean(m?.show) ? m?.show : true,
            preview: isBoolean(m?.preview) ? m?.preview : true,
            showEnum: isBoolean(m?.showEnum) ? m?.showEnum : false,
            resizable: isBoolean(m?.resizable) ? m?.resizable : true,
            width: m.width || 150,
            align: m.align || 'center',
        };
    }).sort((a, b) => {
        return getSort(a.sort) - getSort(b.sort)
    })
}


/**
 * @description 处理searchForm formItem配置
 * @param {Array} columns 自定义的配置
 * @param {Array} tagget 转换后的配置
 * */
export function setSearhFormColumns(columns: wTableProps, state: Table.stateProps): void {
    state.searchColumns = columns.filter(x => x.search || x.searchOption).map(m => {
        let formItemOption = {
            name: m?.searchOption?.formItemOption?.name || m.dataIndex,
            label: m?.searchOption?.formItemOption?.label || m.title
        } as searchFormProps['formItemOption']
        let options = deepMerge({}, { ...m?.searchOption ?? {}, formItemOption })
        state.initSearchParam[options.formItemOption.name] = options?.defaultValue || null;
        return {
            formItemType: 'a-input',
            ...options,
        } as searchFormProps;
    }).sort((a, b) => {
        return getSort(a.sort) - getSort(b.sort)
    })
}