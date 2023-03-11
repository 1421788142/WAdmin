import { toRefs, reactive, watch } from "vue"
import { arrayToTree, deepCopy } from '@/utils/util'

interface stateInterface {
    treeData: any[],
    treeDataTarget: any[],
    searchValue: string,
}
export const useTreeFilterData = ()=>{
    const state = reactive<stateInterface>({
        treeData: [],
        treeDataTarget: [],
        searchValue: '',
    })

    watch(()=>state.searchValue,(newVal,oldVal)=>{
        filterTreeNode(newVal)
    })

    const getTreeData = ()=>{
        let treeData = [
            { title: '华东地区', id: 1, pId:0 },
            { title: '研发', id: 11, pId:1 },
            { title: '测试', id: 12, pId:1 },
            { title: '项目经理', id: 13, pId:1 },
            { title: '华北地区', id: 2, pId:0 },
            { title: '研发', id: 21, pId:2 },
            { title: '测试', id: 22, pId:2 },
            { title: '项目经理', id: 23, pId:2 },
            { title: '华南地区', id: 3, pId:0 },
            { title: '研发', id:31, pId:3 },
            { title: '测试', id: 32, pId:3 },
            { title: '项目经理', id: 33, pId:3 },
        ]
        setTreeData(treeData)
    }
    
    const setTreeData = (treeData:any[])=>{
        state.treeData = arrayToTree(treeData)
        state.treeData.unshift({ title: '全部', id: 0, pId:0 })
        state.treeDataTarget = treeData
    }

    getTreeData()

    const filterTreeNode = (searchValue:string)=>{
        let list = state.treeDataTarget.filter(x=>x.title.search(searchValue) !== -1)
        state.treeData = arrayToTree(list)
        state.treeData.unshift({ title: '全部', id: 0, pId:0 })
    }

    return {
        ...toRefs(state)
    }
}