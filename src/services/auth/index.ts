import { isAxiosError } from "axios";
import api from "../api";
import { ILogin, IValidateToken, IRegistration } from "./DTO";

export const Login = async (params: ILogin.Params) => {
  try {
    const response = await api.post<ILogin.Response>("/auth/sign_in", params);

    const authHeader = response.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Token de autenticação não encontrado no header.");
    }

    const token = authHeader.split(" ")[1];

    return {
      success: true,
      message: "Login realizado com sucesso!",
      data: {
        user: response.data.data,
        token,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};

export const ValidateToken = async (params: IValidateToken.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IValidateToken.Response>(
      `/auth/validate_token`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "User validado!",
      data: {
        user: response.data.data
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};

export const Registration = async (params: IRegistration.Params) => {
  try {
    const response = await api.post<IRegistration.Response>("/auth", params);

    return {
      success: true,
      message: "Registro realizado com sucesso!",
      data: response.data.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};
