import { useState } from "react";
import { apiManager } from "..";
import { PATH_TASK } from "@/constants/path/task";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Loadings = {
  delete: boolean;
};
const useTask = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<Loadings>({
    delete: false,
  });
  const deleteTask = async (id: any) => {
    try {
      setLoading({
        ...loading,
        delete: true,
      });
      await apiManager("delete", PATH_TASK.DELETE.ROUTE(id));
      queryClient.invalidateQueries({ queryKey: [PATH_TASK.QUERY_KEY] });
    } catch (error: any) {
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
  };
};

export default useTask;
