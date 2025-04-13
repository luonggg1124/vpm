import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <section className="container p-0 m-auto">
      <Outlet />
    </section>
  );
};

export default AppLayout;
