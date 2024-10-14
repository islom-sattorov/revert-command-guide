import { tokenInstance } from "@utils/tokenInstance";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const token = tokenInstance.getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const login = useCallback(() => {
    const token = tokenInstance.getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = useCallback(() => {
    tokenInstance.clearToken();
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const values = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      isLoading,
    }),
    [isAuthenticated, login, logout, isLoading]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
