import { UploadFile } from 'ant-design-vue';

export type uploadEvent = 'success' | 'change' | 'autoUpload'

export interface fileList extends UploadFile {
    isHand?: boolean,//判断是否手动上传 以防数据混乱 注意手动上传时需要此参数为true
}

export namespace upload {
    export interface stateProps {
        fileListData:fileList[],
        notFileList:fileList[],
        action:string,
        visible:boolean,
        currentFile:fileList,
    }

    export interface hookProps {
        uploadRule: (file:UploadFile)=>boolean,
        fileList: fileList[],
        fileSize: number,
        total: number,
        fileAction: string,
        autoUpload?: boolean, //是否默认上传 
        beforeLoad?: (params: any,state:upload.stateProps) => any, //初始化前执行可处理fileList。。
        setEmit?: (event:uploadEvent,state:upload.stateProps) => any, //处理上传后拿到的数据
    }
    
    
}