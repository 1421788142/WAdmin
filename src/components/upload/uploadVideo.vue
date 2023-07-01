<template>
    <div>
        <a-upload
            :class="listType === 'picture-card' ? boxType : ''"
            v-model:file-list="fileListData"
            v-bind="$attrs"
            :list-type="listType"
            :action="action"
            :maxCount="total"
            :disabled="disabled"
            :before-upload="beforeUpload"
            @preview="handlePreview"
            @change="upChange"
        >
            <div v-if="fileListData.length < total">
                <slot name="btnSlot">
                    <div v-if="listType === 'picture-card'">
                        <component :style="iconStyle" v-if="icon" :is="icon" />
                        <div class="text-[#999]">{{text}}</div>
                    </div>
                    <a-button v-else>
                        <upload-outlined></upload-outlined>
                        <span>{{text}}</span>
                    </a-button>
                </slot>
            </div>
        </a-upload>
        <slot name="autoBtnSlot">
            <a-button type="primary"
                v-if="autoUpload && notFileList.length"
                class="mt-2 mb-2 mr-2" 
                @click="autoUploadFn"
            >
                <upload-outlined />
                <span>确认上传</span>
            </a-button>
        </slot>
        <w-modal :width="previewWidth" v-model:visible="visible" :title="`查看${currentFile?.name}`">
            <img alt="example" style="width: 100%" :src="currentFile?.url || currentFile?.thumbUrl" />
        </w-modal>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useUpload } from '@/hooks/useUpload'
import { upload, uploadEvent } from '@/hooks/interface/upload'
import { pick } from '@/utils/util';
import { message } from 'ant-design-vue'
import{ UploadFile } from 'ant-design-vue'
// 设置上传地址
interface propsInterface {
    fileList?:any,
    fileSize?:number,
    previewWidth?:number,
    autoUpload?:boolean,
    disabled?:boolean,
    total?:number,
    text?:string,
    fileAction?:string,
    icon?:string,
    iconStyle?:any,
    boxType?:'round' | 'oblong',
    listType?:'text' | 'picture' | 'picture-card',
	beforeLoad?: upload.hookProps['beforeLoad'], //初始化前执行可处理fileList。。
}
const props = withDefaults(defineProps<propsInterface>(),{
    fileList:()=>[],
    autoUpload:false,
    disabled:false,
    total:2,
    previewWidth:400,
    fileSize:1,
    text:'上传图片',
    fileAction:'/upload/image',
    listType:'picture-card',
    icon:'picture-outlined',
    iconStyle:()=>({
        fontSize: '26px',
        color:'#999'
    }),
    boxType:'round'
})

const imgType = ['jpeg','jpg','png'] //图片类型
const uploadRule = (file:UploadFile):boolean=>{
    let isFileType = (imgType.filter((v)=>file.type === `image/${v}`).length > 0)
    if(!isFileType) message.warn(`只能上传${imgType.join('/')}格式的图片`);
    return isFileType
}

const emit = defineEmits(['change','success','autoUpload'])
const setEmit = (event:uploadEvent,state:upload.stateProps)=>{
    emit(event,state)
}

const { 
    fileListData,
    notFileList,
    action,
    visible,
    currentFile,
    setFileList,
    beforeUpload,
    upChange,
    autoUploadFn,
    handlePreview,
} = useUpload({
    uploadRule,
    setEmit,
    ...pick(props,[
		'fileList',
		'total',
		'fileSize',
		'fileAction',
		'autoUpload',
		'beforeLoad'
	])
})

watch(()=>props.fileList,(newV,oldV)=>{
    setFileList(newV)
},{ immediate:true })

</script>

<style scoped lang="less">
    .round{
        /deep/.ant-upload, 
        /deep/.ant-upload-list-item, 
        /deep/.ant-upload-list-picture-card-container, 
        /deep/.ant-upload-list-item-info{
            border-radius: 50%;
        }
    }
    .oblong{
        /deep/.ant-upload, 
        /deep/.ant-upload-list-item, 
        /deep/.ant-upload-list-picture-card-container{
            width: 180px;
            height: 100px;
            border-radius: 20px;
        }
    }
</style>