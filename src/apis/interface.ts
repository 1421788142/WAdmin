// 通用查询表格的接口
export interface queryTableInterface {
    pageNum: number,
    pageSize: number,
}
// 通用表格返回数据的的接口
export interface tableResultData<T> {
    dataList: T[],
    pageNum: number,
    pageSize: number,
    total: number,
    message: string,
}