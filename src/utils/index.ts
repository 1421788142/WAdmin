import { isBoolean } from '@/utils/is'
import { pick, filterPick } from './util';
import { Table } from "@/components/global/table/interface";


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
            enum: m?.enum ?? m?.searchOption?.options,
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
        let options = m?.searchOption
        let searchOption = {
            label: options?.label || m.title,
            name: options?.name || m.dataIndex,
            formItemType: options?.formItemType || 'a-input',
            ...(options ?? {})
        }
        state.initSearchParam[searchOption.name] = searchOption?.defaultValue || null;
        let formItemProps = pick(searchOption, ['label', 'name', 'labelCol', 'wrapperCol'])
        let componentProps = filterPick(searchOption, [
            'label',
            'name',
            'labelCol',
            'formItemType',
            'wrapperCol',
            'renderForm',
            'defaultValue',
            'listeners',
            'sort',
            'transform'
        ])

        return {
            formItemType: searchOption.formItemType,
            transform: searchOption?.transform,
            renderForm: searchOption?.renderForm,
            sort: searchOption.sort,
            listeners: searchOption?.listeners,
            formItemProps,
            componentProps
        }
    }).sort((a, b) => {
        return getSort(a.sort) - getSort(b.sort)
    })
}