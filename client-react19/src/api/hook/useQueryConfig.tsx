import {  useQuery } from "@tanstack/react-query";
import { apiManager } from "..";

const defaultConfig = {
  cacheTime: 1000 * 60 * 30,
  staleTime: 1000 * 60 * 30,
  retry: false,
};

const useQueryConfig = (
  key: string | Array<string>,
  api: string,
  config: any = defaultConfig
) => {
  const fetchData = async () => {
    try {
      return await apiManager("get", api);
    } catch (error: any) {
      throw error;
    }
  };

  const { isLoading, data, isSuccess,error, isFetching, refetch } = useQuery({
    queryKey: Array.isArray(key) ? [...key] : [key],
    queryFn: fetchData,
    ...config,
  });

  return {
    isLoading,
    isFetching,
    data,
    error,
    refetch,
    isSuccess
  };
};

export default useQueryConfig;
