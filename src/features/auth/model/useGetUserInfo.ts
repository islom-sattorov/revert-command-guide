import { request } from "@api/requests";
import { ZustandState } from "@appType/types";
import { handleRequestError } from "@utils/handleRequestError";
import { create } from "zustand";

interface GetUserInfoResponse {
  email: string;
  surname: string;
  name: string;
  role: string; // TODO: Create role type baseds on roles in applications
}

const initialState: ZustandState<GetUserInfoResponse> = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

type GetUserInfoStore = typeof initialState & {
  execute: () => void;
  changeUserData: (data: GetUserInfoResponse) => void;
};

export const useGetUserInfo = create<GetUserInfoStore>((set) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      state.loading = true;
      return state;
    });
    try {
      const response = await request.get("/"); // set user info route
      const data: GetUserInfoResponse = await response.data;
      set({ ...initialState, loading: false, success: true, data });
    } catch (error) {
      const e = handleRequestError(error);
      set({ ...initialState, error: true, errorData: e, loading: false });
    }
  },
  changeUserData: (data) => {
    set({ ...initialState, data });
  },
}));
