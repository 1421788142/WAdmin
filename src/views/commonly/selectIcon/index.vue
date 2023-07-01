<template>
  <a-card title="Icon 选择" :bordered="false">
    <div class="w-[40%] my-5">
      <w-icon-picker v-model:icon="icon" />
    </div>
    <a-descriptions
      size="small"
      title="配置项 📚"
      class="mt-4"
      bordered
      :column="1"
    >
      <a-descriptions-item label="icon">
        双向绑定的 value 值，使用示例： v-model:icon="icon"
      </a-descriptions-item>
      <a-descriptions-item label="disabled">
        禁用图标选择器，默认为 false
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const icon = ref<string>("");
</script>

<style scoped></style>
