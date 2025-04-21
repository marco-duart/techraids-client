import { isAxiosError } from "axios";
import api from "../api";
import { IGetPurchaseHistory, IGetStoreItens, IPurchaseChest } from "./DTO";

export const GetPurchaseHistory = async (
  params: IGetPurchaseHistory.Params
) => {
  try {
    const { token } = params;

    const response = await api.get<IGetPurchaseHistory.Response>(
      "/characters/purchase_history",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Histórico de compras recuperado com sucesso!",
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

export const GetStoreItens = async (params: IGetStoreItens.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetStoreItens.Response>(
      "/characters/store_items",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Itens do mercado recuperados com sucesso!",
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

export const PurchaseChest = async (params: IPurchaseChest.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<IPurchaseChest.Response>(
      "/characters/purchase_chest",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Baú comprado com sucesso!",
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
