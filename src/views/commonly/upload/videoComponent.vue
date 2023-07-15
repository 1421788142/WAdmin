<template>
  <a-card class="!mb-4" title="上传视频组件" :bordered="false">
    <uploadVideoVue />
    <a-descriptions
      size="small"
      title="配置项 📚（参数大致和图片组件一致）"
      class="mt-4"
      bordered
      :column="1"
    >
      <a-descriptions-item label="fileList">
        双向绑定的 fileList 值，使用示例： v-model:file-list="fileList"
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script setup lang="ts">
import uploadVideoVue from "@/components/upload/uploadVideo.vue";
</script>

<style scoped></style>
