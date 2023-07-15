import { toRefs, reactive, watch } from "vue"
import { arrayToTree, debounce } from '@/utils/util'
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

    const getTreeData = () => {
        let treeData = [
            { title: '华东地区', id: 1, pId: 0 },
            { title: '华东研发', id: 11, pId: 1 },
            { title: '小吴', id: 111, pId: 11 },
            { title: '小李', id: 112, pId: 11 },
            { title: '小宋', id: 113, pId: 11 },
            { title: '华东测试', id: 12, pId: 1 },
            { title: '华东项目经理', id: 13, pId: 1 },

            { title: '华北地区', id: 2, pId: 0 },
            { title: '华北研发', id: 21, pId: 2 },
            { title: '华北测试', id: 22, pId: 2 },
            { title: '华北项目经理', id: 23, pId: 2 },

            { title: '华南地区', id: 3, pId: 0 },
            { title: '华南研发', id: 31, pId: 3 },
            { title: '华南测试', id: 32, pId: 3 },
            { title: '华南项目经理', id: 33, pId: 3 },
        ]
        setTreeData(treeData)
    }

    const setTreeData = (treeData: any[]) => {
        state.treeData = arrayToTree(treeData)
        state.treeData.unshift({ title: '全部', id: 0, pId: 0, key: 0 })
        state.treeDataTarget = arrayToTree(treeData)
        state.expandedKeys = treeData.map(x => x.id)
    }

    getTreeData()

    return {
        ...toRefs(state)
    }
}