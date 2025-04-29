import { useState } from "react";
import { apiManager } from "..";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

type Loadings = {

};
const usePersonnel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Loadings>({
   
  });
  

  return {
   
    loading,
    
  };
};

export default usePersonnel;
