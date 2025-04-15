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
  updateUser: (user: IUser.UserWithRelations) => void;
  validateToken: (
    params: IValidateToken.Params
  ) => Promise<IUser.UserWithRelations>;
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
      setUser(parsedUser);
      setToken(storedToken);

      updateThemeType(parsedUser.role);
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
        setUser(user);
        setToken(token);

        updateThemeType(user.role);

        localStorage.setItem("user", JSON.stringify(user));
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
        setUser(user);
        updateThemeType(user.role);
        localStorage.setItem("user", JSON.stringify(user));

        return user;
      } else {
        throw new Error(result.message || "Token inválido.");
      }
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

  const updateUser = (updatedUser: IUser.UserWithRelations) => {
    setUser(updatedUser);
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
        updateUser,
        validateToken,
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
