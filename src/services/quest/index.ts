import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateQuest,
  IDeleteQuest,
  IGetQuest,
  IGetQuests,
  IUpdateQuest,
} from "./DTO";

export const CreateQuest = async (params: ICreateQuest.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateQuest.Response>("/quests", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Jornada criada com sucesso!",
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

export const UpdateQuest = async (params: IUpdateQuest.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateQuest.Response>(
      `/quests/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Jornada atualizada com sucesso!",
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

export const DeleteQuest = async (params: IDeleteQuest.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteQuest.Response>(`/quests/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Jornada deletada com sucesso!",
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

export const GetQuest = async (params: IGetQuest.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetQuest.Response>(`/quests/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Jornada recuperada com sucesso!",
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

export const GetQuests = async (params: IGetQuests.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetQuests.Response>("/quests", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Jornadas recuperadas com sucesso!",
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
