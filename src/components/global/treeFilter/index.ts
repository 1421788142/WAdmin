import { toRefs, reactive, watch } from "vue"
import { arrayToTree, debounce, deepClone } from '@/utils/util'
import { TreeProps } from "ant-design-vue"
import { searchTree } from 'xe-utils'

interface stateInterface {
    treeData: TreeProps['treeData'],
    treeDataTarget: TreeProps['treeData'],
    expandedKeys: TreeProps['expandedKeys'],
    searchValue: string,
}
export const useTreeFilterData = () => {
    const state = reactive<stateInterface>({
        treeData: [],
        treeDataTarget: [],
        expandedKeys: [],
        searchValue: '',
    })

    const filterTreeNode = () => {
        state.treeData = searchTree(
            state.treeDataTarget,
            (item) => item.title.indexOf(state.searchValue) > -1,
            { children: 'children' }
        )
    }

    watch(() => state.searchValue, (newVal, oldVal) => {
        let fn = debounce(filterTreeNode, 300)
        fn()
    })

    const setTreeData = (treeData: any[]) => {
        state.treeData = arrayToTree(treeData)
        state.treeData.unshift({ title: '全部', id: 0, pId: 0, key: 0 })
        state.treeDataTarget = deepClone(state.treeData)
        state.expandedKeys = treeData.map(x => x.id)
    }

    return {
        ...toRefs(state),
        setTreeData,
    }
}