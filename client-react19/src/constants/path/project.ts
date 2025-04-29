export const PATH_PROJECT = {
  QUERY_KEY: "project",
  ALL: {
    ROUTE: "projects/initiation",
    QUERY_KEY: "projects_all",
    Filter: (
      name: string = "",
      uuid: string = "",
      status: string = "",
      start_date: string = "",
      end_date: string = ""
    ) => {
      return `name=${name}&uuid=${uuid}&status=${status}&start_date=${start_date}&end_date=${end_date}`;
    },
  },
  PROJECTS: {
    ROUTE: "projects/projects",
    QUERY_KEY: "projects_projects",
    Filter: (
      name: string = "",
      uuid: string = "",
      status: string = "",
      start_date: string = "",
      end_date: string = ""
    ) => {
      return `name=${name}&uuid=${uuid}&status=${status}&start_date=${start_date}&end_date=${end_date}`;
    },
  },
  TASKS: {
    ROUTE: (id: any) => {
      return `project/${id}/tasks`;
    },
    QUERY_KEY: "projects_tasks",
    Filter: (
      name: string = "",
      uuid: string = "",
      status: string = "",
      designated_personnel: string,
      designating_personnel: string
    ) => {
      return `name=${name}&uuid=${uuid}&status=${status}&designated_personnel=${designated_personnel}&designating_personnel=${designating_personnel}`;
    },
  },
  DOCS: {
    ROUTE: (id: any) => {
      return `project/${id}/docs`;
    },
    QUERY_KEY: "projects_docs",
    Filter: (name: string = "", uuid: string = "") => {
      return `name=${name}&uuid=${uuid}`;
    },
  },
  APPROVE: {
    ROUTE: "projects/approve",
    QUERY_KEY: "projects_approve",
    Filter: (
      name: string = "",
      uuid: string = "",
      status: string = "",
      start_date: string = "",
      end_date: string = ""
    ) => {
      return `name=${name}&uuid=${uuid}&status=${status}&start_date=${start_date}&end_date=${end_date}`;
    },
  },
  FIND: {
    ROUTE: "project",
    QUERY_KEY: "find_project",
  },
  QUANTITY: {
    ROUTE: "projects/quantity",
    QUERY_KEY: "projects_quantity",
  },
  DELETE: {
    ROUTE: "project/delete",
  },
  LOCK: {
    ROUTE: "project/lock",
  },
  PERSONNEL: {
    ROUTE: (id: any) => {
      return `project/${id}/personnel`;
    },
    Filter: (name: string, email: string, projectName: string) => {
      return `name=${name}&email=${email}&project_name=${projectName}`;
    },
  },
  UPDATE_STATUS: {
    ROUTE: (id: any) => {
      return `project/${id}/update-status`;
    },
  },
  UPDATE: {
    ROUTE: (id: any) => {
      return `project/${id}`;
    },
  },
  CREATE: {
    ROUTE: "project",
  },
  SEND_FOR_REVIEW: {
    ROUTE: (id:any) => {
      return `project/${id}/send-for-review`;
    }
  }
};
