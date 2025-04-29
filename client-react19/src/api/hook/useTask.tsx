import { useState } from "react";
import { apiManager } from "..";
import { PATH_TASK } from "@/constants/path/task";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { TaskStatus } from "../interfaces/ITask";
import { useNavigate } from "react-router-dom";
import { PATH_PROJECT } from "@/constants/path/project";

type Loadings = {
  delete: boolean;
  createTask: boolean;
  updateTask: boolean;
};
const useTask = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Loadings>({
    delete: false,
    createTask: false,
    updateTask: false,
  });
  const createTask = async (data: {
    name: string;
    description: string;
    uuid: string;
    project_id: number;
    status: TaskStatus;
    feature: string;
    designated_personnel_id: number;
    designating_personnel_id: number;
    status_changed_at?: string | null;
    ended_at?: string | null;
  }) => {
    try {
      setLoading({
        ...loading,
        createTask: true,
      });
      await apiManager("post", PATH_TASK.CREATE.ROUTE(data.project_id), data);
      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PATH_TASK.QUERY_KEY] });
      navigate("/projects/" + data.project_id);
    } catch (error: any) {
      if (error?.status === 400) {
        return error?.response?.data;
      }
      toast(error?.response?.data?.error);
    } finally {
      setLoading({
        ...loading,
        createTask: false,
      });
    }
  };
  const updateTask = async (
    id: any,
    data: {
      name: string;
      description: string;
      uuid: string;
      project_id: number;
      status: TaskStatus;
      feature: string;
      designated_personnel_id: number;
      designating_personnel_id: number;
      status_changed_at?: string | null;
      ended_at?: string | null;
    }
  ) => {
    try {
      setLoading({
        ...loading,
        updateTask: true,
      });
      await apiManager("put", PATH_TASK.FIND.ROUTE(id), data);
      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PATH_TASK.QUERY_KEY] });
      navigate("/projects/" + data.project_id + "?item=tasks");
    } catch (error: any) {
      if (error?.status === 400) {
        return error?.response?.data;
      }
      toast(error?.response?.data?.error);
    } finally {
      setLoading({
        ...loading,
        updateTask: false,
      });
    }
  };
  const deleteTask = async (id: any) => {
    try {
      setLoading({
        ...loading,
        delete: true,
      });
      await apiManager("delete", PATH_TASK.DELETE.ROUTE(id));
      queryClient.invalidateQueries({ queryKey: [PATH_TASK.QUERY_KEY] });
    } catch (error: any) {
      if (error?.status === 400) {
        return error?.response?.data;
      }
      toast(error?.response?.data?.error);
    } finally {
      setLoading({
        ...loading,
        delete: false,
      });
    }
  };

  return {
    deleteTask,
    loading,
    createTask,
    updateTask,
  };
};

export default useTask;
