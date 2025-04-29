import React from "react";
import { Outlet } from "react-router-dom";

const Project: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Project;
