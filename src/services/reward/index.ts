import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateReward,
  IGetRewards,
  IRemoveRewardStock,
  IRestockReward,
} from "./DTO";

export const CreateReward = async (params: ICreateReward.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateReward.Response>("/rewards", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Premio criado com sucesso!",
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

export const RemoveRewardStock = async (params: IRemoveRewardStock.Params) => {
  try {
    const { token, id } = params;

    const response = await api.patch<IRemoveRewardStock.Response>(
      `/rewards/${id}/remove_stock`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Removido o estoque com sucesso!",
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

export const RestockReward = async (params: IRestockReward.Params) => {
  try {
    const { token, id, ...data } = params;

    await api.patch<IRestockReward.Response>(`/rewards/${id}/restock`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Estoque reabastecido com sucesso!",
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

export const GetRewards = async (params: IGetRewards.Params) => {
  try {
    const { token, treasure_chest_id } = params;

    const response = await api.get<IGetRewards.Response>(
      `/rewards?treasure_chest_id=${treasure_chest_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Premios recuperados com sucesso!",
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
