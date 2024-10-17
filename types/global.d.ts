export declare type Nullable<T> = T | null | undefined;

export interface HttpResponse<T> {
    data: T;
    errors: Array<string> | string | null;
    extras: Array<string> | string | null;
    statusCode: number;
    succeeded: boolean;
    timestamp: number;
}
export interface PageResult<T> {
    pageIndex: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
    hasNextPages: boolean,
    hasPrevPages: boolean,
    items: T[],
}