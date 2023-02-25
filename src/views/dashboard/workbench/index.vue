<template>
    <div>
        <topInfoVue/>
        <div class="flex flex-wrap justify-between mt-4">
            <div class="w-full md:w-[70%]">
                <leftContent class="bg-white dark:bg-[#1F1F1F]"/>
                <leftMessage class="mt-4 bg-white dark:bg-[#1F1F1F]"/>
            </div>
            <div class="w-full md:w-[29%] mt-2 md:mt-0">
                <navItem class="bg-white dark:bg-[#1F1F1F]"/>
                <a-card title="GitHub信息" bordered class="!mt-3">
                    
                </a-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { topInfoVue } from './index';
import { leftContent } from './index';
import { leftMessage } from './index';
import { navItem } from './index';
</script>

<style scoped>

</style>