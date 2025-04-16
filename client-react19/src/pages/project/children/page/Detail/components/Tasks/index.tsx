import Filter from "./components/Filter";
import TaskTable from "./components/TaskTable";

const Tasks = () => {
    return <div className="m-4 flex flex-col gap-4">
        <Filter/>
        <TaskTable/>
    </div>
}
export default Tasks;