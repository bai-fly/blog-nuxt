<script setup lang="ts">
useSeoMeta({
    title: '在线生成GUID/UUID',
    keywords: 'UUID,GUID,生成GUID,生成UUID',
    description: '在线生成GUID/UUID。'
})
const list = ref<string[]>();
const create = () => {
    const res: string[] = []
    for (let index = 0; index < 10; index++) {
        res.push(window.crypto.randomUUID())
    }
    list.value = res;
}
create();
</script>
<template>
    <div class="pt-5">
        <UButton class="mb-2" label="生成" @click="create" />
        <UCard>
            <template v-for="(item, i) in list" :key="item">
                <UDivider v-if="i > 0" />
                <div class="py-2">
                    <div>{{ item.toUpperCase() }}</div>
                    <div class="text-gray-500">{{ item }}</div>
                </div>
            </template>

        </UCard>
    </div>
</template>