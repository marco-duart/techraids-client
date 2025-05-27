import { isAxiosError } from "axios";
import api from "../api";
import { ISwitchActiveTitle } from "./DTO";

export const SwitchActiveTitle = async (params: ISwitchActiveTitle.Params) => {
  try {
    const { token, ...data } = params;

    await api.patch<ISwitchActiveTitle.Response>(
      `/characters/switch_title`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Título trocado com sucesso!",
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
