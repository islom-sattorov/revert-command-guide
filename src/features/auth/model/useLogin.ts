import { request } from "@api/requests";
import type { ZustandState } from "@appType/types";
import { API_ROUTES } from "@constants/index";
import { handleRequestError } from "@utils/handleRequestError";
import { tokenInstance } from "@utils/tokenInstance";
import { create } from "zustand";
import { useGetUserInfo } from "./useGetUserInfo";

interface RequestArg {
  email: string;
  password: string;
  login: () => void;
}

interface LoginResponse {
  token: string;
  name: null | string;
  surname: null | string;
  email: string;
  role: string; // TODO: Create role type baseds on roles in applications
}

const initialState: ZustandState<LoginResponse> = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

type LoginStore = typeof initialState & {
  execute: (args: RequestArg) => void;
  setData: (data: LoginResponse) => void;
};

export const useLogin = create<LoginStore>((set) => ({
  ...initialState,

  execute: async ({ login, ...args }) => {
    const changeUserDate = useGetUserInfo.getState().changeUserData;
    set({ ...initialState, loading: true });
    try {
      const response = await request.post<Omit<RequestArg, "login">>(
        API_ROUTES.LOGIN,
        args
      );
      const data: LoginResponse = await response.data;
      tokenInstance.setToken(data.token);
      login();
      set({ ...initialState, loading: false, success: true, data: data });
      changeUserDate({
        name: String(data.name),
        surname: String(data.surname),
        role: data.role as string,
        email: data.email,
      });
    } catch (error) {
      const e = handleRequestError(error);
      set({ ...initialState, error: true, errorData: e, loading: false });
    }
  },
  setData: (data) => {
    set({ ...initialState, data });
  },
}));
