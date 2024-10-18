<script setup lang="ts">
import Header from './components/Header.vue';
import MoreMenuList from './components/MoreMenuList.vue';
const showBackTop = ref(false);
const page = ref<Element>()
const toTop = () => {
    page.value?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}
const onScroll = () => {
    showBackTop.value = (page.value?.scrollTop ?? 0) > 200
}
</script>
<template>
    <div class="default-layout w-full flex flex-col">
        <Header class="header shadow-sm">
            <div class="mt-5">
                <div>更多功能</div>
                <MoreMenuList />
            </div>
        </Header>
        <transition name="fade" mode="out-in">
            <main class="app-main flex-1 flex">
                <div ref="page" class="flex-1 page-container px-2" @scroll="onScroll">
                    <slot></slot>
                </div>
                <div class="pt-5 px-2 more ">
                    <UCard>
                        <template #header>
                            <div class="text-sm">
                                更多功能
                            </div>
                        </template>

                        <MoreMenuList />

                        <!-- <template #footer>
                        <Placeholder class="h-8" />
                    </template> -->
                    </UCard>
                </div>
            </main>
        </transition>
        <UButton class="fixed up-btn" :class="showBackTop ? 'show' : ''" @click="toTop"
            icon="material-symbols:expand-circle-up-outline" size="sm" color="primary" square variant="solid" />

    </div>
</template>
<style lang="less" scoped>
@media only screen and (max-width: 600px) {
    .default-layout {
        .more {
            display: none;
        }

        // background-color: red;
    }
}

.default-layout {
    height: 100vh;

    .header {
        position: fixed;
        top: 0;
        background-color: #fff;
    }

    .app-main {
        padding-top: 48px;
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        overflow-y: hidden;

        .page-container {
            overflow-y: auto;
        }
    }

    .up-btn.show {
        bottom: 10vh;
    }

    .up-btn {
        right: 10vw;
        bottom: -100px;
        transition: bottom .5s;
    }
}
</style>