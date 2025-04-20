import { isAxiosError } from "axios";
import api from "../api";
import { IUpdatePassword, IUpdatePhoto } from "./DTO";

export const UpdatePassword = async (params: IUpdatePassword.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.patch<IUpdatePassword.Response>(
      `/users/update_password`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Senha atualizada com sucesso!",
      data: response.data,
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

export const UpdatePhoto = async (params: IUpdatePhoto.Params) => {
  try {
    const { token, photo } = params;

    const formData = new FormData();
    formData.append("photo", photo);

    const response = await api.patch<IUpdatePhoto.Response>(
      `/users/update_photo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      success: true,
      message: "Photo atualizada com sucesso!",
      data: response.data,
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
