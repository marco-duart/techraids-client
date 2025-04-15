import { isAxiosError } from "axios";
import api from "../api";
import { IGetCharacterRanking } from "./DTO";

export const GetCharacterRanking = async (params: IGetCharacterRanking.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetCharacterRanking.Response>("/characters/ranking", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Ranking recuperado com sucesso!",
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
