import { isAxiosError } from "axios";
import api from "../api";
import {
  IGetGuildNotices,
  ICreateGuildNotice,
  IDeleteGuildNotice,
  IUpdateGuildNotice,
} from "./DTO";

export const GetGuildNotices = async (params: IGetGuildNotices.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetGuildNotices.Response>(
      "/guild_notices",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Notícias da Guilda recuperadas com sucesso!",
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

export const CreateGuildNotice = async (params: ICreateGuildNotice.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateGuildNotice.Response>(
      "/guild_notices",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Notícia da Guilda criada com sucesso!",
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

export const UpdateGuildNotice = async (params: IUpdateGuildNotice.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateGuildNotice.Response>(
      `/guild_notices/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Notícia da Guilda atualizada com sucesso!",
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

export const DeleteGuildNotice = async (params: IDeleteGuildNotice.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteGuildNotice.Response>(`/guild_notices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Notícia da Guilda deletada com sucesso!",
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
