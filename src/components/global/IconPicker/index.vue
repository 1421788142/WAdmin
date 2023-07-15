<template>
  <a-input
    :value="icon"
    @change="emit('update:icon', icon)"
    :disabled="disabled"
  >
    <template #addonAfter>
      <a-popover placement="bottom" trigger="click" v-if="!disabled">
        <div class="flex items-center justify-center cursor-pointer">
          <component :is="iconValue"></component>
        </div>
        <template v-slot:content>
          <div :style="{ width: '340px', height: '250px', overflow: 'auto' }">
            <div class="grid grid-cols-8 gap-2 p-1">
              <div
                v-for="item in getPaginationList"
                :key="item"
                @click="fontClick(item)"
                class="w-[30px] h-[30px] flex justify-center items-center m-1 border cursor-pointer hover:border-cyan-600"
                :class="{ 'border-cyan-600': item === icon }"
              >
                <component :is="item"></component>
              </div>
            </div>
          </div>
          <div class="pt-2 text-center">
            <a-pagination
              :showSizeChanger="false"
              show-less-items
              class="w-[100%]"
              :total="getTotal"
              :pageSize="pageSize"
              @change="handlePageChange"
            />
          </div>
        </template>
      </a-popover>
    </template>
  </a-input>
</template>

<script setup lang="ts">
import { ref, computed, unref } from "vue";
import iconList from "./icon";

const currentPage = ref<number>(1);
const pageSize = ref<number>(48);
const getTotal = computed((): number => unref(iconList).length);

const props = defineProps({
  icon: String,
  disabled: Boolean,
});

const iconValue = computed((): string => {
  let icon = iconList.filter(item => props.icon === item);
  return icon.length > 0 ? icon[0] : iconList[0];
});

const getPaginationList = computed((): string[] => {
  //数据
  return pagination<string>(
    unref(iconList),
    unref(currentPage),
    unref(pageSize),
  );
});

function pagination<T = any>(
  list: T[] = [],
  pageNo: number = 1,
  pageSize: number = 50,
): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize));
  return ret;
}

//点击图标
const emit = defineEmits(["update:icon"]);
const fontClick = (value: string) => {
  emit("update:icon", value);
};

//切换页
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped></style>
