import { isAxiosError } from "axios";
import api from "../api";
import {
  IActivateTreasureChest,
  ICreateTreasureChest,
  IDeactivateTreasureChest,
  IGetTreasureChests,
} from "./DTO";

export const CreateTreasureChest = async (
  params: ICreateTreasureChest.Params
) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateTreasureChest.Response>(
      "/treasure_chests",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Baú de tesouro criado com sucesso!",
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

export const ActivateTreasureChest = async (
  params: IActivateTreasureChest.Params
) => {
  try {
    const { token, id } = params;

    const response = await api.patch<IActivateTreasureChest.Response>(
      `/treasure_chests/${id}/activate`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Baú de tesouro habilitado com sucesso!",
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

export const DeactivateTreasureChest = async (
  params: IDeactivateTreasureChest.Params
) => {
  try {
    const { token, id } = params;

    await api.patch<IDeactivateTreasureChest.Response>(
      `/treasure_chests/${id}/deactivate`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Baú de tesouro desabilitado com sucesso!",
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

export const GetTreasureChests = async (params: IGetTreasureChests.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetTreasureChests.Response>(
      "/treasure_chests",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Baús de tesouro recuperados com sucesso!",
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
