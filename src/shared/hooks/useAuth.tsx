import { AUTH_HOOK_CONTEXT_ERROR } from "@constants/index";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error(AUTH_HOOK_CONTEXT_ERROR);
  }

  return ctx;
};
