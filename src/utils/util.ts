import { isArray, isObject } from "@/utils/is";
import { enumProp, searchFormProps } from "@/types/searchForm";
import { DeepMerge } from "@/types/utils";
import { $$t } from "@/plugins/language/setupI18n";
import { RouterHistory, createWebHistory, createWebHashHistory } from "vue-router";

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
  window.localStorage.clear();
}

/**
 * 对传入数据的深克隆
 * @param {object} target 需要克隆的对象(不可为map、set... 未做适配)
 * @param {WeakMap} map WeakMap对象
 * @return {object} 被克隆的target
 **/
export const deepClone = function <T extends object>(target: T, map: WeakMap<T, T> = new WeakMap()): T {
  if (!(target instanceof Object)) return target;
  if (map.has(target)) return map.get(target);
  const tempObject: T = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  // 对象保存 为了防止引用自身导致的内存溢出
  map.set(target, tempObject);
  Object.keys(target).forEach(key => {
    // 对于函数的单独处理
    if (target[key] instanceof Function) return (tempObject[key] = target[key].bind(tempObject));
    tempObject[key] = deepClone(target[key], map);
  });
  return tempObject;
};

/**
 * 对象深合并
 * @param target 相同属性都会被`合并`到此对象
 * @param sources 如果多个对象的属性`相同`则会被后面的`覆盖`
 * @example deepMerge({ a: 1, c: { c: 1, a: [1, 2, 3] } }, { b: 2, c: { a: [2] } })
 *  // => {a:1,b:2,c:{c:1,a:[2,2,3]}}
 * @returns 被修改之后的对象
 */
