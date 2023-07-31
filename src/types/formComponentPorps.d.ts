// 所有表单组件的props属性集合
declare type formComponentProps<T> = {
    /**
     * 表单组件事件
     * { chnage:()=>void, blur:()=>void }
     */
    listeners?: { [prop: string]: Function },
    options: T, //此次选项兼容 searchForm 和 proForm
    allowClear: boolean, //是否清空组件数据内容
    autofocus: boolean,
    disabled: boolean,
    placeholder: string,
    size: 'large' | 'middle' | 'small',
    format: string,
    valueFormat: string,
    filterOption?: (value: any, option: any) => boolean,
    [prop: string]: any,
}