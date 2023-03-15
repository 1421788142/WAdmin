<template>
    <!-- image -->
    <template v-if="row.column.image">
        <div class="table-img-box">
            <a-image 
                :preview="row.column?.preview"
                :width="row.column.width || 130"
                :height="row.column?.height || 60"
                :src="row.text"
                :fallback="getAssetsImage('image/404.png')"
            ></a-image>
        </div>
    </template>
    <!-- tag -->
    <template v-else-if="row.column?.tag && row.column?.enum">
        <a-tag :color="filterEnum(row.text,row.column.enum,'tag')">
            {{ 
                row.column.enum?.length ? 
                filterEnum(row.text,row.column.enum): 
                defaultFormat(row.text)
            }}
        </a-tag>
    </template>
    <!-- 文字默认 -->
    <template v-else>
        <span>
            {{ 
                (row.column.enum?.length && row.column.showEnum) ? 
                filterEnum(row.text,row.column.enum): 
                defaultFormat(row.text) 
            }}
        </span>
    </template>
</template>

<script setup lang="ts">
import { filterEnum, defaultFormat, getAssetsImage } from '@/utils/util'
interface propsInterface {
    row:{
        text:string,
        record:any,
        index:number,
        column:wTableProp,
    }
}
defineProps<propsInterface>()

</script>

<style scoped>

</style>