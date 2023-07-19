<template>
  <div class="h-full">
    <w-table
      ref="table"
      selection
      :requestApi="userList"
      :columns="tableColumns"
      rowKey="userId"
      :selectionOption="{
        selectedRowKeys: selecteId,
        onChange: r => (
          (selecteId = r), message.success(JSON.stringify(selecteId))
        ),
      }"
    >
      <template #tableHeader>
        <w-button type="add" btnType="primary" @click="update()" />
      </template>
      <template #url="{ row }">
        <a :href="row.text">{{ row.text }}</a>
      </template>
      <template #operation="{ row }">
        <div class="w-table-btn">
          <w-button @click="update('edit', row.record)" type="update" />
          <w-button
            @click="update('delete', row.record)"
            color="red"
            type="delete"
          />
        </div>
      </template>
    </w-table>
    <!-- 新增编辑框 -->
    <w-modal
      :destroyOnClose="false"
      :loading="loading"
      :title="title"
      width="1000px"
      v-model:visible="visible"
      @btnOk="btnOk"
    >
      <w-form v-model:value="formParam" :columns="formColumns" ref="form">
        <template #avatarFormItem>
          <uploadImgVue
            ref="uploadImgRef"
            :total="1"
            accept="image/*"
            :fileList="fileList"
            @change="
              state =>
                (formParam.avatar = state.fileListData
                  .map(x => x.url)
                  .join(','))
            "
          />
        </template>
      </w-form>
    </w-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { usePageData } from "./index";
import { userInterface } from "@/apis/system/user";
import { message, Modal } from "ant-design-vue";
import formVue from "@/components/global/form/index.vue";
import tableVue from "@/components/global/table/index.vue";
import uploadImgVue from "@/components/upload/uploadImg.vue";

const {
  tableColumns,
  formColumns,
  formParam,
  visible,
  title,
  loading,
  fileList,
  selecteId,
  userList,
  open,
} = usePageData();

const [form, table] = [
  ref<RefComponent<typeof formVue>>(),
  ref<RefComponent<typeof tableVue>>(),
];

const update = async (type: string = "add", row?: userInterface) => {
  if (type === "delete") {
    Modal.confirm({
      title: "是否确认删除",
      onOk: async () => {
        message.warn("演示模式,不能删除");
      },
    });
  } else {
    await open(type, row);
    form.value.reset();
  }
};

const btnOk = async () => {
  let res = await form.value.submitForm();
  if (res) submitApi();
};

const submitApi = async () => {
  loading.value = true;
  if (formParam.value.id) {
    message.warn("修改失败,演示模式不允许操作");
  } else {
    message.warn("提交失败,演示模式不允许操作");
  }
  loading.value = false;
  visible.value = false;
  table.value.refresh();
};
</script>

<style scoped></style>
