<template>
  <div>
    <a-card title="打字机">
      <typeit :values="values" />
    </a-card>
  </div>
</template>

<script setup lang="tsx">
import typeit from "@/components/typeit/index.vue";
const values = [
  "一个人独立开发框架并且封装常用组件",
  "掌握Github常用命令",
  "尽快学习React",
];
</script>

<style scoped></style>
