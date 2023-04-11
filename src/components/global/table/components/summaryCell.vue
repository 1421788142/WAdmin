<template>
    <a-table-summary :fixed="row.fixed">
        <a-table-summary-row>
                <a-table-summary-cell
                    v-for="(column,index) in row.tableColumns.filter(x=>x.show)"
                    :index="index"
                >
                    <template v-if="column.summary">
                        <div class="flex flex-row items-center justify-center">
                            {{ 
                                column?.renderSummary ? 
                                column?.renderSummary(row.pageData,column) :
                                '汇总' 
                            }}
                        </div>
                    </template>
                </a-table-summary-cell>
        </a-table-summary-row>
    </a-table-summary>
</template>

<script setup lang="ts">
interface propsInterface {
    row:{
        pageData:any,
        fixed:boolean | 'top' | 'bottom',
        tableColumns:wTableProps,
        selection:boolean,
    }
}
defineProps<propsInterface>()
</script>

<style scoped>

</style>