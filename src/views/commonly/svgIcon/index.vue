<template>
  <div>
    <a-card
      title="SVG图标目前使用vite-plugin-svg-icons实现,官方文档请查看:https://github.com/vbenjs/vite-plugin-svg-icons"
      :bordered="false"
    >
      <div class="flex">
        <w-svg-icon name="binggun" />
        <w-svg-icon name="caomei" />
        <w-svg-icon name="jiemo" />
        <w-svg-icon name="tiantianquan" />
        <w-svg-icon name="binggun" />
        <w-svg-icon name="yumibing" />
      </div>
      <a-descriptions
        size="small"
        title="配置项 📚"
        class="mt-4"
        bordered
        :column="1"
      >
        <a-descriptions-item label="name">
          图标的名称，svg 图标必须存储在 src/assets/icons 目录下
        </a-descriptions-item>
        <a-descriptions-item label="prefix">
          图标的前缀，默认为 "icon"
        </a-descriptions-item>
        <a-descriptions-item label="iconStyle">
          图标的样式，默认样式为 { width: "100px", height: "100px" }
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
