export const PATH_TASK = {
    QUERY_KEY : "tasks",
    DELETE: {
        ROUTE: (id:any) => {
            return `task/${id}`
        }
    },
    ALL: {
        ROUTE: "task",
        Filter: (title: string,uuid:string,status:string) => {
            return `name=${title}&uuid=${uuid}&status=${status}`;
        }
    }
}