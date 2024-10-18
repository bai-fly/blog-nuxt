<script lang="ts" setup>
import { getArticlePageAsync } from '~/api/articleSerevice';
import ArticleList from '~/components/ArticleList.vue';
import type { Article } from '~/types/entities';
const websiteStore = useWebsiteStore();
websiteStore.title = '首页'
useSeoMeta({
    title: websiteStore.title,
    keywords: '博客',
    description: '一个个人博客'
})

const route = useRoute()
const pageIndex = ref(1)
const loading = ref(true)
if (route.query.pageIndex) {
    pageIndex.value = Number(route.query.pageIndex)
}
const list = ref<Article[]>([])
const pageSize = 15;
const totalCount = ref(0)

const loadData = async () => {
    loading.value = true;
    const res = await getArticlePageAsync({ pageIndex: pageIndex.value, pageSize });
    list.value = res.items;
    totalCount.value = res.totalCount;
    loading.value = false
}
await loadData();
watch(() => route.query.pageIndex, async (newVal) => {
    if (newVal) {
        pageIndex.value = Number(newVal);
    } else {
        pageIndex.value = 1;
    }
    await loadData();
})
// const {
//     public: {
//         googleAdsense
//     }
// } = useRuntimeConfig();
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
                <ArticleList :list="list" />
            </template>
        </UCard>
        <div class="flex justify-center py-4">
            <UPagination v-model="pageIndex" :page-count="pageSize" :total="totalCount" show-last show-first
                :to="(n) => `/?pageIndex=${n}`" />
        </div>
    </div>
</template>