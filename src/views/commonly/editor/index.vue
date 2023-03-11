<template>
    <div>
        <a-card title="富文本编辑器,采用开源的Wangeditor" :bordered="false">
            <div class="flex items-center justify-center py-3">
                <span class="mr-4 text-2xl font-bold">编辑器组件</span>
                <a-button type="primary" @click="dialogVisible = true">内容预览</a-button>
            </div>
            <w-wang-editor height="400px" v-model:value="content" />
        </a-card>
        <w-modal
            title="富文本内容预览"
            width="1000px"
            @check-validate="checkValidate"
            v-model:visible="dialogVisible"
        >
            <div class="view" v-html="content"></div>
        </w-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const content = ref("");
const checkValidate = ()=>{
    console.log('取消焦点')
}
const dialogVisible = ref(false);
</script>

<style scoped lang="scss">
</style>
