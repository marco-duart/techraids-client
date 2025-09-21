import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateBoss,
  IDeleteBoss,
  IGetBoss,
  IGetBosses,
  IUpdateBoss,
} from "./DTO";

export const CreateBoss = async (params: ICreateBoss.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateBoss.Response>("/bosses", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Chefão criado com sucesso!",
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

export const UpdateBoss = async (params: IUpdateBoss.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateBoss.Response>(
      `/bosses/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Chefão atualizado com sucesso!",
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

export const DeleteBoss = async (params: IDeleteBoss.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteBoss.Response>(`/bosses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Chefão deletado com sucesso!",
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

export const GetBoss = async (params: IGetBoss.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetBoss.Response>(`/bosses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Chefão recuperado com sucesso!",
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

export const GetBosses = async (params: IGetBosses.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetBosses.Response>("/bosses", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Chefões recuperados com sucesso!",
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
