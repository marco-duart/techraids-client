import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateVillage,
  IDeleteVillage,
  IGetVillage,
  IGetVillages,
  IUpdateVillage,
} from "./DTO";

export const CreateVillage = async (params: ICreateVillage.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateVillage.Response>(
      "/villages",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Vila criada com sucesso!",
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

export const UpdateVillage = async (params: IUpdateVillage.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateVillage.Response>(
      `/villages/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Vila atualizada com sucesso!",
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

export const DeleteVillage = async (params: IDeleteVillage.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteVillage.Response>(`/villages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Vila deletada com sucesso!",
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

export const GetVillage = async (params: IGetVillage.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetVillage.Response>(`/villages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Vila recuperada com sucesso!",
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

export const GetVillages = async (params: IGetVillages.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetVillages.Response>("/villages", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Vilas recuperadas com sucesso!",
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
