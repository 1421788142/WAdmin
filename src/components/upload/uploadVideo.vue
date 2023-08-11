<template>
  <div>
    <a-upload
      :class="listType === 'picture-card' ? boxType : ''"
      v-model:file-list="fileListData"
      v-bind="$attrs"
      :list-type="listType"
      :action="action"
      :maxCount="total"
      accept="video/*"
      :disabled="disabled"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="upChange"
    >
      <template #iconRender>
        <video-camera-outlined />
      </template>
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
    <slot name="autoBtnSlot">
      <a-button
        type="primary"
        v-if="handUpload && notFileList.length"
        class="mt-2 mb-2 mr-2"
        @click="handUploadFn"
      >
        <upload-outlined />
        <span>{{ $t("buttons.confirmUpload") }}</span>
      </a-button>
    </slot>
    <w-modal
      :width="previewWidth"
      v-model:visible="visible"
      :title="`${$t('buttons.view')}${currentFile?.name}`"
      :footer="false"
    >
      <video style="width: 100%; height: 100%" poster="" controls id="video">
        {{ $t("messages.browserNoVideo") }}
      </video>
    </w-modal>
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick } from "vue";
import { useUpload } from "@/hooks/useUpload";
import { upload, uploadEvent } from "@/hooks/interface/upload";
import { pick } from "@/utils/util";
import { message } from "ant-design-vue";
import { UploadFile } from "ant-design-vue";
import { videoUpUrl } from "@/apis/common";
import { $$t } from "@/plugins/language/setupI18n";

interface propsInterface {
  fileList?: any;
  fileSize?: number;
  previewWidth?: number;
  handUpload?: boolean;
  disabled?: boolean;
  total?: number;
  text?: string;
  fileAction?: string;
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
  total: 2,
  previewWidth: 400,
  fileSize: 10,
  text: () => $$t("buttons.upload", { type: $$t("commons.video") }),
  fileAction: videoUpUrl,
  listType: "picture-card",
  icon: "picture-outlined",
  iconStyle: () => ({
    fontSize: "26px",
    color: "#999",
  }),
  boxType: "oblong",
});

const imgType = ["mp4"]; //视频类型
const uploadRule = (file: UploadFile): boolean => {
  let isFileType = imgType.filter(v => file.type === `video/${v}`).length > 0;
  message.warn(`${$$t("messages.fileType", { type: imgType.join("/") })}`);
  return isFileType;
};

const emit = defineEmits(["change", "success", "handUpload"]);
const setEmit = (event: uploadEvent, state: upload.stateProps) => {
  emit(event, state);
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

watch(
  () => visible.value,
  (newV, oldV) => {
    if (newV) {
      nextTick(() => {
        //这里一定要使用nextTick,否则document将找不到id为video的节点,因为modal框初始为隐藏状态,<video id='video'>标签初始在dom树中并不存在
        const video = document.getElementById("video") as HTMLVideoElement;
        video.src = currentFile.value.url;
      });
    } else {
      const video = document.getElementById("video") as HTMLVideoElement;
      if (!video) return;
      video.pause();
      video.removeAttribute("src"); // empty source
      video.load();
    }
  },
);
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
