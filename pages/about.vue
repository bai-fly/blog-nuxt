<script lang="ts" setup>
const {
    public: {
        apiPrefix
    }
} = useRuntimeConfig();
console.log('接口', apiPrefix)
</script>
<template>
    <div>关于</div>
</template>