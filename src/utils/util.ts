import { isArray } from "@/utils/is";
/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
	window.localStorage.clear();
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export function deepCopy<T>(obj: any): T {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object" && ![null,'null'].includes(obj[attr])) {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else
		return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

/**
 * @description 扁平化数组对象
 * @param {Array} arr 数组对象
 * @return array
 */
export function getFlatArr(arr: any) {
	return arr.reduce((pre: any, current: any) => {
		let flatArr = [...pre, current];
		if (current.children)
			flatArr = [...flatArr, ...getFlatArr(current.children)];
		return flatArr;
	}, []);
}

/**
 * @description 格式化表格单元格默认值
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue))
		return callValue.length ? callValue.join(" / ") : "--";
	return callValue ?? "--";
}

/**
 * @description 根据枚举列表查询当需要的数据
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
	callValue: any,
	enumData: any[] = [],
	type?: string
): string {
	let filterData = enumData.find((item) => item.value === callValue);
	if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
	return filterData ? filterData.label : "--";
}

/**
 * @description 根据列表返回列表处理为table枚举列表
 * @param {String} labelKey table标题
 * @param {String} valueKey 枚举value值
 * @param {Array} listData 后台返回的数据
 * @return Array
 * */
type EnumType = {
	label: string;
	value: number | string;
};

/**
 * @description 根据列表返回处理为table的enum可用数据
 * @param {String} labelKey 数据标题
 * @param {String} valueKey 数据value值
 * @param {Array} listData 后台返回的数据
 * @return Array
 * */
export function setupTableEnum(
	labelKey: string,
	valueKey: string,
	listData: any[]
): Array<EnumType> {
	let EnumList = [];
	listData.forEach((item) => {
		EnumList.push({
			label: item[labelKey],
			value: item[valueKey],
		});
	});
	return EnumList;
}

/**
 * @description 根据列表返回列表处理为table枚举列表
 * @param {String} value 拿取的value值
 * @param {String} key 根据key进行查找
 * @param {String} title 需要返回的value值
 * @param {Array} listData 后台返回的数据
 * @return Array
 * */
export function getEnumLable(
	key: string,
	value: string,
	title: string,
	listData: any[] = []
) {
	let item = listData.filter((x) => x[key] == value);
	return item.length > 0 && item[0][title] ? item[0][title] : "---";
}

/**
 * @description 根据table的Column对应出后台返回的值
 * @param {Array} column table的定义表格列表&&多条数据
 * @param {Array} listData 后台返回的列表
 * @return Array
 * */
export function setTableExportData<T>(
	columns: useTableColumn[],
	listData: T[] = []
): T[] {
	let xlsxData = [] as T[]; //最终返回出去的xlsx可导出数据
	listData.forEach((value) => {
		let column = {} as T;
		columns.forEach((item) => {
			const listDataVlaue = value[item.dataIndex];
			const isHasEnum = item.showEnum && item.enum.length > 0;
			column[item.dataIndex] = isHasEnum
				? getEnumLable("value", listDataVlaue, "label", item.enum)
				: listDataVlaue;
		});
		let columnCopy = deepCopy(column) as T;
		columnCopy.hasOwnProperty("operation") && delete columnCopy["operation"]; //判断有操作则删除该项
		xlsxData.push(columnCopy);
	});
	return xlsxData;
}

/**
 * 一维array to TreeArray (dataList, 'id', 'pId') 必须要有父子id对应关系
 * @param {Array} target 需要处理为TreeArray的源数据
 * @param {string} id 和子级数据关联的key 也是唯一值
 * @param {string} pId 和父级数据关联的key
 * @param {Map} map hash表 可不传 最后通过顶级ID get数据
 * @return Array
 * */
export function arrayToTree<T>(
	target: T[],
	id: string = "id",
	pId: string = "pId",
	map: Map<string, Array<T>> = new Map()
):T[] {
	if (!Array.isArray(target)){
		console.warn("target is not array");
		return target
	}
	const idMap = new Map();
	target.map((item: T) => {
		const idKey = item[id];
		const pIdKey = item[pId];
		[idKey, pIdKey].forEach((idKey) => {
			return !map.has(idKey) && map.set(idKey, []);
		});
		const data = {
			...item,
			children: map.get(idKey) as T[],
		};
		idMap.set(idKey, data); // 只保存id
		map.get(pIdKey).push(data);
	});

	let result = [];
	let keys = [...map.keys()]; // 保存key 直接循环会导致拿不到value值为空数组的key
	keys.forEach((key) => {
		if (!idMap.has(key)) return (result = [...result, ...map.get(key)]);
		!idMap.get(key).children.length && delete idMap.get(key).children; // children子元素为空则删除该属性
	});
	return result;
}

/**
 * @description ES6中的Set数组去重
 * @param {Array} target 数据源
 * @return Array
 * */
export const arrRemoval = (target:string[]) => {
	let set = [...new Set(target)];
	return set;
}

/**
 * @description 获取当前时间区间
 * @return string
 */
 export function timeState() {
	let timeNow = new Date();
	let hours = timeNow.getHours();
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
	if (hours >= 10 && hours <= 14) return `中午好 🌞`;
	if (hours >= 14 && hours <= 18) return `下午好 🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
	return `深夜啦，注意身体哦! 🌛`
}

/**
 * @description 防抖函数
 * @return function
 */
export function debounce(fn:any,delay:number) {
	let timerId:any;
    return function(){
        clearTimeout(timerId)
        timerId = setTimeout(()=>fn(),delay)
    }
}