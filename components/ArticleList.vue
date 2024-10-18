<script setup lang="ts">
import { defineProps } from 'vue'
import type { Article } from '~/types/entities';
const props = defineProps<{
    list: Article[]
}>()
</script>
<template>
    <div v-for="item in list" :key="item.id">
        <div class="py-2 hover:bg-gray-100">
            <ULink active-class="text-primary"
                inactive-class="dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                :to="'/detail/' + item.id">{{ item.title }}</ULink>
            <div class="text-gray-500 text-sm">
                发布时间: {{ item.createTime }}
            </div>
        </div>
        <UDivider />
    </div>
</template>