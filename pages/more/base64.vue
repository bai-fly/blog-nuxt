<script setup lang="ts">
import { ref } from 'vue'
import CryptoJS from "crypto-js";
useSeoMeta({
    title: 'Base64加密/解密',
    keywords: 'Base64加密/解密,在线工具,编码转换工具,在线Base64转换工具',
    description: '一个在线Base64加密/解密工具。'
})
const originalStr = ref('');
const newStr = ref('');
const encode = () => {
    const words = CryptoJS.enc.Utf8.parse(originalStr.value);
    newStr.value = CryptoJS.enc.Base64.stringify(words);
}
const decode = () => {
    const words = CryptoJS.enc.Base64.parse(originalStr.value);
    newStr.value = CryptoJS.enc.Utf8.stringify(words);
}
</script>
<template>
    <div class="pt-5">
        <UTextarea autoresize :maxrows="20" :rows="10" placeholder="内容" v-model="originalStr" />
        <div class="py-3 text-center">
            <UButton label="base64加密" @click="encode" />
            <UButton class="ml-5" label="base64解密" @click="decode" />
        </div>
        <UTextarea autoresize :maxrows="20" :rows="10" placeholder="结果" v-model="newStr" />
    </div>
</template>