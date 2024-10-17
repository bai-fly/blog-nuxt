<script setup lang="ts">
import { ref } from 'vue'
useSeoMeta({
    title: 'Unicode转码',
    keywords: 'Unicode,中文,Unicode转中文,中文转Unicode,Unicode编码,在线工具,编码转换工具,在线Unicode/中文转换工具',
    description: '一个在线Unicode与中文互转的工具，实现Unicode转中文或者中文转Unicode。'
})
const originalStr = ref('');
const newStr = ref('');
const isChinese = (s: string) => {
    return /[\u4e00-\u9fa5]/.test(s);
}
const ch2Unicdoe = () => {
    newStr.value = originalStr.value.split('').map(x => isChinese(x) ? ('\\u' + x.charCodeAt(0).toString(16)) : x).join('');
}
const unicode2Ch = () => {
    const str = originalStr.value;
    const result: string[] = [];
    const arr = str.split('');
    let len = 1;
    for (var i = 0; i < arr.length; i += len) {
        len = 1;
        if (arr[i] === '\\' && i + 6 <= arr.length && arr[i + 1] === 'u') {
            const n = parseInt(str.substr(i + 2, 4), 16).toString(10);
            result.push(String.fromCharCode(Number(n)));
            len = 6;
        } else {
            result.push(arr[i])
        }
    }
    newStr.value = result.join('');
}
</script>
<template>
    <div class="pt-5">
        <UTextarea autoresize :maxrows="20" :rows="10" placeholder="内容" v-model="originalStr" />
        <div class="py-3 text-center">
            <UButton label="中文转unicode" @click="ch2Unicdoe" />
            <UButton class="ml-5" label="unicode转中文转" @click="unicode2Ch" />
        </div>
        <UTextarea autoresize :maxrows="20" :rows="10" placeholder="结果" v-model="newStr" />
    </div>
</template>