<template>
  <a-popover
    placement="bottomLeft"
    trigger="click"
    @visible-change="handleVisibleChange"
  >
    <template #content>
      <a-checkbox-group
        ref="columnListRef"
        v-model:value="checkedList"
        @change="setChecked"
      >
        <template v-for="item in columns" :key="item.dataIndex">
          <div class="w-[300px] flex items-center justify-between py-1">
            <div class="flex items-center">
              <drag-outlined class="mr-2 cursor-pointer drag-outlined" />
              <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
            </div>
            <div class="flex items-center">
              <vertical-align-bottom-outlined
                class="rotate-90 !text-lg"
                :class="arrowClass(item, 'left')"
                @click="setupFixed(item.dataIndex, 'left')"
              />
              <a-divider type="vertical" />
              <vertical-align-top-outlined
                class="rotate-90 !text-lg"
                :class="arrowClass(item, 'right')"
                @click="setupFixed(item.dataIndex, 'right')"
              />
            </div>
          </div>
        </template>
      </a-checkbox-group>
    </template>
    <a-tooltip placement="top">
      <template #title>{{ $t("components.columnSettings") }}</template>
      <setting-outlined class="cursor-pointer" />
    </a-tooltip>
  </a-popover>
</template>

<script setup lang="ts">
import { ref, nextTick, unref, watch } from "vue";
import Sortablejs from "sortablejs";
import type Sortable from "sortablejs";
import { isNullAndUnDef } from "@/utils/is";
import { deepClone } from "@/utils/util";
interface propsInterface {
  columns: wTableProps; // 搜索配置列
}
const props = defineProps<propsInterface>();
const emit = defineEmits(["change"]);

// 显示的列表项
let checkedList = ref<string[]>([]);
watch(
  () => props.columns,
  newVal => {
    checkedList.value = newVal.filter(f => f.show).map(m => m.dataIndex);
  },
  { deep: true, immediate: true },
);

// 修改列表是否显示
const setChecked = (checkedValue: string[]) => {
  let columnList = deepClone<wTableProps>(props.columns);
  columnList.forEach(
    item => (item.show = checkedValue.some(x => item.dataIndex === x)),
  );
  emit("change", columnList);
};

// 修改列表是否固定
const setupFixed = (dataIndex: string, type: any) => {
  let columnList = deepClone<wTableProps>(props.columns);
  let num = 0;
  columnList.forEach((item: wTableProp, index) => {
    if (item.dataIndex === dataIndex && item.show) {
      num++;
      if (num === 1) {
        item.fixed = item.fixed ? "" : type;
        if (item.fixed === "left") {
          columnList.splice(0, 0, columnList[index]);
          columnList.splice(index + 1, 1);
        } else if (item.fixed === "right") {
          columnList.splice(columnList.length, 0, item);
          columnList.splice(index, 1);
        }
      }
    }
  });
  emit("change", columnList);
};
let sortable: Sortable;
let sortableOrder: string[] = [];
const inited = ref<boolean>(false);
const columnListRef = ref<ComponentRef>(null);
const handleVisibleChange = () => {
  if (inited.value) return;
  nextTick(() => {
    const columnListEl = unref(columnListRef);
    if (!columnListEl) return;
    const el = columnListEl.$el as any;
    if (!el) return;
    sortable = Sortablejs.create(unref(el), {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      handle: ".drag-outlined",
      onEnd: (evt: Sortable) => {
        const { oldIndex, newIndex } = evt;
        if (
          isNullAndUnDef(oldIndex) ||
          isNullAndUnDef(newIndex) ||
          oldIndex === newIndex
        )
          return;
        let columnList = deepClone<wTableProps>(props.columns);
        // 发现有固定则退出拖拽
        if (columnList[oldIndex]?.fixed || columnList[newIndex]?.fixed) return;
        if (oldIndex > newIndex) {
          columnList.splice(newIndex, 0, columnList[oldIndex]);
          columnList.splice(oldIndex + 1, 1);
        } else {
          columnList.splice(newIndex + 1, 0, columnList[oldIndex]);
          columnList.splice(oldIndex, 1);
        }
        emit("change", columnList);
      },
    });
    // 记录原始order 序列
    sortableOrder = sortable.toArray();
    inited.value = true;
  });
};
// 左侧箭头css
const arrowClass = (item: wTableProp, type: string) => {
  return !item.show
    ? "!text-gray-200 cursor-not-allowed"
    : item.fixed === type
    ? "!text-sky-700"
    : item.show
    ? "!text-gray-400"
    : "!text-gray-200";
};
</script>

<style lang="scss" scoped></style>
