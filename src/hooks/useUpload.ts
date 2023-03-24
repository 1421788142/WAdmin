import { reactive, toRefs } from "vue"
import { upload, fileList } from './interface/upload'
import { uploadFile } from '@/apis/common'

import {
    UploadProps,
    UploadChangeParam, 
    message,
    UploadFile
} from 'ant-design-vue'

export const useUpload = ({
    uploadRule,
    setEmit,
	fileSize,
	total,
	fileAction,
    autoUpload,
	beforeLoad,
}:upload.hookProps) => {
    const state = reactive<upload.stateProps>({
        fileListData:[], //显示的文件
        notFileList:[], //待上传文件
        action:'', //上传地址
        visible:false, //预览
        currentFile:null
    })

    // 设置请求前缀
    const { VITE_API_URL } = import.meta.env
    state.action = `${VITE_API_URL}${fileAction}`

    // 处理默认fileList
    const setFileList = (fileList:UploadProps['fileList'])=>{
        beforeLoad ? beforeLoad(fileList,state) : state.fileListData = fileList || []
    }

    const uploadSize = (file:UploadFile):boolean=>{
        const isMax = file.size / 1024 / 1024 < fileSize;
        if(!isMax) message.warn(`文件大小不能大于${fileSize}MB!`)
        return isMax
    }

    const beforeUpload = (file:UploadFile, fileList:UploadProps['fileList'])=>{
        if(state.fileListData.length >= total){
            message.warn(`最多上传${total}个文件`)
            return false
        }
        if(!uploadSize(file) || !uploadRule(file)){ //判断文件类型,大小
            setTimeout(()=>state.fileListData.pop(),100)
            return false
        } 
        if(autoUpload) { //自定义上传
            state.notFileList.push(file)
            return false
        }
        return true
    }

    // 变化事件
    const upChange = (info: UploadChangeParam<UploadFile<uploadFile>>)=>{
        let { status, response } = info.file
        if(status === 'done'){
            let { code, data, message:msg } = response
            state.fileListData.pop()
            if(code === 200){
                state.fileListData.push({
                    url:data.url,
                    status:'done',
                    uid:String(data.id),
                    name:data.name
                })
                setEmit('success',state)
                setEmit('change',state)
            } else {
                message.warn(msg ?? '上传失败')
            }
        } else if(status === 'removed') {
            state.notFileList = state.notFileList.filter(x=>x.uid !== info.file.uid)
            setEmit('change',state)
        }
    }

    // 手动上传
    const autoUploadFn = ()=>{
        setEmit('autoUpload',state)
    }

    const handlePreview = (flie:fileList)=>{
        state.visible = true
        state.currentFile = flie
    }

    return {
        ...toRefs(state),
        beforeUpload,
        upChange,
        setFileList,
        autoUploadFn,
        handlePreview
    }
}