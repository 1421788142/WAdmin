<template>
    <div class="h-[100%]">
        <CloseOutlined @click="handleCancel" />
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['cancel'])
const handleCancel = (e: Event)=>{
    emit('cancel',e)
}
</script>

<style lang="scss">
.ant-modal-close-x{
    height: 45px !important;
    line-height: 45px !important;
}
</style>