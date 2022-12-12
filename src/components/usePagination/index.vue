<template>
    <div class="flex justify-end py-2">
        <a-pagination
            :show-total="total => `总共 ${total} 条数据`"
            v-model:current="pageable.pageNum"
            v-model:page-size="pageable.pageSize" 
            :total="pageable.total"
            show-less-items
            @change="setupPagination"
        />
    </div>
</template>
<script lang="ts" setup>
interface Pageable {
    pageNum: number,
    pageSize: number,
    total: number,
}
interface PaginationProps {
	pageable: Pageable;
	setupPagination: () => void;
}
defineProps<PaginationProps>();
</script>

