import type { Article, ArticleCategory } from "~/types/entities"
import type { HttpResponse, Nullable, PageResult } from "~/types/global"
import qs from 'qs'

export async function getCategoryAsync() {
    const { data } = await useFetchGet('/api/article/category')
    const res = data.value as HttpResponse<ArticleCategory[]>
    return res.data;
}
export async function getCategoryChildrenAsync(categoryId: string) {
    const { data } = await useFetchGet('/api/article/category-children/' + categoryId)
    const res = data.value as HttpResponse<ArticleCategory[]>
    return res.data;
}
export async function getArticleAsync(id: string) {
    const { data } = await useFetchGet('/api/article/' + id)
    const res = data.value as HttpResponse<Article>
    return res.data;
}
export async function getArticlePageAsync(param: {
    pageIndex: number,
    pageSize: number,
    categoryIds?: string[],
    key?: string,
}) {
    const { data } = await useFetchGet(`/api/article/article-page?${qs.stringify(param, { allowDots: true })}`)
    const res = data.value as HttpResponse<PageResult<Article>>
    return res.data;
}