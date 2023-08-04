<template>
  <span :class="className"></span>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TypeIt from "typeit";

type Myprops = {
  className?: string;
  speed?: number;
  values: string[];
  cursor?: boolean;
};

const props = withDefaults(defineProps<Myprops>(), {
  className: "type-it",
  speed: 200,
  cursor: true,
});

onMounted(() => {
  new TypeIt(`.${props.className}`, {
    strings: props.values,
    speed: props.speed,
    cursor: props.cursor,
  }).go();
});
</script>

<style scoped></style>
