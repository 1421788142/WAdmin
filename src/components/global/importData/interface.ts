export namespace exportType {
    export interface columns {
        title: string;
        valueKey: string;
    }
    export interface props {
        title?: string;
        xlsxData: string[][];
        columns: string[];
        submit: (list: any) => void;
    }
    export interface excelDataType {
        header: string[];
        meta: { sheetName: string };
        results: { [key: string]: string }[];
    }
    export interface tableListType {
        title: string;
        columns: { title: string, dataIndex: string }[];
        dataList?: excelDataType['results'];
    }
}