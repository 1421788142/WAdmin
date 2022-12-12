import { ref, computed } from "vue";

/**
 * @description 表格多选数据操作
 * */
export const useSelection = (key:any) => {
	// 是否选中数据
	const isSelected = ref<boolean>(false);
	// 选中的数据列表
	const selectedList = ref([]);
	// 当前选中的所有keyVal(数组)，可根据项目自行配置keyVal字段
	const selectedListIds = computed((): string[] => {
		let rows: string[] = [];
		selectedList.value.forEach(item => {
			if(key === 'allKey') { //如果为allKey 则返回列表全部数据
				rows.push(item);
			} else {
				rows.push(item[key]);
			}
		});
		return rows;
	});

	/**
	 * @description 多选操作
	 * @param {Array} rowArr 当前选择的所有数据
	 * @return void
	 */
    type Key = string | number;
	const selectionChange = (selectedRowKeys: Key[]) => {
		isSelected.value = selectedRowKeys.length !== 0
		selectedList.value = selectedRowKeys;
	};

	return {
		isSelected,
		selectedList,
		selectedListIds,
		selectionChange
	};
};
