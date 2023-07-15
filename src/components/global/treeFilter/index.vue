<template>
  <div
    class="p-2 mr-2 rounded shadow-sm bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-700"
  >
    <div class="text-xl font-bold">
      <span>{{ `${title}[${multiple ? "多选" : "单选"}]` }}</span>
    </div>
    <div class="flex items-center">
      <a-input-search
        v-model:value="searchValue"
        class="my-2"
        :placeholder="placeholder"
      />
    </div>
    <a-tree
      class="!w-[150px]"
      v-model:expandedKeys="expandedKeys"
      :multiple="multiple"
      :treeData="treeData"
      :defaultExpandAll="defaultExpandAll"
      :fieldNames="fieldNames"
      block-node
      @select="select"
    />
  </div>
</template>
<script setup lang="ts">
import { useTreeFilterData } from "./index";
import { TreeProps } from "ant-design-vue";

interface propInterface {
  title: string;
  fieldNames?: TreeProps["fieldNames"];
  multiple?: boolean;
  placeholder?: string;
  defaultExpandAll?: boolean;
}
withDefaults(defineProps<propInterface>(), {
  title: "部门列表",
  fieldNames: () => ({ children: "children", title: "title", key: "id" }),
  multiple: false,
  defaultExpandAll: true,
  placeholder: "输入关键字搜索",
});

const emit = defineEmits(["update:value", "change"]);
const select = (selectedKeys: string[], event: { selectedNodes: any[] }) => {
  let map = event.selectedNodes.map(x => x.id);
  emit("update:value", map.join(","));
  emit("change", map.join(","));
};
const { treeData, searchValue, expandedKeys } = useTreeFilterData();
</script>
