<template>
    <div :class="type" class="box-content relative pt-1">
        <div class="mx-10 my-4">
            <span class="text-[#05E8FE] text-2xl font-bold">{{ title }}</span>
            <div class="line w-[50px] h-[10px] my-2"></div>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    title: string
    type?: string
}>(), ({
    type: 'boxMax'
}))
</script>

<style scoped>
.box {
    background: url("../images/box-min.png") no-repeat;
    background-size: 100% 100%;
}

.boxMax {
    background: url("../images/box-max.png") no-repeat;
    background-size: 100% 100%;
}

.boxOblong {
    background: url("../images/box-oblong.png") no-repeat;
    background-size: 100% 100%;
}

.line {
    background: url("../images/line.png") no-repeat;
    background-size: 100% 100%;
}

.box::after,
.boxMax::after,
.boxOblong::after {
    position: absolute;
    top: 4.5%;
    left: 6%;
    content: '';
    width: 0%;
    height: 2px;
    background-color: #56D0E3;
    animation: line 5s ease-in-out infinite both;
}

.box::after {
    top: 4.5%;
    left: 6%;
}

.boxMax::after {
    top: 1.8%;
    left: 6%;
}

.boxOblong::after {
    top: 4.5%;
    left: 5%;
}

@keyframes line {
    0% {
        width: 0%;
    }

    90% {
        width: 85%;
        opacity: 1;
    }

    100% {
        width: 94%;
        opacity: 0;
        background-color: #00fefa;
    }
}
</style>