import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiManager } from "..";
import { PATH_DECLARATION } from "@/constants/path/declaration";

type Loadings = {
  getByType: boolean;
};

const useDeclaration = () => {
  const [loading, setLoading] = useState<Loadings>({
    getByType: false,
  });
  const [declaration,setDeclaration] = useState([]);
  const navigate = useNavigate();
  const getByType = async (type: "COMMON"|"PROJECT"|"TASK") => {
    try {
      setLoading({
        ...loading,
        getByType: true,
      });
      const { data } = await apiManager(
        "get",
        PATH_DECLARATION.TYPE + `?type=${type}`
      );
      setDeclaration(data.declaration);
      
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading({
        ...loading,
        getByType: false,
      });
    }
  };
  
  return {
    loading,
    declaration,
    getByType
  };
};
export default useDeclaration;
