<template>
    <a-upload-dragger
        v-model:file-list="fileList"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :before-upload="beforeUpload"
        :customRequest="uploadXlsx"
    >
        <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">将文件拖到此处,或者点击上传</p>
        <p class="ant-upload-hint">请先下载模板,然后进行上传。请上传 .xls , .xlsx 标准格式文件</p>
    </a-upload-dragger>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as xlsx from 'xlsx';
import { beforeUpload } from './index';
import type { UploadProps } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import { CheckCircleTwoTone } from '@ant-design/icons-vue';
import { h } from 'vue';
const fileList = ref<UploadProps['fileList']>([]);
// 自定义上传事件
const uploadXlsx = ({file}) => {
    notification.open({
        message: '正在导入请稍后',
        description:`如果数据庞大会导致导入缓慢哦，请您耐心等待！`,
        icon: () => h(CheckCircleTwoTone, { twoToneColor: '#09F175' }),
    });
    readerData(file)
}
const emit = defineEmits(['success','error'])
/**
 * @description: 读取excel数据
 */
function readerData(rawFile: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target && e.target.result;
        const workbook = xlsx.read(data, { type: 'array', cellDates: true });
        const excelData = getExcelData(workbook);
        resolve('');
        emit('success', excelData);
      } catch (error) {
        reject(error);
        emit('error');
      } finally {
        fileList.value.pop()
      }
    };
    reader.readAsArrayBuffer(rawFile);
  });
}


/**
 * @description: 获得excel数据
 */
interface ExcelData<T = any> {
  header: string[];
  results: T[];
  meta: { sheetName: string };
}
function getExcelData(workbook: xlsx.WorkBook) {
  const excelData: ExcelData[] = [];
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const header: string[] = getHeaderRow(worksheet);
    let results = xlsx.utils.sheet_to_json(worksheet, {
      raw: true,
      dateNF: '', //Not worked
    }) as object[];
    results = results.map((row: object) => {
      for (let field in row) {
        if (row[field] instanceof Date) {
          row[field].setSeconds(row[field].getSeconds() + 43);
        }
      }
      return row;
    });
    excelData.push({
      header,
      results,
      meta: { sheetName },
    });
  }
  return excelData;
}

/**
 * @description: 第一行作为头部
 */
  function getHeaderRow(sheet: xlsx.WorkSheet) {
  if (!sheet || !sheet['!ref']) return [];
  const headers: string[] = [];
  // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
  const range = xlsx.utils.decode_range(sheet['!ref']);
  const R = range.s.r;
  // 从第一行开始
  for (let C = range.s.c; C <= range.e.c; ++C) {
    // 遍历范围内的每一列
    const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })];
    // 找到第一行的单元格
    let hdr = 'UNKNOWN ' + C; // <-- 替换为您想要的默认值
    if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}
</script>

<style scoped>

</style>