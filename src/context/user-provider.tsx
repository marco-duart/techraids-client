import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IUser, ILogin, IValidateToken } from "../services/auth/DTO";
import { Login as LoginService, ValidateToken } from "../services/auth/";
import { useTheme } from "./theme-provider";

interface UserContextType {
  user: IUser.UserWithRelations | null;
  token: string | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  login: (params: ILogin.Params) => Promise<IUser.UserWithRelations>;
  logout: () => void;
  updateUserAndTheme: (user: IUser.UserWithRelations) => void;
  validateToken: (
    params: IValidateToken.Params
  ) => Promise<IUser.UserWithRelations>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser.UserWithRelations | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { updateThemeType } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      updateUserAndTheme(parsedUser);
      setToken(storedToken);
    }

    setIsAuthChecked(true);
  }, [updateThemeType]);

  const login = async (
    params: ILogin.Params
  ): Promise<IUser.UserWithRelations> => {
    setIsLoading(true);
    try {
      const result = await LoginService(params);

      if (result.success && result.data) {
        const { user, token } = result.data;
        updateUserAndTheme(user);
        setToken(token);

        localStorage.setItem("token", token);
        return user;
      } else {
        throw new Error(result.message || "Erro ao fazer login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (
    params: IValidateToken.Params
  ): Promise<IUser.UserWithRelations> => {
    setIsLoading(true);
    try {
      const result = await ValidateToken(params);

      if (result.success && result.data) {
        const { user } = result.data;
        updateUserAndTheme(user);

        return user;
      } else {
        throw new Error(result.message || "Token inválido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    if (!token) {
      console.warn("Nenhum token disponível para refresh");
      return;
    }

    setIsLoading(true);
    try {
      const result = await ValidateToken({ token });

      if (result.success && result.data) {
        const { user } = result.data;
        updateUserAndTheme(user);
      } else {
        throw new Error(result.message || "Erro ao atualizar usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUserAndTheme = (updatedUser: IUser.UserWithRelations) => {
    setUser(updatedUser);
    updateThemeType(updatedUser.role);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthChecked,
        login,
        logout,
        updateUserAndTheme,
        validateToken,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um UserProvider");
  }

  return context;
};
