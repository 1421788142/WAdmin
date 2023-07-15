<template>
  <div>
    <a-button type="primary" @click="visible = true">
      <template #icon><DownloadOutlined /></template>
      {{ title }}
    </a-button>
    <w-modal
      :title="title"
      width="1000px"
      v-model:visible="visible"
      @btnOk="btnOk"
    >
      <div class="flex items-center">
        <span class="mr-4 text-md text-zinc-500">模板下载:</span>
        <a-button type="primary" @click="downloadTemplate">
          <template #icon><DownloadOutlined /></template>
          点击下载
        </a-button>
      </div>
      <div class="my-2">
        <uploadXlsxVue @success="loadDataSuccess" />
        <div class="mt-2" v-for="(item, index) in tableListRef" :key="index">
          <a-table :dataSource="item.dataList" :columns="item.columns" />
        </div>
      </div>
    </w-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import aoaToSheetXlsx from "@/utils/aoaToSheetXlsx";
import uploadXlsxVue from "./components/uploadXlsx.vue";
import type { exportType } from "./interface";

interface propsType extends exportType.props {}
const props = withDefaults(defineProps<propsType>(), {
  title: "批量导入",
  xlsxData: () => [],
  columns: () => [],
});

const visible = ref<boolean>(false);
// 导出模板
const downloadTemplate = () => {
  aoaToSheetXlsx({
    data: props.xlsxData,
    header: props.columns,
    filename: props.title,
  });
};
// 表格最终导出数据
const tableListRef = ref<exportType.tableListType[]>([]);
function loadDataSuccess(excelDataList: exportType.excelDataType[]) {
  tableListRef.value = [];
  for (const excelData of excelDataList) {
    const {
      header,
      results,
      meta: { sheetName },
    } = excelData;
    const columns = [];
    for (const title of header) {
      columns.push({ title, dataIndex: title });
    }
    tableListRef.value.push({ title: sheetName, dataList: results, columns });
  }
}
// 确认提交
const btnOk = () => {
  props.submit(tableListRef.value);
};
</script>
