<template>
    <div>
        <a-button type="primary" @click="visible = true">
            <template #icon><DownloadOutlined /></template> {{ title }}
        </a-button>
        <useModal
            :title="title"
            width="1000px"
            v-model:visible="visible"
            @btnOk="btnOk"
        >
            <div class="flex items-center">
                <span class="mr-4 text-md text-zinc-500">模板下载:</span>
                <a-button type="primary" @click="downloadTemplate">
                    <template #icon><DownloadOutlined /></template>点击下载
                </a-button>
            </div>
            <div class="my-2">
                <uploadXlsxVue @success="loadDataSuccess" />
                <div class="mt-2" v-for="(item,index) in tableListRef" :key="index">
                    <a-table :dataSource="item.dataList" :columns="item.columns" />
                </div>
            </div>
        </useModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import aoaToSheetXlsx from '@/utils/aoaToSheetXlsx';
import uploadXlsxVue from './uploadXlsx.vue';
import { message } from 'ant-design-vue';
const visible = ref<Boolean>(false)
interface columnProps {
    title:string,
    valueKey:string,
}
interface importProps {
    title?:string,
    xlsxTitle?:string,
    xlsxData:any[],
    columns:columnProps[]
}
const props = withDefaults(defineProps<importProps>(),{
    title:"批量导入",
    xlsxTitle:"模板.xlsx",
    xlsxData:()=>[],
    columns:()=>[]
})

// 导出模板
const downloadTemplate = ()=>{
    aoaToSheetXlsx({
        data: props.xlsxData,
        header: props.columns,
        filename: props.title,
    });
}
// 表格最终导出数据
const tableListRef = ref<{
    title: string;
    columns?: columnProps[];
    dataList?: any[];
}[]>([]);
interface excelDataInterface {
    header:string[],
    meta:{ sheetName:string },
    results:any[],
}
function loadDataSuccess(excelDataList: excelDataInterface[]) {
    tableListRef.value = [];
    for (const excelData of excelDataList) {
        const { header, results, meta: { sheetName } } = excelData;
        const columns: any[] = [];
        for (const title of header) {
            columns.push({ title, dataIndex: title });
        }
        tableListRef.value.push({ title: sheetName, dataList: results, columns });
    }
}
// 确认提交
const btnOk = ()=>{
    message.success('提交')
}
</script>