import { Result } from '@/types/axios'
import { tableResultData } from '@/apis/interface'
import { searchProps } from '@/types/table/interface'
export namespace Table {
    export interface hookProps {
		columns:wTableProps,
        initParam?: any,
		pagination?: boolean,
        requestApi: (params: any) => Promise<Result<tableResultData<any[]>>>,
        beforeLoad?: (params: any) => boolean | object | void,
        afterLoad?: (records: tableResultData<any[]>, state:stateProps) => any,
    }
	export interface pageableProps {
		pageNum: number //当前页数
		pageSize: number //每页条数
		total: number // 数据总数
	}
	export interface stateProps {
		dataList: any[];
		expandedKeys: string[],
		pageable: pageableProps,
		isSelected: boolean,
		showSearch: boolean,
		errorReset: number,
		selectedList: string[] | number[] | any[],
		size: string[],
		loading: boolean,
		searchColumns:searchProps[],
		tableColumns:wTableProps,
		searchParam: {
			[key: string]: any;
		};
		initSearchParam: {
			[key: string]: any;
		};
		totalParam: {
			[key: string]: any;
		};
		icon?: {
			[key: string]: any;
		};
	}
}