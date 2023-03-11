<template>
  <div class="clearfix">
    <a-button type="primary" v-if="autoUpload" @click="autoUploadFn" class="mb-2 mr-2">
      <upload-outlined />确认上传
    </a-button>
    <a-upload
      v-model:file-list="fileList"
      :action="action"
      :headers="headers"
      :list-type="listType"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      :accept="accept"
      @change="handleChange"
    >
      <div v-if="fileList.length < total">
        <div v-if="listType === 'picture-card'">
          <plus-outlined />
          <div>{{Title}}</div>
        </div>
        <a-button v-else><upload-outlined />{{Title}}</a-button>
      </div>
    </a-upload>
    <a-modal :visible="visible" :width="600" :title="title" :footer="null" @cancel="handleCancel">
      <!-- 图片预览 -->
      <a-image v-if="uploadType === 'image'" width="100%" :src="url" />
      <!-- 视频预览 -->
      <video  v-if="uploadType === 'video'" style="width:100%; height:100%;" poster="" controls id="uploadVideo">
          您的浏览器不支持播放该视频！
      </video>
      <!-- file 文件 -->
      <div v-if="uploadType === 'file'">
        <a :href="url" target="_blank" >{{title}}</a>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useUpload } from './index'
import type { uploadType, listType } from './index'
import { ref, watch, computed} from 'vue';
import { fileInterface } from '@/apis/common'

import { message } from 'ant-design-vue';
import type { UploadProps } from 'ant-design-vue';

interface uploadInterface {
    total?: number, //总数
    autoUpload?: boolean, //是否自动上传
    autoUploadApi?:(params: any) => Promise<any>,//手动上传api
    listType?: listType, //上传列表样式
    value: Array<fileInterface>,
    headers?: any, //请求头部
    actionUrl?: string,//上传路径
    uploadType?: uploadType,//上传类型
    uploadAccept?: string,//上传类型
    uploadTitle?: string,//标题
    maxSize?: number,//文件最大多少MB
}
const props = withDefaults(defineProps<uploadInterface>(),{
  total:5,
  autoUpload:false,
  listType:'picture-card',
  actionUrl:'/upload/image',
  uploadType:'image',
  maxSize:2,
})

const accept = computed(()=>{
  let fileType = props.uploadType === 'image' ? 'image/*' : (props.uploadType === 'video' ? 'video/mp4' : '')
  return props.uploadAccept ?? fileType
})
const Title = computed(()=>{
  let titleType = props.uploadType === 'image' ? '上传图片' : (props.uploadType === 'video' ? '上传视频' : '上传文件')
  return props.uploadTitle ?? titleType
})

// 上传hook
const {
  notUploadedList,
  visible,
  url,
  title,
  beforeUpload,
  handleCancel,
  handlePreview
} = useUpload(props.autoUpload,props.maxSize,props.uploadType)

// 设置上传地址
const { VITE_API_URL } = import.meta.env
const action = computed(()=>`${VITE_API_URL}${props.actionUrl}`)

//文件列表
const fileList = ref<UploadProps['fileList']>([]);

const emit = defineEmits(['update:value','change'])
// 手动上传
const autoUploadFn = async ()=>{
  if(notUploadedList.value.length === 0) return message.warn('请先上传图片')
  const formData = new FormData();
  notUploadedList.value.forEach((item)=>{
    let file = item as unknown as Blob
    formData.append("file", file);
  })
  let { data, code }  = await props.autoUploadApi(formData)
  if(code === 200){
    emit('update:value',[data,...props.value])
    notUploadedList.value = []
  }
}

const isHasWatch = ref<boolean>(false) //是否取消监听value

watch(()=>props.value,(newImg:any[],oldImg)=>{
  if(isHasWatch.value) return
  fileList.value = newImg.map((item)=>{
    return {
      uid: String(item.id),
      name: item.name,
      status: 'done',
      url: item.url,
    }
  })
  emit('change',newImg)
},{ immediate: true })


// 上传组件change事件
const handleChange = (info)=>{ // list发生改变时的钩子
  isHasWatch.value = false
  let { file } = info
  let { status, response } = file;
  !status && !props.autoUpload && fileList.value.pop()
  if(status === 'done' && response.code === 200){
    fileList.value.pop()
    fileList.value.push({
      url:response.data.url,
      uid:String(response.data.id),
      name:response.data.name,
      status:'done'
    })
    let newFile = fileList.value.map(item=>{
      return {
        url:item.url,
        id:item.uid,
        name:item.name
      }
    })
    emit('update:value',newFile)
  } else if(status === 'removed'){
    if(props.autoUpload){
      let notList = notUploadedList.value.filter((item)=> item.uid != file.uid)
      notUploadedList.value = notList
      let removeFile = props.value.filter(item=> {
        return item.id != Number(file.uid)
      })
      notUploadedList.value.length > 0 && (isHasWatch.value = true)
      emit('update:value',removeFile)
    } else {
      let removeFile = fileList.value.filter(item=> item.uid != file.uid ).map(item=>{
        return {
          url:item.url,
          id:item.uid,
          name:item.name
        }
      })
      emit('update:value',removeFile)
    }
  } else if(status === 'error'){
    return fileList.value.pop()
  }
}
</script>
<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
