export const PATH_PROJECT = {
    QUERY_KEY: "project",
    ALL: {
        ROUTE: 'projects/initiation',
        QUERY_KEY: 'projects_all',
        Filter: (name:string = "",uuid:string = "",status:string = "",start_date:string = "",end_date:string = "") => {
            return `name=${name}&uuid=${uuid}&status=${status}&start_date=${start_date}&end_date=${end_date}`;
        }
    },
    PROJECTS: {
        ROUTE: 'projects/projects',
        QUERY_KEY: 'projects_projects',
        Filter: (name:string = "",uuid:string = "",status:string = "",start_date:string = "",end_date:string = "") => {
            return `name=${name}&uuid=${uuid}&status=${status}&start_date=${start_date}&end_date=${end_date}`;
        }
    },
    FIND: {
        ROUTE: "project",
        QUERY_KEY:"find_project"
    },
    QUANTITY: {
        ROUTE: "projects/quantity",
        QUERY_KEY:"projects_quantity"
    },
    DELETE: {
        ROUTE: "project/delete"
    },
    LOCK: {
        ROUTE: "project/lock"
    },
    PERSONNEL: {
        ROUTE: (id:any) => {
            return `project/${id}/personnel`;
        }
    },
    UPDATE_STATUS: {
        ROUTE: (id:any) => {
            return `project/${id}/update-status`;
        }
    },
    CREATE: {
        ROUTE: "project"
    }
}
