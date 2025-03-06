import { isAxiosError } from "axios";
import api from "../api";
import { ILogin, IRegistration } from "./DTO";

export const Login = async (params: ILogin.Params) => {
  try {
    const response = await api.post<ILogin.Response>("/auth/sign_in", params);

    const token = response.headers["access-token"];
    const client = response.headers["client"];
    const uid = response.headers["uid"];

    if (!token || !client || !uid) {
      throw new Error("Token de autenticação não encontrado no header.");
    }

    return {
      success: true,
      message: "Login realizado com sucesso!",
      data: {
        user: response.data.data,
        token,
        client,
        uid,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.response?.data?.errors?.join(", ") || error.message,
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
        message: error.response?.data?.errors?.join(", ") || error.message,
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
