import { apiManager } from "..";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/local-storage";
import { TOKENS, USER_INFO } from "@/constants/auth";
import { PATH_AUTH } from "@/constants/path/auth";
import { MINUTE, SECOND } from "@/utils/datetime";

type Loadings = {
  login: boolean;
  logout: boolean;
};

const useAuth = () => {
  const [loading, setLoading] = useState<Loadings>({
    login: false,
    logout: false,
  });
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const token = getLocalStorage(TOKENS.ACCESS_TOKEN);
    if (Boolean(token)) {
      return true;
    }
    return false;
  };
  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading({ ...loading, login: true });

      const { data } = await apiManager("post", PATH_AUTH.LOGIN, {
        ...credentials,
      });
      const now = new Date().getTime();
      const expires_in: number = data?.expires_in;

      setLocalStorage(TOKENS.ACCESS_TOKEN, data?.token);
      setLocalStorage(TOKENS.ACCESS_TOKEN_TTL, now + expires_in * MINUTE);
      setLocalStorage(USER_INFO.ID, data?.user?.id);
      setLocalStorage(USER_INFO.AVATAR, data?.user?.avatar_url);
      setLocalStorage(USER_INFO.FULLNAME, data?.user?.name);
      setLocalStorage(USER_INFO.ROLE, data?.user?.title?.name);
      navigate("/");
    } catch (error: any) {
      if (
        error?.status === 400 ||
        error?.status === 401 ||
        error?.status === 404
      ) {
        return error?.response?.data?.errors;
      }

      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Huỷ",
          onClick: () => console.log(error?.data?.error),
        },
      });
      return;
    } finally {
      setLoading({ ...loading, login: false });
    }
  };
  const logout = async () => {
    console.log(getLocalStorage(TOKENS.ACCESS_TOKEN));

    try {
      setLoading({ ...loading, logout: true });
      const { data } = await apiManager("delete", PATH_AUTH.LOGOUT);
      toast("Đăng xuất thành công", {
        description: data?.message,
        action: {
          label: "Huỷ",
          onClick: () => console.log(data?.message),
        },
      });
      removeLocalStorage([
        ...Object.values(TOKENS),
        ...Object.values(USER_INFO),
      ]);
      navigate("/login");
    } catch (error: any) {
      console.log(error);

      toast("Lỗi", {
        description: error?.data?.error,
        action: {
          label: "Huỷ",
          onClick: () => console.log(error?.data?.error),
        },
      });
      return;
    } finally {
      setLoading({ ...loading, logout: false });
    }
  };

  return {
    loading,
    login,
    isAuthenticated,
    logout,
  };
};
export default useAuth;
