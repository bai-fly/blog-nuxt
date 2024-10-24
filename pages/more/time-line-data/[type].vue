<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { getMonthDataAsync, getTodayDataAsync } from '~/api/timeLineDataSerevice';

const route = useRoute()
const type: number = route.params.type ? Number(route.params.type) : 1;
const res = await Promise.all([getTodayDataAsync(type), getMonthDataAsync(type)]);
console.log(res)
const timeLabels: string[] = [];
const timeValues: number[] = [];
const monthLabels: string[] = [];
const monthValues: number[] = [];
res[0].forEach(x => {
    timeLabels.push(x.key.substring(11, 19))
    timeValues.push(x.value);
})
res[1].forEach(x => {
    monthLabels.push(x.key.substring(0, 10))
    monthValues.push(x.value);
})
const map: Record<number, string> = { 1: '当日金价', 2: '当日银价' }
const timeOptions: EChartsOption = {
    title: {
        text: map[type] ?? ''
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: timeLabels,//label
    },
    yAxis: {
        type: 'value',
        scale: true
    },
    series: [
        {
            data: timeValues,//value
            type: 'line'
        }
    ]
}
const monthOptions: EChartsOption = {
    title: {
        text: '近30日走势'
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: monthLabels,
    },
    yAxis: {
        type: 'value',
        scale: true
    },
    series: [
        {
            data: monthValues,
            type: 'line'
        }
    ]
}
</script>
<template>

    <div class="flex items-center justify-center h-full">
        <div class="flex-1">
            <EChart :options="timeOptions" />
            <EChart :options="monthOptions" />
        </div>
    </div>
</template>