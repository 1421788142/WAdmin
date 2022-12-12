<template>
    <a-card title="导入数据" :bordered="false">
        <template #extra>
            <import-data xlsxTitle="用户表格模板" :xlsxData="xlsxData" :columns="xlsxHeader" />
        </template>
         <div>
        <div class="flex justify-end my-2">
                <a-button type="primary" @click="downloadTemplate">
                    <template #icon><DownloadOutlined /></template>导出表格
                </a-button>
            </div>
            <a-table :dataSource="data" :columns="columns" />
        </div>
    </a-card>
</template>

<script setup lang="ts">
import aoaToSheetXlsx from '@/utils/aoaToSheetXlsx';
import { xlsxHeader, data, columns, xlsxData } from './index'

// 导出模板
const downloadTemplate = ()=>{
    aoaToSheetXlsx({
        data: xlsxData,
        header: xlsxHeader,
        filename: '测试导出demo',
    });
}
</script>

<style scoped>

</style>