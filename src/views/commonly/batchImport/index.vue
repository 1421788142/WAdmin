<template>
  <a-card title="导入数据" :bordered="false">
    <template #extra>
      <w-import-data
        v-permission="['export', $route.meta.permission]"
        class="inline-block"
        xlsxTitle="用户表格模板"
        :xlsxData="[]"
        :submit="importDataSubmit"
        :columns="xlsxHeader"
      />
    </template>
    <div>
      <div class="flex justify-end my-2">
        <a-button type="primary" @click="downloadTemplate">
          <template #icon><DownloadOutlined /></template>
          导出表格
        </a-button>
      </div>
      <a-table :dataSource="data" :columns="columns" />
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import aoaToSheetXlsx from "@/utils/aoaToSheetXlsx";
import { xlsxHeader, data, columns, xlsxData } from "./index";

const importDataSubmit = (list: any) => {
  console.table(list);
  message.success("演示模式,不可提交,可前往控制台查看导入数据");
};

// 导出模板
const downloadTemplate = () => {
  aoaToSheetXlsx({
    data: xlsxData,
    header: xlsxHeader,
    filename: "测试导出demo",
  });
};
</script>

<style scoped></style>
