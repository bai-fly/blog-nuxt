<script lang="ts" setup>
import { getArticlePageAsync } from '~/api/articleSerevice';
import type { Article } from '~/types/entities';

const route = useRoute()
console.log(route.params.key)
const pageIndex = ref(1)
const loading = ref(true)
const list = ref<Article[]>([])
const pageSize = 15;
const totalCount = ref(0)
const loadData = async () => {
    loading.value = true;
    const res = await getArticlePageAsync({ pageIndex: pageIndex.value, pageSize, key: route.params.key as string });
    list.value = res.items;
    totalCount.value = res.totalCount;
    loading.value = false
}
await loadData();
</script>
<template>
    <div class="py-2">
        <UCard>
            <template v-if="loading">
                <div class="py-2" v-for="i in 10" :key="i">
                    <USkeleton class="h-4 w-[250px]" />
                    <USkeleton class="h-4 w-[200px] mt-1" />
                </div>
            </template>
            <template v-else>
                <div class="text-gray-500 text-center" v-if="list.length === 0">未查询到数据</div>
                <ArticleList v-else :list="list" />
            </template>
        </UCard>
        <div class="flex justify-center py-4">
            <UPagination v-model="pageIndex" :page-count="pageSize" :total="totalCount" show-last show-first
                :to="(n) => `/?pageIndex=${n}`" />
        </div>
    </div>
</template>