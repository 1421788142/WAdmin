<template>
  <div>
    <a-card title="富文本编辑器,采用开源的Wangeditor" :bordered="false">
      <div class="flex items-center justify-center py-3">
        <span class="mr-4 text-2xl font-bold">编辑器组件</span>
        <a-button type="primary" @click="dialogVisible = true">
          内容预览
        </a-button>
      </div>
      <w-wang-editor height="400px" v-model:value="content" />
      <a-descriptions
        size="small"
        title="配置项 📚"
        class="mt-4"
        bordered
        :column="1"
      >
        <a-descriptions-item label="value">
          双向绑定的 value 值，使用示例： v-model:value="content"
        </a-descriptions-item>
        <a-descriptions-item label="toolbarConfig">
          富文本 ToolBar区域 配置：
          <a href="https://www.wangeditor.com/v5/toolbar-config.html">
            https://www.wangeditor.com/v5/toolbar-config.html
          </a>
        </a-descriptions-item>
        <a-descriptions-item label="editorConfig">
          富文本 ToolBar区域 配置：
          <a
            href="富文本 编辑区域 配置： https://www.wangeditor.com/v5/editor-config.html"
          >
            富文本 编辑区域 配置：
            https://www.wangeditor.com/v5/editor-config.html
          </a>
        </a-descriptions-item>
        <a-descriptions-item label="height">
          富文本高度，默认为 600px
        </a-descriptions-item>
        <a-descriptions-item label="mode">
          富文本模式，默认为 default（"default" | "simple"）
        </a-descriptions-item>
        <a-descriptions-item label="hideToolBar">
          隐藏 ToolBar 区域，默认为 false
        </a-descriptions-item>
        <a-descriptions-item label="disabled">
          禁用富文本编辑器，默认为 false
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <w-modal
      title="富文本内容预览"
      width="1000px"
      @check-validate="checkValidate"
      v-model:visible="dialogVisible"
    >
      <div class="view" v-html="content"></div>
    </w-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const content = ref("");
const checkValidate = () => {
  console.log("取消焦点");
};
const dialogVisible = ref(false);
</script>

<style scoped lang="scss"></style>
