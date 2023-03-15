<template>
    <div class="flex justify-end py-2">
        <a-pagination
            :show-total="(total:number) => `总共 ${total} 条数据`"
            v-model:current="pageable.pageNum"
            v-model:page-size="pageable.pageSize" 
            :showSizeChanger="showSizeChanger"
            :total="pageable.total"
            show-less-items
            @change="change"
            v-bind="$attrs"
        />
    </div>
</template>
<script lang="ts" setup>
export interface pageable {
    pageNum: number //当前页数
    pageSize: number //每页条数
    total: number // 数据总数
}

export interface pageProps {
    pageable?: pageable
    hideOnSinglePage?: boolean // 	只有一页时是否隐藏分页器
    change?: (page: number, pageSize: number) => void // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
    showSizeChanger?: boolean
}

withDefaults(defineProps<pageProps>(),{
    pageable: () => ({
        pageNum: 1,
        pageSize: 10,
        total: 0
    }),
    hideOnSinglePage: false,
    change: () => {},
    showSizeChanger: true
})
</script>

