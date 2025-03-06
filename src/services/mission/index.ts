import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateMission,
  IDeleteMission,
  IGetMission,
  IGetMissions,
  IUpdateMission,
} from "./DTO";

export const CreateMission = async (params: ICreateMission.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateMission.Response>(
      "/missions",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Missão criada com sucesso!",
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

export const UpdateMission = async (params: IUpdateMission.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateMission.Response>(
      `/missions/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Missão atualizada com sucesso!",
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

export const DeleteMission = async (params: IDeleteMission.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteMission.Response>(`/missions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Missão deletada com sucesso!",
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

export const GetMission = async (params: IGetMission.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetMission.Response>(`/missions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Missão recuperada com sucesso!",
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

export const GetMissions = async (params: IGetMissions.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetMissions.Response>("/missions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Missões recuperadas com sucesso!",
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
