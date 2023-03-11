import { message } from 'ant-design-vue';
import { reactive, toRefs } from 'vue';
import type { UploadProps } from 'ant-design-vue';
import { UploadFile } from 'ant-design-vue';

import { uploadEnum } from '@/enums/sys'

const imgType = ['jpeg','jpg','png'] //图片类型
const videoType = ['mp4'] //视频类型
const fileType = ['text/plain','dist.rar','application/vnd.openxmlformats-officedocument.wordprocessingml.document'] //文件类型


export type uploadType = 'image' | 'video' | 'file' //上传类型
export type listType = 'picture-card' | 'picture' //布局类型

interface stateInterface {
    notUploadedList: UploadProps['fileList'],
    visible: boolean,
    url: string,
    title: string,
}
export const useUpload = (autoUpload: boolean, maxSize: number, uploadType: uploadType) => {
    const state = reactive<stateInterface>({
        notUploadedList: [],
        visible: false,
        url: '',
        title: '',
    })

    // 上传前校验
    const beforeUpload = (file: UploadFile) => {
        let isFileType = false
        const isCrossFileSize = file.size / 1024 / 1024 < maxSize;
        const msgTitle = uploadEnum[uploadType]
        let fileTypeTitle = null
        if(uploadType === 'image'){
            isFileType = (imgType.filter((v)=>file.type === `image/${v}`).length > 0)
            fileTypeTitle = ()=>imgType.join('/')
        } else if(uploadType === 'video') {
            isFileType = (videoType.filter((v)=>file.type === `video/${v}`).length > 0)
            fileTypeTitle = ()=>videoType.join('/')
        } else if(uploadType === 'file'){
            isFileType = (fileType.filter((v)=>file.type === `${v}`).length > 0)
            fileTypeTitle = ()=>fileType.join(' | ')
        }

        if (!isFileType) {
            message.warn(`只能上传${fileTypeTitle()}格式的${msgTitle}`);
        }
        if (!isCrossFileSize) {
            message.error(`${msgTitle}不得大于${maxSize}MB!`);
        }
        isFileType && isCrossFileSize && autoUpload && state.notUploadedList.push(file)
        return isFileType && isCrossFileSize && !autoUpload;
    }

    // 处理图片
    const getBase64 = (file: File) => {
        if (!/image\/\w+/.test(file.type)) {
            return message.warn("请确保文件为图像类型");
        }
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // 关闭预览
    const handleCancel = () => {
        state.visible = false
        state.title = ''
        if(uploadType === 'video'){
            const video = document.getElementById('uploadVideo') as HTMLVideoElement;
            video.pause();
            video.removeAttribute('src');
            video.load();  
        }
    }

    // 预览
    const handlePreview = async (file: UploadProps['fileList'][number]) => {
        if (uploadType === 'image') { //图片
            if (!file.url && !file.preview) {
                file.preview = (await getBase64(file.originFileObj)) as string;
            }
            state.url = file.url || file.preview;
        } else if(uploadType === 'video') {
            setTimeout(() => {
                const video = document.getElementById('uploadVideo') as HTMLVideoElement
                video.src = file.url
            },1000);
        } else if(uploadType === 'file'){
            state.url = file.url || file.preview;
        }
        state.visible = true;
        state.title = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
    };

    return {
        ...toRefs(state),
        beforeUpload,
        getBase64,
        handleCancel,
        handlePreview
    }
}