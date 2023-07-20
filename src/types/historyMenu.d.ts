interface menuItem {
    title: string,
    path: string,
    parentPath?: string,
    params?: any,
    meta?: {
        title: string
    }
}