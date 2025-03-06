import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateChapter,
  IDeleteChapter,
  IGetChapter,
  IGetChapters,
  IUpdateChapter,
} from "./DTO";

export const CreateChapter = async (params: ICreateChapter.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateChapter.Response>(
      "/chapters",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Capítulo criado com sucesso!",
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

export const UpdateChapter = async (params: IUpdateChapter.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateChapter.Response>(
      `/chapters/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Capítulo atualizado com sucesso!",
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

export const DeleteChapter = async (params: IDeleteChapter.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteChapter.Response>(`/chapters/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Capítulo deletado com sucesso!",
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

export const GetChapter = async (params: IGetChapter.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetChapter.Response>(`/chapters/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Capítulo recuperado com sucesso!",
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

export const GetChapters = async (params: IGetChapters.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetChapters.Response>("/chapters", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Capítulos recuperados com sucesso!",
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
