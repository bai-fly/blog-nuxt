<script lang="ts" setup>
import { getArticlePageAsync, getCategoryChildrenAsync } from '~/api/articleSerevice';
import { type ArticleCategory, type Article } from '~/types/entities';
import ArticleList from '~/components/ArticleList.vue';
const route = useRoute()
// console.log('index111路由参数', route.params.id)
const pageIndex = ref(1)
const c = ref<string>('')
const loading = ref(true)
if (route.query.c) {
    c.value = route.query.c as string;
}

if (route.query.pageIndex) {
    pageIndex.value = Number(route.query.pageIndex)
}
const categorys = ref<ArticleCategory[]>([]);
const list = ref<Article[]>([])
const pageSize = 15;
const totalCount = ref(0)
const loadCategoryChildren = async () => {
    categorys.value = await getCategoryChildrenAsync(route.params.id as string)
}
await loadCategoryChildren();
// if (c.value && categorys.value.length > 0) {
//     const cObj = categorys.value?.find(x => x.id === c.value)
//     if (cObj) {
//         useSeoMeta({
//             title: cObj.name,
//             keywords: cObj.name,
//             description: cObj.name
//         })
//     }
// }
const loadData = async () => {
    loading.value = true;
    const categoryIds: string[] = [];
    if (c.value) {
        categoryIds.push(c.value)
    } else {
        categoryIds.push(route.params.id as string)
        categoryIds.push(...categorys.value?.map(x => x.id) ?? [])
    }
    const res = await getArticlePageAsync({ pageIndex: pageIndex.value, pageSize, categoryIds });
    list.value = res.items;
    totalCount.value = res.totalCount;
    loading.value = false;
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
watch(() => route.query.c, async (newVal) => {
    if (newVal) {
        c.value = newVal as string;
    } else {
        c.value = ''
    }
    await loadData();
})
</script>
<template>
    <div>
        <div class="py-2">
            <ULink :to="`/categroy/${route.params.id}`" type="button" class="rounded-lg px-2"
                active-class="bg-primary text-white" :exactQuery="true"
                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border">
                全部
            </ULink>
            <ULink class="ml-2 rounded-lg px-2" v-for="item in categorys" :key="item.id"
                :to="`/categroy/${route.params.id}?c=${item.id}`" type="button" active-class="bg-primary text-white"
                :exactQuery="true"
                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border">
                {{ item.name }}
            </ULink>
        </div>
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
            <!-- {{ categorys }} -->

        </UCard>
        <div class="flex justify-center py-4">
            <UPagination v-model="pageIndex" :page-count="pageSize" :total="totalCount" show-last show-first
                :to="(n) => `/categroy/${route.params.id}?pageIndex=${n}`" />
        </div>
    </div>
</template>