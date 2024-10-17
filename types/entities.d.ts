export interface ArticleCategory {
    id: string;
    image?: string;
    name: string;
    sort: number;
    parentId: string;
    status: number;
    children: Array<ArticleCategory>;
}
export interface Article {
    authorName?: string;
    authorUid?: number;
    categoryId: string;
    content: string;
    cover: string;
    createTime?: string;
    id?: string;
    isDel: boolean;
    sort: number;
    previewCount: number;
    title: string;
}