import React from "react";
import { Outlet } from "react-router-dom";

const Task:React.FC = () => {
    return <div>
        <Outlet/>
    </div>
}

export default Task;