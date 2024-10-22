<template>
    <div ref="chartRef" :style="style"></div>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, withDefaults } from 'vue';
import * as echarts from "echarts";
import { defineProps, watch } from 'vue'
import type { Nullable } from '~/types/global';
const props = withDefaults(defineProps<{
    options: echarts.EChartsOption,
    width?: string,
    height?: string
}>(), {
    width: '100%',
    height: '300px'
})
let chart: Nullable<echarts.ECharts>;
const style = computed(() => {
    return {
        height: '300px', width: '100%', overflow: 'hidden'
    }
})
const chartRef = ref<HTMLDivElement | null>(null);
watch(() => props.options, (newVal) => {
    if (newVal) {
        initChart();
    }
})
const resize = () => {
    if (chart) {
        chart.resize();
    }
}
const initChart = () => {
    if (!chart) {
        console.log('初始化图表')
        chart = echarts.init(chartRef.value);
    }
    if (chart) {
        if (props.options) {
            chart.setOption(props.options)
        }
    }


}
onMounted(() => {
    if (props.options) {
        initChart();
    }
    window.addEventListener('resize', resize)
});
onUnmounted(() => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    window.removeEventListener('resize', resize)
});
</script>