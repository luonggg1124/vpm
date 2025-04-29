export const PATH_TASK = {
  QUERY_KEY: "tasks",
  DELETE: {
    ROUTE: (id: any) => {
      return `task/${id}`;
    },
  },
  ALL: {
    ROUTE: "task",
    Filter: (
      title: string,
      uuid: string,
      status: string,
      designated_personnel: string,
      designating_personnel: string
    ) => {
      return `name=${title}&uuid=${uuid}&status=${status}&designated_personnel=${designated_personnel}&designating_personnel=${designating_personnel}`;
    },
  },
  CREATE: {
    ROUTE: (id: any) => {
      return `project/${id}/tasks`;
    },
  },
  FIND: {
    ROUTE: (id:any) => {
      return `task/${id}`
    } 
  }
};
