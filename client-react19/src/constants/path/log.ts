export const PATH_LOG = {
  QUERY_KEY: "logs",
  ALL: {
    ROUTE: "log",
    Filter: (userName = "", time = "") => {
      return `user_name=${userName}&time=${time}`;
    },
  },
};
