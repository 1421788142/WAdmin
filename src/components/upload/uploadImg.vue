<template>
  <div>
    <a-upload
      :class="listType === 'picture-card' ? boxType : ''"
      v-model:file-list="fileListData"
      v-bind="$attrs"
      accept="image/*"
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
            <div class="text-[#999]">{{ text }}</div>
          </div>
          <a-button v-else>
            <upload-outlined></upload-outlined>
            <span>{{ text }}</span>
          </a-button>
        </slot>
      </div>
    </a-upload>
    <div class="text-center">
      <p>{{ tooltip }}</p>
      <slot name="autoBtnSlot">
        <a-button
          type="primary"
          v-if="handUpload && notFileList.length"
          class="mt-2 mb-2 mr-2"
          @click="handUploadFn"
        >
          <upload-outlined />
          <span>确认上传</span>
        </a-button>
      </slot>
    </div>
    <w-modal
      :width="previewWidth"
      v-model:visible="visible"
      :title="`查看${currentFile?.name}`"
      :footer="false"
    >
      <img
        alt="example"
        style="width: 100%"
        :src="currentFile?.url || currentFile?.thumbUrl"
      />
    </w-modal>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { debounce } from "@/utils/util";
import { useUpload } from "@/hooks/useUpload";
import { upload, uploadEvent } from "@/hooks/interface/upload";
import { pick } from "@/utils/util";
import { message } from "ant-design-vue";
import { UploadFile } from "ant-design-vue";
import { imageUpUrl } from "@/apis/common";

interface propsInterface {
  fileList?: upload.stateProps["fileListData"];
  fileSize?: number;
  previewWidth?: number;
  handUpload?: boolean;
  disabled?: boolean;
  total?: number;
  text?: string;
  fileAction?: string;
  tooltip?: string;
  icon?: string;
  iconStyle?: any;
  boxType?: "round" | "oblong";
  listType?: "text" | "picture" | "picture-card";
  beforeLoad?: upload.hookProps["beforeLoad"]; //初始化前执行可处理fileList。。
}
const props = withDefaults(defineProps<propsInterface>(), {
  fileList: () => [],
  handUpload: false,
  disabled: false,
  total: 4,
  previewWidth: 400,
  fileSize: 1,
  text: "上传图片",
  tooltip: "",
  fileAction: imageUpUrl,
  listType: "picture-card",
  icon: "picture-outlined",
  iconStyle: () => ({
    fontSize: "26px",
    color: "#999",
  }),
  boxType: "round",
});

const imgType = ["jpeg", "jpg", "png"]; //图片类型
const uploadRule = (file: UploadFile): boolean => {
  let isFileType = imgType.filter(v => file.type === `image/${v}`).length > 0;
  if (!isFileType) message.warn(`只能上传${imgType.join("/")}格式的图片`);
  return isFileType;
};

const emit = defineEmits(["change", "success", "handUpload"]);
const setEmit = (event: uploadEvent, state: upload.stateProps) => {
  debounce(emit(event, state), 500);
};

const {
  fileListData,
  notFileList,
  action,
  visible,
  currentFile,
  setFileList,
  beforeUpload,
  upChange,
  handUploadFn,
  handlePreview,
} = useUpload({
  uploadRule,
  setEmit,
  ...pick(props, [
    "fileList",
    "total",
    "fileSize",
    "fileAction",
    "handUpload",
    "beforeLoad",
  ]),
});

watch(
  () => props.fileList,
  (newV, oldV) => {
    setFileList(newV);
  },
  { immediate: true },
);

defineExpose({
  setEmit,
});
</script>

<style scoped lang="less">
.round {
  /deep/.ant-upload,
  /deep/.ant-upload-list-item,
  /deep/.ant-upload-list-picture-card-container,
  /deep/.ant-upload-list-item-info {
    border-radius: 50%;
  }
}
.oblong {
  /deep/.ant-upload,
  /deep/.ant-upload-list-item,
  /deep/.ant-upload-list-picture-card-container {
    width: 180px;
    height: 100px;
    border-radius: 20px;
  }
}
</style>
