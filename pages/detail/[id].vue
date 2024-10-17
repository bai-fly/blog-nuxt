<script lang="ts" setup>
import { getArticleAsync } from '~/api/articleSerevice';
const websiteStore = useWebsiteStore();
const route = useRoute()
const detail = await getArticleAsync(route.params.id as string)
websiteStore.title = detail.title;
useSeoMeta({
  title: detail.title
})
const router = useRouter();
</script>
<template>
  <div class="detail pt-2">
    <UButton icon="material-symbols:arrow-back" size="sm" color="primary" variant="solid" label="返回" :trailing="false"
      @click="router.back()" />
    <UCard class="mt-2">
      <div class="markdown">
        <MDC :value="detail?.content" />
      </div>
    </UCard>
  </div>
</template>
<style lang="less" scoped>
.detail ::v-deep(.markdown) {
  pre {
    background-color: #282c34;
    border-radius: 6px;
    padding: 1.25rem 1.5rem;
    margin: .85rem 0;
    width: 100%;
    overflow-y: auto;

    code {
      color: #fff;
      width: 100%;
    }
  }
}
</style>