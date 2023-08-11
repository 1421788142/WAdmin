<template>
  <div
    class="p-2 mr-2 rounded shadow-sm bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-700"
  >
    <div class="text-xl font-bold">
      <span>
        {{
          `${title}[${
            multiple ? $t("commons.multipleChoice") : $t("commons.radio")
          }]`
        }}
      </span>
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
import { watch } from "vue";
import { useTreeFilterData } from "./index";
import { TreeProps } from "ant-design-vue";
import { $$t } from "@/plugins/language/setupI18n";

interface propInterface {
  title?: string;
  fieldNames?: TreeProps["fieldNames"];
  multiple?: boolean;
  placeholder?: string;
  defaultExpandAll?: boolean;
  dataList: any[];
}
const props = withDefaults(defineProps<propInterface>(), {
  title: () => $$t("commons.department"),
  fieldNames: () => ({ children: "children", title: "title", key: "id" }),
  multiple: false,
  defaultExpandAll: true,
  dataList: () => [],
  placeholder: () => $$t("commons.pleaseEnter", { text: $$t("commons.key") }),
});

const emit = defineEmits(["update:value", "change"]);
const select = (selectedKeys: string[], event: { selectedNodes: any[] }) => {
  let map = event.selectedNodes.map(x => x.id);
  emit("update:value", map.join(","));
  emit("change", map.join(","));
};
const { searchValue, expandedKeys, setTreeData, treeData } =
  useTreeFilterData();

watch(
  () => props.dataList,
  () => {
    setTreeData(props.dataList);
  },
  { deep: true },
);
</script>
