<script setup lang="ts">
const websiteStore = useWebsiteStore();
const moreLinks = [
    {
        label: 'Unicode/中文互转',
        path: '/more/unicode',
    },
    {
        label: 'MD5加密',
        path: '/more/md5',
    },
    {
        label: 'GUID/UUID生成',
        path: '/more/guid',
    },
    {
        label: 'Base64加密/解密',
        path: '/more/base64',
    },
    {
        label: '二维码生成',
        path: '/more/qrcode',
    },
    {
        label: '黄金价格',
        path: '/more/time-line-data/1',
    },
]
const router = useRouter();
watch(() => router.currentRoute.value, (newValue) => {
    const cur = moreLinks.find(x => x.path === newValue.path)
    if (cur) {
        websiteStore.title = cur.label;
    }
})
</script>
<template>
    <div>
        <template v-for="(item, i) in moreLinks" :key="i">
            <UDivider v-if="i > 0" />
            <div class="py-2">
                <ULink :to="item.path" active-class="text-primary"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    {{ item.label }}
                </ULink>
            </div>
        </template>
        <div class="flex items-center text-sm text-gray-500 mt-3">
            <UIcon name="material-symbols:attach-email" />
            flytsuki@gmail.com

        </div>
    </div>
</template>