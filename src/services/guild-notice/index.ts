import { isAxiosError } from "axios";
import api from "../api";
import { IGetGuildNotices } from "./DTO";

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
      message: "Notícias da Guild recuperadas com sucesso!",
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
