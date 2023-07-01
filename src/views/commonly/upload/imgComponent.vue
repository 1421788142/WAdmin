<template>
  <div>
    <a-card title="多图片上传" :bordered="false">
      <div class="flex justify-around">
        <uploadImgVue
          tooltip="圆形组件，图片最大为5M"
          :fileSize="5"
          uploadType="image"
        />
        <uploadImgVue
          tooltip="方形组件，图片最大为2M"
          :fileSize="2"
          boxType="oblong"
          uploadType="image"
        />
      </div>
      <a-descriptions
        size="small"
        title="配置项 📚（其它参数和单图上传组件相同）"
        class="mt-4"
        bordered
        :column="1"
      >
        <a-descriptions-item label="fileList">
          双向绑定的 fileList 值，使用示例： v-model:file-list="fileList"
        </a-descriptions-item>
        <a-descriptions-item label="total">
          最大图片上传数，默认为 4 张
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="单图片上传" class="!mt-4" :bordered="false">
      <div class="flex justify-around">
        <uploadImgVue tooltip="圆形组件" :fileSize="5" uploadType="image" />
        <uploadImgVue
          tooltip="长方形组件"
          :fileSize="5"
          uploadType="image"
          boxType="oblong"
        />
        <uploadImgVue
          tooltip="有图（禁用编辑、删除）"
          :fileList="fileList"
          :total="1"
          uploadType="image"
          boxType="oblong"
          disabled
        />
      </div>
      <a-descriptions
        size="small"
        title="配置项 📚（其它参数和单图上传组件相同）"
        class="mt-4"
        bordered
        :column="1"
      >
        <a-descriptions-item label="fileSize">
          单个图片文件大小限制，默认为 1M
        </a-descriptions-item>
        <a-descriptions-item label="previewWidth">
          预览图片,默认 400px
        </a-descriptions-item>
        <a-descriptions-item label="fileAction">
          图片上传api 默认为/upload/image
        </a-descriptions-item>
        <a-descriptions-item label="autoUpload">
          是否自定义上传 默认为false 需要搭配 @autoUpload
        </a-descriptions-item>
        <a-descriptions-item label="text">
          上传按钮文本 上传图片
        </a-descriptions-item>
        <a-descriptions-item label="tooltip">
          文本提示 默认为空
        </a-descriptions-item>
        <a-descriptions-item label="disabled">
          是否禁用编辑删除 默认为fasle
        </a-descriptions-item>
        <a-descriptions-item label="listType">
          上传组件展示类型 默认为picture-card
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { upload } from "@/hooks/interface/upload";
import uploadImgVue from "@/components/upload/uploadImg.vue";

const fileList = ref<upload.stateProps["fileListData"]>([
  {
    url: "https://vben.vvbin.cn/assets/header-1b5fa5f8.jpg",
    status: "done",
    isHand: true, //手动上传 以防数据混乱
    uid: "1311233",
    name: "图片",
  },
]);
</script>

<style scoped></style>