export const deepMerge = <T extends object, U extends object>(target: T, ...sources: U[]): DeepMerge<T, U> => {
  if (!isObject(target)) throw new Error("Target it should be an object");
  sources.forEach(source => {
    if (!isObject(source)) return;
    Object.keys(source).forEach(key => {
      const $value = source[key],
        _value = target[key];
      // 源对象的属性值不为对象 ===> 直接覆盖
      if (!isObject(_value)) return (target[key] = $value);
      // 合并值为不为undefined ===> 直接覆盖
      if ($value !== undefined) return (target[key] = $value);
      // 源对象属性值为对象 要合并进来的属性值不是对象 ===> 以原属性值为准
      if (!isObject($value)) return;
      // 函数 ===> 覆盖
      if (isType(_value) === isType($value) && isType($value) === "function") return (target[key] = $value);
      // 都是对象 ===> 深合并
      deepMerge(_value, $value);
    });
  });
  return target as any;
};

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
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
 * @description 格式化表格单元格默认值
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 * */
export function defaultFormat(callValue: any, joinStr: string = ",") {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(joinStr) : "--";
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
  enumData: searchFormProps["componentOption"]["options"] = [],
  type?: string,
): string {
  let filterData = enumData.find(item => item.value === callValue);
  if (type == "tag") return filterData?.color ? filterData.color : "";
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
export function setupTableEnum(labelKey: string, valueKey: string, listData: any[]): Array<EnumType> {
  let EnumList = [];
  listData.forEach(item => {
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
export function getEnumLable(key: string, value: string, title: string, listData: any[] = []) {
  let item = listData.filter(x => x[key] == value);
  return item.length > 0 && item[0][title] ? item[0][title] : "---";
}

/**
 * @description 根据table的Column对应出后台返回的值
 * @param {Array} column table的定义表格列表&&多条数据
 * @param {Array} listData 后台返回的列表
 * @return Array
 * */
export function setTableExportData<T>(columns: wTableProps, listData: T[] = []): T[] {
  let xlsxData = []; //最终返回出去的xlsx可导出数据
  listData.forEach(value => {
    let column = {};
    columns.forEach(item => {
      const listDataVlaue = value[item.dataIndex];
      const isHasEnum = (item.showEnum && item?.searchOption?.componentOption?.length) || item?.enum?.length > 0; //是否从数组取label
      column[item.dataIndex] = isHasEnum
        ? getEnumLable("value", listDataVlaue, "label", item?.searchOption?.componentOption?.options || item?.enum)
        : listDataVlaue;
    });
    let columnCopy = deepClone(column);
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
  map: Map<string, Array<T>> = new Map(),
): T[] {
  if (!Array.isArray(target)) {
    console.warn("target is not array");
    return target;
  }
  const idMap = new Map();
  target.map((item: T) => {
    const idKey = item[id];
    const pIdKey = item[pId];
    [idKey, pIdKey].forEach(idKey => {
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
  keys.forEach(key => {
    if (!idMap.has(key)) return (result = [...result, ...map.get(key)]);
    !idMap.get(key).children.length && delete idMap.get(key).children; // children子元素为空则删除该属性
  });
  return result;
}

/**
 * @description 扁平化数组对象
 * @param {Array} arr 数组对象
 * @return array
 */
export function getFlatArr(arr: any) {
  return arr.reduce((pre: any, current: any) => {
    let flatArr = [...pre, current];
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
    return flatArr;
  }, []);
}

/**
 * @description ES6中的Set数组去重
 * @param {Array} target 数据源
 * @return Array
 * */
export const arrRemoval = (target: string[]) => {
  let set = [...new Set(target)];
  return set;
};

/**
 * @description 获取当前时间区间
 * @return string
 */
export function timeState() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return $$t("sys.timeTitle1");
  if (hours >= 10 && hours <= 14) return $$t("sys.timeTitle2");
  if (hours >= 14 && hours <= 18) return $$t("sys.timeTitle3");
  if (hours >= 18 && hours <= 24) return $$t("sys.timeTitle4");
  return $$t("sys.timeTitle5");
}

/**
 * @description 防抖函数
 * @return function
 */
export function debounce(fn: any, delay: number = 300) {
  let timerId: any;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(), delay);
  };
}

/**
 * @description 获取uid
 * @return string
 */
export function getUid() {
  const time = new Date().getTime().toString();
  const timeArr = time.split("");
  const arr = "abcdefghijklmnopqrstuvwxyz".split("");
  timeArr.forEach((item, index) => {
    const random = arr[Math.floor(Math.random() * arr.length)];
    timeArr.splice(index * 2, 0, random);
  });
  return timeArr.join("");
}

/**
 * 选择某个对象中一个或多个key的value
 *```
 * const obj = {a:1}
 * pick(obj,'a') | pick(obj,['a'])=>{a:obj.a}
 * ```
 * @param {object} target 需要获取对应key-value的源数据 可以是一个JSON对象
 * @param {string | string[]} keys 字符串或数组 值为需要获取的key
 * @param {boolean} [clearNull=false] 是否需要过滤值为空的数据 默认为false
 * @return {object} object
 **/

export const pick = <T extends Record<string, any>, K extends keyof T>(
  target: (object | string) & T,
  keys: K[],
  clearNull: boolean = false,
): Pick<T, K> => {
  const newVlaue = typeof target === "string" && target.startsWith("{") ? JSON.parse(target) : ({} as T);
  if (!Array.isArray(keys)) keys = [keys];
  for (let key of new Set(keys)) {
    let value = target[key];
    if (!value && clearNull) continue;
    newVlaue[key] = value;
  }
  return newVlaue;
};

/**
 * 过滤某个对象中一个或多个key的value
 *```
 * const obj = {a:1,b:1,c:2}
 * pick(obj,'a') | pick(obj,['a'])=>{b:obj.b,c:obj.c}
 * ```
 * @param {object} target 需要获取对应key-value的源数据 可以是一个JSON对象
 * @param {string | string[]} keys 字符串或数组 值为需要获取的key
 * @return {object} object
 **/

export const filterPick = <T extends Record<string, any>, K extends keyof T>(
  target: (object | string) & T,
  keys: K[],
): Pick<T, K> => {
  let objKeys = (Object.keys(target) as K[]).filter(f => !keys.includes(f)) as (string & K)[];
  return pick<T, K>(target, objKeys);
};

/**
 * @param {string} name 文件名称：test.png
 * @param {boolean} hasLocal 是否为本地文件 否则直接返回路径
 * @returns {*|string}
 */
export const getAssets = (name: string, hasLocal: boolean = false): any | string => {
  if (hasLocal) return name;
  if (!name) return Error("name is null");
  const first = name.split("")[0];
  if (first === "/") name = name.slice(1); //去掉前缀 携带/打包后会出现问题
  return new URL(`/src/assets/${name}`, import.meta.url).href;
};

/**
 * base64下载图文
 * @param { string } base64
 * @param { string } fileName
 */
export const downloadByBase64 = (base64: string, fileName: string) => {
  let parts = base64.split(";base64,");
  let contentType = parts[0].split(":")[1];
  let raw = window.atob(parts[1]); // 解码base64得到二进制字符串
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength); // 创建8位无符号整数值的类型化数组

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i); // 数组接收二进制字符串
  }

  // 创建blob对象设置文件类型
  var blob = new Blob([uInt8Array], { type: contentType });

  var aLink = document.createElement("a");
  // 下载的文件名称
  aLink.download = fileName + "." + contentType.split("/")[1];
  aLink.href = URL.createObjectURL(blob);
  // 执行点击事件进行下载
  aLink.click();
};

/**
 * 获取路由历史模式
 * @param { string } type
 */
export const getHistoryMode = (Type: "hash" | "h5"): RouterHistory => {
  // len为1 代表只有历史模式 为2 代表历史模式中存在base参数
  const historyMode = Type.split(",");
  const leftMode = historyMode[0];
  const rightMode = historyMode[1];
  // no param
  if (historyMode.length === 1) {
    if (leftMode === "hash") {
      return createWebHashHistory();
    } else if (leftMode === "h5") {
      return createWebHistory();
    }
  } //has param
  else if (historyMode.length === 2) {
    if (leftMode === "hash") {
      return createWebHashHistory(rightMode);
    } else if (leftMode === "h5") {
      return createWebHistory(rightMode);
    }
  }
};

/**
 * @description 预加载函数
 * @param {number} number
 */

export const preload = (number: number = 500) => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove(null);
    }, number);
  });
};

/**
 * 将对象里面的字符串json属性转化为正常的对象
 * @param {object} data 需要转换属性的对象
 * @return {object} object 正常的对象格式
 */
export const resetObject = <T extends object>(data: T): T => {
  if (!data) return new Object() as T;
  const hasJsonString = (value: unknown) =>
    typeof value === "string" && (value.startsWith("{") || value.startsWith("["));
  for (const key of Object.keys(data)) {
    const value = data[key];
    hasJsonString(value) && (data[key] = JSON.parse(value));
    (isArray(data[key]) || isObject(data[key])) && (data[key] = resetObject(data[key]));
  }
  return data;
};
