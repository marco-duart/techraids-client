import { createContext, useContext, useState, ReactNode } from "react";
import { IUser, ILogin } from "../services/auth/DTO";
import { Login as LoginService } from "../services/auth/";

interface UserContextType {
  user: IUser.Model | null;
  token: string | null;
  login: (params: ILogin.Params) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser.Model | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (params: ILogin.Params): Promise<boolean> => {
    const result = await LoginService(params);

    if (result.success && result.data) {
      setUser(result.data.user);
      setToken(result.data.token);

      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("token", result.data.token);
      return true;
    } else {
      throw new Error(result.message || "Erro ao fazer login.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
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
