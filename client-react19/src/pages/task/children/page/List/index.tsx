import Filter from "./components/Filter";
import TaskTable from "./components/TaskTable";
import BreadCrumb from "./components/ui/bread-crumb";

const ListTask = () => {
    return <div className="m-4 flex flex-col gap-4">
         <BreadCrumb/>
         <h2 className="font-medium text-xl">Nhiệm vụ</h2>
        <Filter/>
        <TaskTable/>
    </div>
}
export default ListTask;