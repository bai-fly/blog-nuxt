<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { getCategoryAsync } from '~/api/articleSerevice';
const websiteStore = useWebsiteStore();
const categorys = await getCategoryAsync();
const links = categorys.map(x => {
    return {
        label: x.name,
        to: '/categroy/' + x.id
    }
})
links.splice(0, 0, {
    label: '首页',
    to: '/'
})
const router = useRouter();
const setTitle = (route: RouteLocationNormalizedLoaded) => {
    const cur = links.find(x => x.to === route.path)
    if (cur) {
        websiteStore.title = cur.label;
        useSeoMeta({
            title: cur.label,
            keywords: cur.label,
            description: cur.label
        })
    }
}
setTitle(router.currentRoute.value);
const isOpen = ref(false)
watch(() => router.currentRoute.value, (newValue, oldValue) => {
    isOpen.value = false;
    setTitle(newValue);
    // const cur = links.find(x => x.to === newValue.path)
    // if (cur) {
    //     websiteStore.title = cur.label;
    // }
})
</script>
<template>
    <div class="header-com w-full">
        <UHorizontalNavigation :links="links" class="justify-center pc-navigation">
            <template #default="{ link }">
                <span class="group-hover:text-primary relative">{{ link.label }}</span>
            </template>
        </UHorizontalNavigation>
        <div class="mobile-navigation flex items-center justify-center">
            <div class="title">{{ websiteStore.title }}</div>
            <UButton icon="material-symbols:list" color="gray" class="menu" @click="isOpen = true" />
        </div>
        <USlideover v-model="isOpen">
            <div style="height: 48px;" class=" flex items-center justify-end shadow">
                <UButton icon="material-symbols:close-rounded" color="gray" class="mr-2" @click="isOpen = false" />
            </div>
            <UCard class="mt-2">
                <div>
                    <template v-for="(item, i) in links" :key="i">
                        <UDivider v-if="i > 0" />
                        <div class="py-2">
                            <ULink :to="item.to" active-class="text-primary"
                                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                {{ item.label }}
                            </ULink>
                        </div>
                    </template>
                </div>
                <slot></slot>
            </UCard>
        </USlideover>
    </div>

</template>
<style lang="less" scoped>
.header-com {
    .mobile-navigation {
        display: none;
    }
}


@media only screen and (max-width: 600px) {
    .pc-navigation {
        display: none;
    }

    .header-com {
        .mobile-navigation {
            display: flex;
            height: 48px;
            position: relative;

            &>.menu {
                position: absolute;
                right: 10px;
            }
        }
    }
}
</style>