<template>
    <div>
        <a-button @click="cancel" v-if="showCancelBtn">{{ cancelText }}</a-button>
        <a-button @click="confirm" :type="okType" v-if="showOkBtn">{{ okText }}</a-button>
    </div>
</template>

<script setup lang="ts">
import { basicProps } from '../index'
const props = defineProps(basicProps)
const emit = defineEmits(['cancel','confirm'])
const cancel = (e: Event)=>{
    emit('cancel', e);
}
const confirm = (e: Event)=>{
    emit('confirm', e);
}
</script>

<style scoped>

</style>