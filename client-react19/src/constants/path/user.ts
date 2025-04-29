export const PATH_USER = {
    QUERY_KEY: "users",
    ALL: {
        ROUTE: 'user',
        QUERY_KEY: 'projects_all',
        Filter: (target:number[]) => {
            return `target=${target.join(',')}`
        }
    },
    PERSONNEL: {
        ROUTE: "user/personnel",
        Filter: (name:string,email:string,projectName:string) => {
            return `name=${name}&email=${email}&project_name=${projectName}`
        }
    }

}
