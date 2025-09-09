import { isAxiosError } from "axios";
import api from "../api";
import { IGetArcaneAnnouncements } from "./DTO";

export const GetArcaneAnnouncements = async (
  params: IGetArcaneAnnouncements.Params
) => {
  try {
    const { token } = params;

    const response = await api.get<IGetArcaneAnnouncements.Response>(
      "/arcane_announcements",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Anúncios Arcanos recuperadas com sucesso!",
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
