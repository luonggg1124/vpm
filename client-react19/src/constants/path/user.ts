export const PATH_USER = {
    ALL: {
        ROUTE: 'user',
        QUERY_KEY: 'projects_all',
        Filter: (target:number[]) => {
            return `target=${target.join(',')}`
        }
    }
}
