<template>
    <a-table-summary :fixed="row.fixed">
        <a-table-summary-row>
            <a-table-summary-cell :index="0" v-if="row.selection">汇总</a-table-summary-cell>
            <template v-for="(column,index) in row.tableColumns.filter(x=>x.show)">
                <a-table-summary-cell :index="index+1">
                    <template v-if="column.summary">
                        <div class="flex flex-row items-center justify-center">
                            {{ column.renderSummary(row.pageData,column) ?? '请定义汇总内容' }}
                        </div>
                    </template>
                </a-table-summary-cell>
            </template>
        </a-table-summary-row>
    </a-table-summary>
</template>

<script setup lang="ts">
interface propsInterface {
    row:{
        pageData:any,
        fixed:boolean,
        tableColumns:wTableProps,
        selection:boolean,
    }
}
defineProps<propsInterface>()
</script>

<style scoped>

</style>