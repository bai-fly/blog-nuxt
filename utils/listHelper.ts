interface TreeHelperConfig {
    id: string;
    children: string;
    parentId: string;
}
const DEFAULT_CONFIG: TreeHelperConfig = {
    id: 'id',
    children: 'children',
    parentId: 'parentId',
};
const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export function listToTree<T>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] {
    const conf = getConfig(config) as TreeHelperConfig;
    const nodeMap = new Map();
    const result: T[] = [];
    const { id, children, parentId } = conf;

    for (const node of list) {
        node[children] = node[children] || [];
        nodeMap.set(node[id], node);
    }
    for (const node of list) {
        const parent = nodeMap.get(node[parentId]);
        (parent ? parent.children : result).push(node);
    }
    return result;
}
export function listToDictionary<K extends string | number, T = Record<string, any>>(list: T[], key: string) {
    return list.reduce((pre, cur) => {
        const c = cur as Record<string, any>
        pre[c[key] as K] = cur;
        return pre;
    }, {} as Record<K, T>)
}
