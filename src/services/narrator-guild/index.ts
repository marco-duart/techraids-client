import { isAxiosError } from "axios";
import api from "../api";
import { IGetGuildMembers, IGetPendingRewards, IDeliverRewards } from "./DTO";

export const GetGuildMembers = async (params: IGetGuildMembers.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetGuildMembers.Response>(
      "/narrators/guild_members",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Colaboradores recuperados com sucesso!",
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

export const GetPendingRewards = async (params: IGetPendingRewards.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetPendingRewards.Response>(
      "/narrators/pending_rewards",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Recompensas pendentes recuperadas com sucesso!",
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

export const DeliverRewards = async (params: IDeliverRewards.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<IDeliverRewards.Response>(
      "/narrators/deliver_reward",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      success: true,
      message: "Recompensas pendentes recuperadas com sucesso!",
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
