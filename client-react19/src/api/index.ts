import { TOKENS, USER_INFO } from "../constants/auth";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../utils/local-storage";
import axios, { AxiosRequestConfig } from "axios";
import { ENVIRONMENT } from "../constants";
import { PATH_AUTH } from "../constants/path/auth";
import { MINUTE } from "@/utils/datetime";

export const axiosInstance = axios.create({
  baseURL: ENVIRONMENT.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface RequestConfig extends AxiosRequestConfig {
  token?: string;
}

export const apiManager = async (
  method: "get" | "post" | "put" | "patch" | "delete",
  suffix: string,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any = null,
  configs: RequestConfig = {}
) => {
  try {
    const token = getLocalStorage(TOKENS.ACCESS_TOKEN);
    const tokenTTL = getLocalStorage(TOKENS.ACCESS_TOKEN_TTL);
    const nextM = new Date().getTime() + 20 * MINUTE;
    if (Boolean(token)) {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    if (Boolean(token) && nextM >= Number(tokenTTL)) {
      try {
        const { data } = await axios.post(
          ENVIRONMENT.SERVER_URL +
            "/" +
            ENVIRONMENT.SERVER_URL_PREFIX +
            "/" +
            PATH_AUTH.REFRESH_TOKEN,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const now = new Date().getTime();
        const expires_in: number = data?.expires_in;
        setLocalStorage(TOKENS.ACCESS_TOKEN, data?.token);
        setLocalStorage(TOKENS.ACCESS_TOKEN_TTL, now + expires_in * MINUTE);
        setLocalStorage(USER_INFO.ID, data?.user?.id);
        setLocalStorage(USER_INFO.AVATAR, data?.user?.avatar_url);
        setLocalStorage(USER_INFO.FULLNAME, data?.user?.name);
        setLocalStorage(USER_INFO.ROLE, data?.user?.title?.name);
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${data?.token}`;
      } catch (error) {
        removeLocalStorage([
          ...Object.values(TOKENS),
          ...Object.values(USER_INFO),
        ]);
        axiosInstance.defaults.headers["Authorization"] = `Bearer `;
      }
    }

    if (["post", "put", "patch", "delete"].includes(method)) {
      return await axiosInstance[method](
        `/${ENVIRONMENT.SERVER_URL_PREFIX}/${suffix}`,
        data,
        {
          ...configs,
        }
      );
    } else {
      return await axiosInstance[method](
        `/${ENVIRONMENT.SERVER_URL_PREFIX}/${suffix}`,
        {
          ...configs,
        }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        message: error.message,
        response: error.response,
        status: error.response.status,
      };
    }
    throw error;
  }
};
