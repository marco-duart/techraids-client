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
    const { token, filters } = params;
    
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.gold_reward_min) queryParams.append("gold_reward_min", filters.gold_reward_min.toString());
      if (filters.gold_reward_max) queryParams.append("gold_reward_max", filters.gold_reward_max.toString());
      if (filters.character_id) queryParams.append("character_id", filters.character_id.toString());
      if (filters.sort_by) queryParams.append("sort_by", filters.sort_by);
      if (filters.sort_direction) queryParams.append("sort_direction", filters.sort_direction);
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.items) queryParams.append("items", filters.items.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/missions?${queryString}` : "/missions";

    const response = await api.get<IGetMissions.Response>(url, {
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
