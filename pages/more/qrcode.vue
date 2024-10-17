<script setup lang="ts">
import { ref } from "vue";
import QRCode from "qrcode";
useSeoMeta({
    title: '二维码生成器',
    keywords: '二维码生成器,二维码,在线二维码生成器',
    description: '在线二维码生成工具'
})
const qrCodeContent = ref("");
const canvasRef = ref(null);
const createClick = () => {
    if (qrCodeContent.value) {
        console.log(canvasRef.value);
        QRCode.toCanvas(
            canvasRef.value,
            qrCodeContent.value,
            {
                width: 200,
                errorCorrectionLevel: "H",
                margin: 1,
            },
            (error) => {
                if (error) console.error(error);
            }
        );
    }
};
</script>
<template>
    <div class="pt-5">
        <UTextarea autoresize :maxrows="20" :rows="10" placeholder="内容" v-model="qrCodeContent" />
        <div class="py-3 text-center">
            <UButton label="生成" @click="createClick" />
        </div>
        <canvas width="200px" height="200px" ref="canvasRef"></canvas>
    </div>
</template>