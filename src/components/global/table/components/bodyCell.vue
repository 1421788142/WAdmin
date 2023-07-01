<template>
  <!-- image -->
  <template v-if="row.column.image">
    <div class="table-img-box">
      <a-image
        :preview="row.column?.preview"
        :width="row.column.width || 130"
        :height="row.column?.height || 60"
        :src="row.text"
        :fallback="getAssets('image/404.png')"
      ></a-image>
    </div>
  </template>
  <!-- tag -->
  <template v-else-if="row.column?.tag && row.column?.enum">
    <a-tag :color="filterEnum(row.text, row.column.enum, 'tag')">
      {{
        row.column.enum?.length
          ? filterEnum(row.text, row.column.enum)
          : defaultFormat(row.text)
      }}
    </a-tag>
  </template>
  <!-- tooltip提示 -->
  <template v-else-if="row.column.tooltip">
    <a-tooltip :title="row.text">
      <div :class="`truncate text-center mx-auto w-[${row.column.width}px]`">
        {{ row.text }}
      </div>
    </a-tooltip>
  </template>
  <!-- 文字默认 -->
  <template v-else>
    <div :class="`truncate text-center mx-auto w-[full]`">
      {{
        row.column.enum?.length && row.column.showEnum
          ? filterEnum(row.text, row.column.enum)
          : defaultFormat(row.text)
      }}
    </div>
  </template>
</template>

<script setup lang="ts">
import { filterEnum, defaultFormat, getAssets } from "@/utils/util";
interface propsInterface {
  row: {
    text: string;
    record: any;
    index: number;
    column: wTableProp;
  };
}
defineProps<propsInterface>();
</script>

<style scoped></style>
