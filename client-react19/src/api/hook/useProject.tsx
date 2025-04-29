import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiManager } from "..";

import { PATH_PROJECT } from "@/constants/path/project";
import { toast } from "sonner";
import {
  IProject,
  ProjectLogMeta,
  ProjectStatus,
} from "../interfaces/IProject";
import { useQueryClient } from "@tanstack/react-query";
import { IUser } from "../interfaces/IUser";
import { PATH_TASK } from "@/constants/path/task";

type Loadings = {
  getProject: boolean;
  deleteProject: boolean;
  lockProject: boolean;
  getOneProject: boolean;
  updateStatus: boolean;
  createProject: boolean;
  updateProject: boolean;
  sendForReview:boolean;
};

const useProject = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<Loadings>({
    getProject: false,
    deleteProject: false,
    lockProject: false,
    getOneProject: false,
    updateStatus: false,
    createProject: false,
    updateProject: false,
    sendForReview:false
  });
  const [projects, setProject] = useState([]);
  const navigate = useNavigate();
  const getProject = async () => {
    try {
      setLoading({
        ...loading,
        getProject: true,
      });
      const { data } = await apiManager("get", PATH_PROJECT.ALL.ROUTE);
      setProject(data.data);
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading({
        ...loading,
        getProject: false,
      });
    }
  };
  const getOneProject = async (id: number) => {
    try {
      setLoading({
        ...loading,
        getOneProject: true,
      });
      const { data } = await apiManager(
        "get",
        PATH_PROJECT.FIND.ROUTE + `/${id}`
      );
      setProject(data.data);
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading({
        ...loading,
        getOneProject: false,
      });
    }
  };
  const lockProject = async (id: number) => {
    try {
      setLoading({
        ...loading,
        lockProject: true,
      });
      await apiManager("post", PATH_PROJECT.LOCK.ROUTE + "/" + id);
      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
    } catch (error: any) {
      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Ẩn",
          onClick: () => console.log(error?.data?.error),
        },
      });
    } finally {
      setLoading({
        ...loading,
        lockProject: false,
      });
    }
  };
  const sendForReview = async (id: any) => {
    try {
      setLoading({
        ...loading,
        sendForReview: true,
      });
      await apiManager("put", PATH_PROJECT.SEND_FOR_REVIEW.ROUTE(id));
      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
    } catch (error: any) {
      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Ẩn",
          onClick: () => console.log(error?.data?.error),
        },
      });
    } finally {
      setLoading({
        ...loading,
        sendForReview: false,
      });
    }
  };

  const deleteProjects = async (projects: Array<IProject>) => {
    try {
      setLoading({
        ...loading,
        deleteProject: true,
      });
      await apiManager("post", PATH_PROJECT.DELETE.ROUTE, {
        projects: [...projects.map((record) => record.id)],
      });

      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
    } catch (error: any) {
      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Ẩn",
          onClick: () => console.log(error?.data?.error),
        },
      });
    } finally {
      setLoading({
        ...loading,
        deleteProject: false,
      });
    }
  };
  const createProject = async (data: {
    uuid: string;
    name: string;
    started_at: string;
    ended_at: string;
    status: ProjectStatus;
    pm?: string[];
    pa?: IUser;
    description: string;
    priority: string;
    personnel: string[];
  }) => {
    try {
      setLoading({
        ...loading,
        createProject: true,
      });
      await apiManager("post", PATH_PROJECT.CREATE.ROUTE, data);
      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PATH_TASK.QUERY_KEY] });
      navigate("/projects");
    } catch (error: any) {
      if (error?.status === 400) {
        return error?.response?.data;
      }
      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Ẩn",
          onClick: () => console.log(error?.data?.error),
        },
      });
      console.log(error);
    } finally {
      setLoading({
        ...loading,
        createProject: false,
      });
    }
  };
  const updateProject = async (
    id: any,
    data: {
      uuid: string;
      name: string;
      started_at: string;
      ended_at: string;
      status: ProjectStatus;
      pm?: string[];
      pa?: IUser;
      description: string;
      priority: string;
      personnel: string[];
    }
  ) => {
    try {
      setLoading({
        ...loading,
        updateProject: true,
      });
      await apiManager("put", PATH_PROJECT.UPDATE.ROUTE(id), data);
      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
      navigate("/projects");
    } catch (error: any) {
      if (error?.status === 400) {
        return error?.response?.data;
      }
      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Ẩn",
          onClick: () => console.log(error?.data?.error),
        },
      });
    } finally {
      setLoading({
        ...loading,
        updateProject: false,
      });
    }
  };

  const updateStatus = async (
    id: string | number,
    data: {
      pa_id: any;
      status: string;
      ended_at: string;
      description?: string;
    }
  ) => {
    try {
      setLoading({
        ...loading,
        deleteProject: true,
      });
      await apiManager("post", PATH_PROJECT.UPDATE_STATUS.ROUTE(id), data);
      queryClient.invalidateQueries({ queryKey: [PATH_PROJECT.QUERY_KEY] });
    } catch (error: any) {
      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Ẩn",
          onClick: () => console.log(error?.data?.error),
        },
      });
    } finally {
      setLoading({
        ...loading,
        deleteProject: false,
      });
    }
  };
  return {
    loading,
    getProject,
    deleteProjects,
    lockProject,
    updateStatus,
    createProject,
    updateProject,
    sendForReview
  };
};
export default useProject;
