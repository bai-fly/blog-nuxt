<script setup lang="ts">
import { ref } from 'vue'
import CryptoJS from "crypto-js";
useSeoMeta({
    title: 'MD5加密',
    keywords: 'MD5,加密,MD5加密',
    description: '一个在线MD5加密工具。'
})
const originalStr = ref('');
const newStr = ref('');
const md5 = () => {
    newStr.value = CryptoJS.MD5(originalStr.value).toString();
}
</script>
<template>
    <div class="pt-5">
        <UTextarea autoresize :maxrows="20" :rows="10" placeholder="内容" v-model="originalStr" />
        <div class="py-3 text-center">
            <UButton label="加密" @click="md5" />
        </div>
        <UTextarea autoresize :maxrows="20" :rows="10" placeholder="结果" v-model="newStr" />
    </div>
</template>