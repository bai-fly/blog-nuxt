import type { HttpResponse, KeyValueData } from "~/types/global"

export async function getTodayDataAsync(type: number = 1) {
    const { data } = await useFetchGet(`/api/time-line-data/today-data/${type}`)
    const res = data.value as HttpResponse<KeyValueData<string, number>[]>
    return res.data;
}

export async function getMonthDataAsync(type: number = 1) {
    const { data } = await useFetchGet(`/api/time-line-data/month-data/${type}`)
    const res = data.value as HttpResponse<KeyValueData<string, number>[]>
    return res.data;
}